/**
 * Flash Sale 5-Jam Rotasi Otomatis (5 Produk Satuan, Diskon 5%, Limit 3 pcs/produk)
 */

const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
const SINGLE_CATEGORIES = new Set(["Dimsum Kukus", "Dimsum Goreng", "Bakpao & Mantau"]);
const FLASH_SALE_LIMIT = 3;
const FLASH_DISCOUNT_RATE = 0.05;

function getFlashSaleState(products, now = Date.now()) {
  const singles = products.filter((p) => SINGLE_CATEGORIES.has(p.category));
  const pool = singles.length >= 5 ? singles : products;
  const slot = Math.floor(now / FIVE_HOURS_MS);
  const nextRotationAt = (slot + 1) * FIVE_HOURS_MS;

  const selected = [];
  if (pool.length > 0) {
    const startIdx = (slot * 5) % pool.length;
    for (let i = 0; i < Math.min(5, pool.length); i++) {
      const p = pool[(startIdx + i) % pool.length];
      const flashPrice = Math.round(p.price * (1 - FLASH_DISCOUNT_RATE));
      selected.push({
        id: p.id,
        originalPrice: p.price,
        flashPrice,
        limitQty: FLASH_SALE_LIMIT
      });
    }
  }

  return {
    slot,
    nextRotationAt,
    limitQty: FLASH_SALE_LIMIT,
    items: selected
  };
}

module.exports = { getFlashSaleState, FLASH_SALE_LIMIT };
