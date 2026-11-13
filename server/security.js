const crypto = require("crypto");

/**
 * Sliding-window in-memory rate limiter per IP.
 * Melindungi endpoint API dari brute-force, scraping agresif, dan DDoS ringan.
 */
function createRateLimiter({ windowMs = 60_000, maxRequests = 60 } = {}) {
  const hits = new Map();

  // Bersihkan entry kedaluwarsa tiap 5 menit agar memori tetap stabil
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of hits.entries()) {
      const valid = timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) hits.delete(ip);
      else hits.set(ip, valid);
    }
  }, 5 * 60_000);
  cleanup.unref();

  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);

    if (recent.length >= maxRequests) {
      return res.status(429).json({
        error: "Terlalu banyak permintaan. Silakan tunggu sebentar sebelum mencoba lagi."
      });
    }

    recent.push(now);
    hits.set(ip, recent);
    next();
  };
}

/**
 * Sanitasi string untuk mencegah XSS & injeksi karakter kontrol.
 */
function sanitizeText(value, maxLen = 200) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

/**
 * Proteksi Prototype Pollution pada payload JSON.
 */
function hasUnsafeKeys(obj) {
  if (!obj || typeof obj !== "object") return false;
  for (const key of Object.keys(obj)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return true;
    }
    if (typeof obj[key] === "object" && hasUnsafeKeys(obj[key])) {
      return true;
    }
  }
  return false;
}

function blockPrototypePollution(req, res, next) {
  if (hasUnsafeKeys(req.body) || hasUnsafeKeys(req.query)) {
    return res.status(400).json({ error: "Payload tidak valid." });
  }
  next();
}

/**
 * Validasi Origin/Referer & custom header X-Requested-With untuk proteksi CSRF.
 */
function csrfOriginGuard(allowedOrigin) {
  return (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
    // Webhook eksternal diverifikasi oleh HMAC signature, bukan Origin browser
    if (req.path.startsWith("/webhooks/")) return next();

    const origin = req.get("origin");
    const host = req.get("host");
    const sameHostOrigins = host ? [`https://${host}`, `http://${host}`] : [];
    const isAllowed = !origin || origin === allowedOrigin || sameHostOrigins.includes(origin);

    if (!isAllowed) {
      return res.status(403).json({ error: "Origin tidak diizinkan (CSRF protection)." });
    }
    if (req.get("x-requested-with") !== "XMLHttpRequest") {
      return res.status(403).json({ error: "Header keamanan X-Requested-With diperlukan." });
    }
    next();
  };
}

/**
 * WAF / Attack Shield: blokir path traversal, file sensitif, scanner bot,
 * HTTP Parameter Pollution, dan pola injeksi berbahaya (SQLi / XSS / Cmd).
 */
const BLOCKED_PATH_RE = /(\.\.|%2e%2e|\.env|\.git|\.sql|\.bak|wp-admin|wp-login|phpmyadmin|package\.json|\/server\/)/i;
const SCANNER_UA_RE = /(sqlmap|nikto|nmap|masscan|zgrab|dirbuster|gobuster|wpscan|acunetix|nessus|nuclei)/i;
const ATTACK_PAYLOAD_RE = /(<script\b|javascript:|onerror\s*=|onload\s*=|\bunion\s+select\b|\bsleep\s*\(|\bbenchmark\s*\(|;\s*rm\s+-rf\b|\$\([^)]+\))/i;

function hasMaliciousValue(val) {
  if (typeof val === "string") return ATTACK_PAYLOAD_RE.test(val);
  if (Array.isArray(val)) return val.some(hasMaliciousValue);
  if (val && typeof val === "object") return Object.values(val).some(hasMaliciousValue);
  return false;
}

function attackShieldMiddleware(req, res, next) {
  const ua = String(req.get("user-agent") || "");
  if (SCANNER_UA_RE.test(ua)) {
    return res.status(403).json({ error: "Akses ditolak oleh sistem keamanan." });
  }

  const rawUrl = String(req.originalUrl || req.url || "");
  if (BLOCKED_PATH_RE.test(rawUrl)) {
    return res.status(403).json({ error: "Akses path tidak diizinkan." });
  }

  for (const val of Object.values(req.query || {})) {
    if (Array.isArray(val)) {
      return res.status(400).json({ error: "Parameter query tidak valid." });
    }
  }

  if (hasMaliciousValue(req.query) || hasMaliciousValue(req.body)) {
    return res.status(400).json({ error: "Input terdeteksi mengandung karakter/pola berbahaya." });
  }

  next();
}

/**
 * Brute-force lockout untuk endpoint login:
 * Maksimal 5 kali gagal dalam 5 menit per kombinasi IP + identifier.
 */
function createLoginLockout({ maxAttempts = 5, lockMs = 5 * 60_000 } = {}) {
  const attempts = new Map();

  function keyOf(req, identifier) {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    return `${ip}::${String(identifier || "").toLowerCase()}`;
  }

  return {
    isLocked(req, identifier) {
      const k = keyOf(req, identifier);
      const rec = attempts.get(k);
      if (!rec) return false;
      if (Date.now() > rec.resetAt) {
        attempts.delete(k);
        return false;
      }
      return rec.count >= maxAttempts;
    },
    recordFailure(req, identifier) {
      const k = keyOf(req, identifier);
      const now = Date.now();
      const rec = attempts.get(k);
      if (!rec || now > rec.resetAt) {
        attempts.set(k, { count: 1, resetAt: now + lockMs });
      } else {
        rec.count += 1;
      }
    },
    clear(req, identifier) {
      attempts.delete(keyOf(req, identifier));
    }
  };
}

/**
 * Verifikasi HMAC-SHA256 secara timing-safe untuk webhook pembayaran.
 */
function verifyHmacSignature(payloadString, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(payloadString).digest("hex");
  const actual = String(signatureHeader).replace(/^sha256=/i, "");
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(actual, "utf8"));
}

module.exports = {
  createRateLimiter,
  sanitizeText,
  blockPrototypePollution,
  csrfOriginGuard,
  attackShieldMiddleware,
  createLoginLockout,
  verifyHmacSignature
};
