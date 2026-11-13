require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const {
  createRateLimiter,
  sanitizeText,
  blockPrototypePollution,
  csrfOriginGuard,
  verifyHmacSignature
} = require("./security");
const { calculateInstantShipping, STORE_LAT, STORE_LNG } = require("./shipping");
const { createQrisCharge, checkMidtransStatus } = require("./payment");
const { getFlashSaleState } = require("./flashSale");
const {
  validateFullName,
  validateIndonesianPhone,
  validateDobMin17,
  validateEmail,
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  parseCookies
} = require("./auth");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ALLOWED_ORIGIN =
  process.env.ALLOWED_ORIGIN ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

// File-backed user store (gunakan /tmp di Vercel karena filesystem deploy read-only)
const usersPath = process.env.VERCEL
  ? path.join("/tmp", "dimsum-users.json")
  : path.resolve(__dirname, "../data/users.json");
function loadUsers() {
  try {
    if (!fs.existsSync(usersPath)) return [];
    return JSON.parse(fs.readFileSync(usersPath, "utf8"));
  } catch {
    return [];
  }
}
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf8");
}

// Load katalog dari server-side (sumber kebenaran mutlak untuk harga & stok)
const catalogPath = path.resolve(__dirname, "../data/catalog.json");
function loadCatalog() {
  return JSON.parse(fs.readFileSync(catalogPath, "utf8"));
}

// In-memory order store (untuk produksi skala besar gunakan PostgreSQL / Redis)
const orders = new Map();

// Security Headers (CSP, X-Frame-Options, NoSniff, dll.)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://accounts.google.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://accounts.google.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.img.susercontent.com", "https://lh3.googleusercontent.com"],
        mediaSrc: ["'self'", "https://down-aka-id.vod.susercontent.com", "https://*.vod.susercontent.com"],
        connectSrc: ["'self'", "https://nominatim.openstreetmap.org", "https://accounts.google.com"],
        frameSrc: ["https://accounts.google.com"],
        frameAncestors: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Simpan rawBody untuk verifikasi signature HMAC webhook
app.use(
  express.json({
    limit: "100kb",
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString("utf8");
    }
  })
);

app.use(blockPrototypePollution);
app.use("/api", createRateLimiter({ windowMs: 60_000, maxRequests: 90 }));
app.use("/api/auth", createRateLimiter({ windowMs: 60_000, maxRequests: 20 }));
app.use("/api", csrfOriginGuard(ALLOWED_ORIGIN));

function setSessionCookie(res, user) {
  const token = signSessionToken({ userId: user.id, email: user.email });
  res.cookie("dimsum_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" && ALLOWED_ORIGIN.startsWith("https://"),
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function getAuthenticatedUser(req) {
  const cookies = parseCookies(req.headers.cookie);
  const payload = verifySessionToken(cookies.dimsum_session);
  if (!payload) return null;
  const users = loadUsers();
  return users.find((u) => u.id === payload.userId) || null;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    dob: user.dob || "",
    provider: user.provider || "manual"
  };
}

// ---------- Auth Endpoints (Manual & Google) ----------
app.get("/api/auth/config", (_req, res) => {
  res.json({ googleClientId: GOOGLE_CLIENT_ID });
});

app.get("/api/auth/me", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) return res.json({ user: null });
  res.json({ user: publicUser(user) });
});

