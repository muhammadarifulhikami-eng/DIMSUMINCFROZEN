# Dimsum Inc Frozen Official — Web Katalog, Ongkir Instan & QRIS Auto-Check

Web e-commerce modern untuk **Dimsum Inc Frozen Official** dengan fitur:
- **Katalog Bersih & Transparan**: Menampilkan produk utama, harga asli, foto, judul, dan deskripsi — bebas duplikat dan bebas variasi jebakan harga murah (*chili oil*, *sambal*, dll.).
- **Keranjang & Checkout Cepat**: Slide-over cart drawer dengan kontrol kuantitas dan modal detail produk.
- **Ongkos Kirim Instan (Gojek & Grab)**: Mendukung GPS, pencarian alamat (OpenStreetMap Nominatim), serta kalkulasi jarak otomatis + integrasi **Biteship API** untuk tarif live GoSend & GrabExpress Instant/SameDay.
- **Pembayaran QRIS Otomatis**: Generate QRIS dinamis + pengecekan status pembayaran otomatis (polling real-time setiap 3 detik + Webhook HMAC-SHA256).
- **Keamanan Berlapis**:
  - Validasi harga, stok, dan ongkir **100% di server** (client tidak bisa memanipulasi harga).
  - Security headers (`helmet` + Content Security Policy ketat, `X-Frame-Options: DENY`).
  - Rate limiting sliding-window per IP untuk mencegah brute-force & DDoS ringan.
  - Proteksi CSRF (`Origin` + `X-Requested-With`), sanitasi input anti-XSS, dan blokir prototype pollution (`__proto__`, `constructor`).
  - Verifikasi webhook pembayaran menggunakan `crypto.timingSafeEqual` (HMAC-SHA256).

## Cara Menjalankan (Produksi / Lokal)

1. Pastikan **Node.js (v18+)** sudah terpasang.
2. Masuk ke folder project dan install dependency:
   ```bash
   cd "WEB DIMSUM INC FROZEN"
   npm install
   ```
3. Salin `.env.example` menjadi `.env` dan isi kredensial Anda:
   - `BITESHIP_API_KEY` (opsional, untuk tarif live Gojek & Grab)
   - `PAYMENT_PROVIDER=midtrans` & `MIDTRANS_SERVER_KEY` (untuk QRIS live)
   - `WEBHOOK_SECRET` (string acak minimal 32 karakter)
4. Jalankan server:
   ```bash
   npm start
   ```
   Buka `http://localhost:3000` di browser.

> **Catatan:** Jika Anda membuka `public/index.html` langsung tanpa Node.js, web tetap berjalan dalam **Mode Preview Lokal** untuk mencoba UI katalog, keranjang, dan estimasi ongkir.

## Cara Import & Bersihkan Data Shopee (`dimsuminc_official`)

Jika Anda sudah mengekspor data produk Shopee (JSON dari Seller Centre atau hasil scrape setelah login):
```bash
npm run clean-shopee path/to/shopee-raw.json
```
Script `scripts/clean-shopee-catalog.js` akan otomatis:
1. Menghapus produk duplikat berdasarkan judul.
2. Membuang variasi jebakan harga murah (*chili oil*, *sambal*, *saos*, *extra*, *bubble wrap*, dll.).
3. Mengambil harga produk utama, foto, judul, dan deskripsi ke `data/catalog.json`.
