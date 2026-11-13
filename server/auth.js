const crypto = require("crypto");

/**
 * Validasi Nama, Nomor HP Operator Indonesia, DOB >= 17 tahun,
 * Password Hashing (scrypt + timingSafeEqual), dan Signed Session Token (HMAC-SHA256).
 */

const VALID_ID_OPERATOR_PREFIXES = new Set([
  // Telkomsel
  "0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853",
  // Indosat Ooredoo
  "0814", "0815", "0816", "0855", "0856", "0857", "0858",
  // XL Axiata
  "0817", "0818", "0819", "0859", "0877", "0878",
  // Axis
  "0831", "0832", "0833", "0838",
  // Tri (3)
  "0895", "0896", "0897", "0898", "0899",
  // Smartfren
  "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"
]);

function validateFullName(name) {
  const clean = String(name || "").trim().replace(/\s+/g, " ");
  if (clean.length < 2 || clean.length > 60) {
    return { valid: false, error: "Nama lengkap harus 2–60 karakter." };
  }
  if (!/^[A-Za-z\s]+$/.test(clean)) {
    return { valid: false, error: "Nama lengkap hanya boleh berisi huruf dan spasi (tanpa angka atau simbol)." };
  }
  return { valid: true, value: clean };
}

function validateIndonesianPhone(phone) {
  const digits = String(phone || "").trim();
  if (!/^\d+$/.test(digits)) {
    return { valid: false, error: "Nomor HP hanya boleh berisi angka." };
  }
  if (digits.length < 10 || digits.length > 12) {
    return { valid: false, error: "Nomor HP harus 10–12 digit (contoh: 0812xxxxxxxx)." };
  }
  const prefix = digits.slice(0, 4);
  if (!VALID_ID_OPERATOR_PREFIXES.has(prefix)) {
    return { valid: false, error: `Kode operator (${prefix}) tidak valid. Gunakan nomor Indonesia (0811–0899).` };
  }
  // Anti angka sama berulang (mis. 081222222222 atau 08111111111)
  if (/(\d)\1{4,}/.test(digits)) {
    return { valid: false, error: "Nomor HP tidak valid (terlalu banyak angka sama berurutan)." };
  }
  const subscriber = digits.slice(4);
  const uniqueDigits = new Set(subscriber.split("")).size;
  if (uniqueDigits < 3) {
    return { valid: false, error: "Nomor HP tidak valid (pola angka terlalu berulang)." };
  }
  // Anti urutan beruntun penuh
  if ("0123456789012".includes(subscriber) || "9876543210987".includes(subscriber)) {
    return { valid: false, error: "Nomor HP tidak valid (pola angka berurutan tidak diizinkan)." };
  }
  return { valid: true, value: digits };
}

function validateDobMin17(dobStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dobStr || ""))) {
    return { valid: false, error: "Format tanggal lahir tidak valid." };
  }
  const [y, m, d] = dobStr.split("-").map(Number);
  const dob = new Date(Date.UTC(y, m - 1, d));
  if (
    Number.isNaN(dob.getTime()) ||
    dob.getUTCFullYear() !== y ||
    dob.getUTCMonth() !== m - 1 ||
    dob.getUTCDate() !== d
  ) {
    return { valid: false, error: "Tanggal lahir tidak valid." };
  }

  const now = new Date();
  let age = now.getUTCFullYear() - y;
  const monthDiff = now.getUTCMonth() + 1 - m;
  if (monthDiff < 0 || (monthDiff === 0 && now.getUTCDate() < d)) {
    age -= 1;
  }

  if (age < 17) {
    return { valid: false, error: "Usia minimal untuk mendaftar adalah 17 tahun." };
  }
  if (age > 110) {
    return { valid: false, error: "Tanggal lahir tidak masuk akal." };
  }
  return { valid: true, value: dobStr };
}

function validateEmail(email) {
  const clean = String(email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean) || clean.length > 100) {
    return { valid: false, error: "Format email tidak valid." };
  }
  return { valid: true, value: clean };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, keyHex] = String(stored || "").split(":");
  if (!salt || !keyHex) return false;
  const derived = crypto.scryptSync(String(password), salt, 64);
  const keyBuf = Buffer.from(keyHex, "hex");
  if (derived.length !== keyBuf.length) return false;
  return crypto.timingSafeEqual(derived, keyBuf);
}

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.WEBHOOK_SECRET ||
  crypto.randomBytes(32).toString("hex");

function signSessionToken(payload) {
  const data = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }),
    "utf8"
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [data, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!parsed.exp || Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(";")) {
    const idx = part.indexOf("=");
    if (idx > 0) {
      const k = part.slice(0, idx).trim();
      const v = decodeURIComponent(part.slice(idx + 1).trim());
      out[k] = v;
    }
  }
  return out;
}

module.exports = {
  validateFullName,
  validateIndonesianPhone,
  validateDobMin17,
  validateEmail,
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  parseCookies
};