app.post("/api/auth/register", (req, res) => {
  const nameCheck = validateFullName(req.body?.name);
  if (!nameCheck.valid) return res.status(400).json({ error: nameCheck.error });

  const emailCheck = validateEmail(req.body?.email);
  if (!emailCheck.valid) return res.status(400).json({ error: emailCheck.error });

  const phoneCheck = validateIndonesianPhone(req.body?.phone);
  if (!phoneCheck.valid) return res.status(400).json({ error: phoneCheck.error });

  const dobCheck = validateDobMin17(req.body?.dob);
  if (!dobCheck.valid) return res.status(400).json({ error: dobCheck.error });

  const password = String(req.body?.password || "");
  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({ error: "Password minimal 8 karakter." });
  }

  const users = loadUsers();
  if (users.some((u) => u.email === emailCheck.value || u.phone === phoneCheck.value)) {
    return res.status(409).json({ error: "Email atau nomor HP sudah terdaftar." });
  }

  const newUser = {
    id: `USR-${crypto.randomBytes(6).toString("hex")}`,
    name: nameCheck.value,
    email: emailCheck.value,
    phone: phoneCheck.value,
    dob: dobCheck.value,
    passwordHash: hashPassword(password),
    provider: "manual",
    createdAt: Date.now()
  };

  users.push(newUser);
  saveUsers(users);
  setSessionCookie(res, newUser);
  res.status(201).json({ user: publicUser(newUser) });
});

app.post("/api/auth/login", (req, res) => {
  const identifier = String(req.body?.identifier || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  if (!identifier || !password) {
    return res.status(400).json({ error: "Email/Nomor HP dan password wajib diisi." });
  }

  const users = loadUsers();
  const user = users.find((u) => u.email === identifier || u.phone === identifier);
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: "Email/Nomor HP atau password salah." });
  }

  setSessionCookie(res, user);
  res.json({ user: publicUser(user) });
});

app.post("/api/auth/google", async (req, res) => {
  try {
    const credential = String(req.body?.credential || "");
    let gEmail = "";
    let gName = "";

    if (GOOGLE_CLIENT_ID) {
      if (!credential) {
        return res.status(400).json({ error: "Token Google tidak ditemukan." });
      }
      const verifyRes = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
      );
      const tokenInfo = await verifyRes.json();
      if (!verifyRes.ok || tokenInfo.aud !== GOOGLE_CLIENT_ID || tokenInfo.email_verified !== "true") {
        return res.status(401).json({ error: "Verifikasi token Google gagal." });
      }
      gEmail = String(tokenInfo.email).toLowerCase();
      gName = String(tokenInfo.name || "Pelanggan Dimsum Inc").replace(/[^A-Za-z\s]/g, " ").trim() || "Pelanggan Dimsum Inc";
    } else {
      // Mode Preview/Lokal jika GOOGLE_CLIENT_ID belum diisi di .env
      const emailCheck = validateEmail(req.body?.email);
      const nameCheck = validateFullName(req.body?.name);
      if (!emailCheck.valid || !nameCheck.valid) {
        return res.status(400).json({ error: emailCheck.error || nameCheck.error });
      }
      gEmail = emailCheck.value;
      gName = nameCheck.value;
    }

    const users = loadUsers();
    let user = users.find((u) => u.email === gEmail);
    if (!user) {
      user = {
        id: `USR-${crypto.randomBytes(6).toString("hex")}`,
        name: gName,
        email: gEmail,
        phone: "",
        dob: "",
        passwordHash: null,
        provider: "google",
        createdAt: Date.now()
      };
      users.push(user);
      saveUsers(users);
    }

    setSessionCookie(res, user);
    res.json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ error: "Gagal memproses login Google." });
  }
});

app.post("/api/auth/profile", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) return res.status(401).json({ error: "Silakan login terlebih dahulu." });

  const nameCheck = validateFullName(req.body?.name);
  if (!nameCheck.valid) return res.status(400).json({ error: nameCheck.error });

  const phoneCheck = validateIndonesianPhone(req.body?.phone);
  if (!phoneCheck.valid) return res.status(400).json({ error: phoneCheck.error });

  const dobCheck = validateDobMin17(req.body?.dob);
  if (!dobCheck.valid) return res.status(400).json({ error: dobCheck.error });

  const users = loadUsers();
  const target = users.find((u) => u.id === user.id);
  if (!target) return res.status(404).json({ error: "Akun tidak ditemukan." });

  target.name = nameCheck.value;
  target.phone = phoneCheck.value;
  target.dob = dobCheck.value;
  saveUsers(users);

  res.json({ user: publicUser(target) });
});

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie("dimsum_session");
  res.json({ ok: true });
});

// Static frontend files
app.use(express.static(path.resolve(__dirname, "../public")));

