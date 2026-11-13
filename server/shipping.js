/**
 * Kalkulator Ongkos Kirim Instan (Gojek & Grab)
 * Mendukung Biteship Live API jika BITESHIP_API_KEY diisi,
 * dan fallback kalkulasi jarak Haversine + tarif resmi estimasi Jabodetabek.
 */

const STORE_LAT = Number(process.env.STORE_LAT || -6.2615);
const STORE_LNG = Number(process.env.STORE_LNG || 106.8106);
const MAX_INSTANT_RADIUS_KM = 40;

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Faktor koreksi jalan raya ~1.28x dari jarak garis lurus
  return Number((R * c * 1.28).toFixed(1));
}

function roundToThousand(amount) {
  return Math.ceil(amount / 1000) * 1000;
}

async function fetchBiteshipRates({ destLat, destLng, totalWeightGram }) {
  const apiKey = process.env.BITESHIP_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.biteship.com/v1/rates/couriers", {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      origin_latitude: STORE_LAT,
      origin_longitude: STORE_LNG,
      destination_latitude: destLat,
      destination_longitude: destLng,
      couriers: "gojek,grab",
      items: [
        {
          name: "Dimsum Inc Frozen",
          weight: Math.max(300, totalWeightGram),
          quantity: 1,
          value: 50000
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Biteship API error: ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data.pricing)) return null;

  return data.pricing.map((p) => ({
    id: `${p.courier_code}_${p.courier_service_code}`,
    courier: p.courier_name,
    service: p.courier_service_name,
    eta: p.duration || "1-3 Jam",
    price: Number(p.price),
    source: "biteship-live"
  }));
}

async function calculateInstantShipping({ destLat, destLng, totalWeightGram = 500 }) {
  if (!Number.isFinite(destLat) || !Number.isFinite(destLng)) {
    throw new Error("Koordinat tujuan tidak valid.");
  }
  if (destLat < -11 || destLat > 6 || destLng < 95 || destLng > 141) {
    throw new Error("Koordinat tujuan di luar wilayah Indonesia.");
  }

  const distanceKm = haversineKm(STORE_LAT, STORE_LNG, destLat, destLng);
  if (distanceKm > MAX_INSTANT_RADIUS_KM) {
    throw new Error(
      `Jarak pengiriman (${distanceKm} km) melebihi batas maksimal kurir instan/frozen (${MAX_INSTANT_RADIUS_KM} km).`
    );
  }

  // Coba Biteship Live API terlebih dahulu jika API key tersedia
  if (process.env.BITESHIP_API_KEY) {
    try {
      const liveRates = await fetchBiteshipRates({ destLat, destLng, totalWeightGram });
      if (liveRates && liveRates.length > 0) {
        return { distanceKm, rates: liveRates };
      }
    } catch (err) {
      console.warn("Fallback ke kalkulasi jarak lokal:", err.message);
    }
  }

  // Kalkulasi tarif Gojek & Grab Instant / SameDay berbasis jarak aktual
  const extraKm = Math.max(0, distanceKm - 2);
  const weightSurcharge = totalWeightGram > 5000 ? 5000 : 0;

  const rates = [
    {
      id: "gojek_instant",
      courier: "Gojek",
      service: "GoSend Instant (1-2 Jam)",
      eta: "45 - 90 Menit",
      price: roundToThousand(12000 + extraKm * 2800 + weightSurcharge),
      source: "distance-estimate"
    },
    {
      id: "grab_instant",
      courier: "Grab",
      service: "GrabExpress Instant (1-2 Jam)",
      eta: "45 - 90 Menit",
      price: roundToThousand(12000 + extraKm * 2700 + weightSurcharge),
      source: "distance-estimate"
    },
    {
      id: "gojek_sameday",
      courier: "Gojek",
      service: "GoSend SameDay (3-6 Jam)",
      eta: "3 - 6 Jam",
      price: roundToThousand(15000 + extraKm * 1200 + weightSurcharge),
      source: "distance-estimate"
    },
    {
      id: "grab_sameday",
      courier: "Grab",
      service: "GrabExpress SameDay (3-6 Jam)",
      eta: "3 - 6 Jam",
      price: roundToThousand(14500 + extraKm * 1200 + weightSurcharge),
      source: "distance-estimate"
    }
  ];

  return { distanceKm, rates };
}

module.exports = { calculateInstantShipping, STORE_LAT, STORE_LNG };
