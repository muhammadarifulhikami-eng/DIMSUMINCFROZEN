/**
 * Shopee Catalog Deduplicator & Variation Cleaner
 * ------------------------------------------------
 * Membersihkan hasil export/scrape Shopee:
 * 1. Menghapus produk duplikat berdasarkan judul yang dinormalisasi.
 * 2. Menghapus variasi jebakan harga murah (seperti "chili oil", "sambal", "saos", "extra")
 *    dan mengambil harga produk utama, foto, judul, serta deskripsi.
 *
 * Penggunaan:
 *   node scripts/clean-shopee-catalog.js path/to/shopee-raw.json
 */

const fs = require("fs");
const path = require("path");

const EXCLUDED_VARIATION_KEYWORDS = [
  "chili oil",
  "chilioil",
  "sambal",
  "saos",
  "saus",
  "extra",
  "tambahan",
  "add on",
  "addon",
  "bubble wrap",
  "kardus",
  "packing",
  "ice gel",
  "thermafreeze"
];

function normalizeTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/\[.*?\]|\(.*?\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isDecoyVariation(name) {
  const lower = String(name || "").toLowerCase();
  return EXCLUDED_VARIATION_KEYWORDS.some((kw) => lower.includes(kw));
}

function extractMainPrice(rawItem) {
  // Jika ada daftar variasi/models dari Shopee API, buang variasi chili oil/add-on
  if (Array.isArray(rawItem.models) && rawItem.models.length > 0) {
    const mainModels = rawItem.models.filter((m) => !isDecoyVariation(m.name));
    const candidates = mainModels.length > 0 ? mainModels : rawItem.models;

    // Ambil harga produk utama (bukan harga add-on termurah)
    const prices = candidates
      .map((m) => Number(m.price))
      .filter((p) => Number.isFinite(p) && p > 0)
      .map((p) => (p > 10000000 ? Math.round(p / 100000) : p)); // handle skala 100000 Shopee

    if (prices.length > 0) {
      return Math.max(...prices);
    }
  }

  // Fallback ke price_max (karena price_min sering berisi harga variasi chili oil)
  const rawPrice = Number(rawItem.price_max || rawItem.price || 0);
  return rawPrice > 10000000 ? Math.round(rawPrice / 100000) : rawPrice;
}

function cleanShopeeCatalog(rawItems) {
  const seenTitles = new Set();
  const cleaned = [];

  for (const item of rawItems) {
    const title = String(item.name || item.title || "").trim();
    if (!title || isDecoyVariation(title)) continue;

    const norm = normalizeTitle(title);
    if (seenTitles.has(norm)) continue; // Hapus duplikat
    seenTitles.add(norm);

    const price = extractMainPrice(item);
    if (!price || price <= 0) continue;

    const rawImage = item.image || (Array.isArray(item.images) ? item.images[0] : "");
    const imageUrl = rawImage.startsWith("http")
      ? rawImage
      : rawImage
      ? `https://down-id.img.susercontent.com/file/${rawImage}`
      : "";

    cleaned.push({
      id: `shopee-${item.itemid || cleaned.length + 1}`,
      title,
      category: item.category || "Dimsum Frozen",
      price,
      originalPrice: Number(item.price_before_discount) > price ? Number(item.price_before_discount) : Math.round(price * 1.15),
      weightGram: Number(item.weightGram || item.weight || 350),
      stock: Number(item.stock ?? 50),
      badge: item.badge || "",
      image: imageUrl,
      description: String(item.description || "Produk Dimsum Inc Frozen Official. Siap kukus/goreng dari kondisi beku.").trim()
    });
  }

  return cleaned;
}

if (require.main === module) {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/clean-shopee-catalog.js <shopee-raw.json>");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
  const items = Array.isArray(raw) ? raw : raw.items || raw.products || [];
  const cleaned = cleanShopeeCatalog(items);

  const catalogPath = path.resolve(__dirname, "../data/catalog.json");
  const currentCatalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  currentCatalog.products = cleaned;

  fs.writeFileSync(catalogPath, JSON.stringify(currentCatalog, null, 2), "utf8");
  console.log(`Berhasil membersihkan ${items.length} item -> ${cleaned.length} produk utama unik tersimpan di data/catalog.json.`);
}

module.exports = { cleanShopeeCatalog, normalizeTitle, isDecoyVariation };