// 1. Endpoint Katalog & Banner
app.get("/api/catalog", (_req, res) => {
  const catalog = loadCatalog();
  const flashSale = getFlashSaleState(catalog.products);
  res.json({
    store: {
      ...catalog.store,
      lat: STORE_LAT,
      lng: STORE_LNG
    },
    products: catalog.products,
    flashSale
  });
});

// 2. Endpoint Kalkulasi Ongkir Instan Gojek & Grab
app.post("/api/shipping/rates", async (req, res) => {
  try {
    const destLat = Number(req.body.lat);
    const destLng = Number(req.body.lng);
    const items = Array.isArray(req.body.items) ? req.body.items : [];

    const catalog = loadCatalog();
    const productMap = new Map(catalog.products.map((p) => [p.id, p]));

    let totalWeightGram = 0;
    for (const item of items) {
      const product = productMap.get(String(item.productId || ""));
      const qty = Math.min(50, Math.max(1, Math.floor(Number(item.qty || 1))));
      if (product) totalWeightGram += (product.weightGram || 350) * qty;
    }

    const result = await calculateInstantShipping({
      destLat,
      destLng,
      totalWeightGram: Math.max(350, totalWeightGram)
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Gagal menghitung ongkos kirim." });
  }
});

// 3. Endpoint Checkout (Server-Side Price & Total Validation + Generate QRIS)
app.post("/api/checkout", async (req, res) => {
  try {
    const { items, customer, shipping } = req.body || {};
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
      return res.status(400).json({ error: "Keranjang belanja tidak valid." });
    }

    const cleanCustomer = {
      name: sanitizeText(customer?.name, 80),
      phone: sanitizeText(customer?.phone, 20).replace(/[^0-9+]/g, ""),
      address: sanitizeText(customer?.address, 250),
      notes: sanitizeText(customer?.notes, 150)
    };

    if (cleanCustomer.name.length < 2 || cleanCustomer.phone.length < 9 || cleanCustomer.address.length < 8) {
      return res.status(400).json({ error: "Nama, nomor WhatsApp, dan alamat pengiriman wajib diisi lengkap." });
    }

    const destLat = Number(shipping?.lat);
    const destLng = Number(shipping?.lng);
    const courierId = sanitizeText(shipping?.courierId, 40);

    const catalog = loadCatalog();
    const productMap = new Map(catalog.products.map((p) => [p.id, p]));
    const flashSale = getFlashSaleState(catalog.products);
    const flashMap = new Map(flashSale.items.map((f) => [f.id, f]));

    let subtotal = 0;
    let totalWeightGram = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = productMap.get(String(item.productId || ""));
      const qty = Math.floor(Number(item.qty));
      if (!product || !Number.isFinite(qty) || qty < 1 || qty > 50) {
        return res.status(400).json({ error: "Produk atau jumlah pesanan tidak valid." });
      }
      const flashItem = flashMap.get(product.id);
      if (flashItem && qty > flashItem.limitQty) {
        return res.status(400).json({
          error: `Maksimal pembelian Flash Sale untuk ${product.title} adalah ${flashItem.limitQty} pcs.`
        });
      }
      if (product.stock < qty) {
        return res.status(400).json({ error: `Stok ${product.title} tidak mencukupi.` });
      }
      const unitPrice = flashItem ? flashItem.flashPrice : product.price;
      subtotal += unitPrice * qty;
      totalWeightGram += (product.weightGram || 350) * qty;
      verifiedItems.push({
        productId: product.id,
        title: product.title,
        price: unitPrice,
        qty
      });
    }

    // Hitung ulang ongkir di server (anti-manipulasi ongkir dari client)
    const shippingCalc = await calculateInstantShipping({
      destLat,
      destLng,
      totalWeightGram
    });
    const selectedRate = shippingCalc.rates.find((r) => r.id === courierId);
    if (!selectedRate) {
      return res.status(400).json({ error: "Pilihan kurir instan tidak valid." });
    }

    const grandTotal = subtotal + selectedRate.price;
    const orderId = `DIM-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    const qris = await createQrisCharge({
      orderId,
      grossAmount: grandTotal,
      customer: cleanCustomer
    });

    const orderRecord = {
      orderId,
      status: "PENDING",
      items: verifiedItems,
      customer: cleanCustomer,
      shipping: {
        ...selectedRate,
        distanceKm: shippingCalc.distanceKm,
        lat: destLat,
        lng: destLng
      },
      subtotal,
      shippingCost: selectedRate.price,
      grandTotal,
      qris,
      createdAt: Date.now(),
      paidAt: null
    };

    orders.set(orderId, orderRecord);

    res.status(201).json({
      orderId,
      status: orderRecord.status,
      subtotal,
      shippingCost: selectedRate.price,
      grandTotal,
      shipping: orderRecord.shipping,
      qris: {
        provider: qris.provider,
        qrImageDataUrl: qris.qrImageDataUrl,
        expiresAt: qris.expiresAt
      }
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat memproses pesanan." });
  }
});

// 4. Endpoint Auto-Check Status Pembayaran QRIS
app.get("/api/orders/:orderId/status", async (req, res) => {
  const orderId = sanitizeText(req.params.orderId, 40);
  const order = orders.get(orderId);
  if (!order) {
    return res.status(404).json({ error: "Pesanan tidak ditemukan." });
  }

  if (order.status === "PENDING" && Date.now() > order.qris.expiresAt) {
    order.status = "EXPIRED";
  }

  // Jika menggunakan Midtrans, cek status real-time ke server Midtrans
  if (order.status === "PENDING" && order.qris.provider === "midtrans") {
    try {
      const liveStatus = await checkMidtransStatus(orderId);
      if (liveStatus === "PAID") {
        order.status = "PAID";
        order.paidAt = Date.now();
      } else if (liveStatus === "EXPIRED") {
        order.status = "EXPIRED";
      }
    } catch (err) {
      console.warn("Midtrans status check warning:", err.message);
    }
  }

  res.json({
    orderId: order.orderId,
    status: order.status,
    grandTotal: order.grandTotal,
    paidAt: order.paidAt
  });
});

// 5. Webhook Payment Gateway QRIS (Terverifikasi HMAC Signature)
app.post("/api/webhooks/qris", (req, res) => {
  const signature = req.get("x-callback-signature") || req.get("x-signature");
  const secret = process.env.WEBHOOK_SECRET;

  if (!verifyHmacSignature(req.rawBody || "", signature, secret)) {
    return res.status(401).json({ error: "Signature webhook tidak valid." });
  }

  const orderId = sanitizeText(req.body?.order_id || req.body?.orderId, 40);
  const status = String(req.body?.transaction_status || req.body?.status || "").toLowerCase();
  const order = orders.get(orderId);

  if (!order) {
    return res.status(404).json({ error: "Order tidak ditemukan." });
  }

  if (["settlement", "capture", "paid"].includes(status)) {
    order.status = "PAID";
    order.paidAt = Date.now();
  } else if (["expire", "cancel", "deny", "expired"].includes(status)) {
    order.status = "EXPIRED";
  }

  res.json({ ok: true });
});

// 6. Simulasi Pembayaran Khusus Mode Sandbox (Otomatis nonaktif di mode Midtrans)
app.post("/api/sandbox/confirm-payment", (req, res) => {
  if ((process.env.PAYMENT_PROVIDER || "sandbox").toLowerCase() !== "sandbox") {
    return res.status(403).json({ error: "Endpoint ini hanya aktif di mode sandbox." });
  }
  const orderId = sanitizeText(req.body?.orderId, 40);
  const order = orders.get(orderId);
  if (!order) return res.status(404).json({ error: "Pesanan tidak ditemukan." });
  if (order.status === "PENDING") {
    order.status = "PAID";
    order.paidAt = Date.now();
  }
  res.json({ orderId: order.orderId, status: order.status, paidAt: order.paidAt });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Dimsum Inc Frozen server berjalan aman di http://localhost:${PORT}`);
  });
}

module.exports = app;
