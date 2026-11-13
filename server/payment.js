const QRCode = require("qrcode");
const crypto = require("crypto");

/**
 * Adapter Pembayaran QRIS (Midtrans Core API + Sandbox Mode)
 * Mendukung auto-check status pembayaran baik via Webhook maupun Polling API.
 */

function getMidtransBaseUrl() {
  return process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://api.midtrans.com"
    : "https://api.sandbox.midtrans.com";
}

async function createQrisCharge({ orderId, grossAmount, customer }) {
  const provider = (process.env.PAYMENT_PROVIDER || "sandbox").toLowerCase();
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (provider === "midtrans" && serverKey) {
    const auth = Buffer.from(`${serverKey}:`).toString("base64");
    const response = await fetch(`${getMidtransBaseUrl()}/v2/charge`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        payment_type: "qris",
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount
        },
        customer_details: {
          first_name: customer.name,
          phone: customer.phone
        }
      })
    });

    const data = await response.json();
    if (!response.ok || (data.status_code !== "201" && data.status_code !== "200")) {
      throw new Error(data.status_message || "Gagal membuat transaksi QRIS Midtrans.");
    }

    const qrAction = (data.actions || []).find((a) => a.name === "generate-qr-code");
    const qrString = data.qr_string || "";
    const qrDataUrl = qrString ? await QRCode.toDataURL(qrString, { width: 300, margin: 2 }) : qrAction?.url;

    return {
      provider: "midtrans",
      qrString,
      qrImageDataUrl: qrDataUrl,
      expiresAt: Date.now() + 15 * 60_000
    };
  }

  // Sandbox QRIS payload (standar format EMVCo QRIS simulasi untuk pengujian lokal)
  const sandboxPayload = `00020101021226580014ID.CO.DIMSUMINC0118936009140000000001520458125303360540${String(
    grossAmount
  )}5802ID5917DIMSUM INC FROZEN6007JAKARTA62200116${orderId}6304${crypto
    .createHash("md5")
    .update(orderId)
    .digest("hex")
    .slice(0, 4)
    .toUpperCase()}`;

  const qrImageDataUrl = await QRCode.toDataURL(sandboxPayload, {
    width: 300,
    margin: 2,
    color: { dark: "#111827", light: "#ffffff" }
  });

  return {
    provider: "sandbox",
    qrString: sandboxPayload,
    qrImageDataUrl,
    expiresAt: Date.now() + 15 * 60_000
  };
}

async function checkMidtransStatus(orderId) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return null;

  const auth = Buffer.from(`${serverKey}:`).toString("base64");
  const response = await fetch(`${getMidtransBaseUrl()}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json"
    }
  });

  if (!response.ok) return null;
  const data = await response.json();
  if (["settlement", "capture"].includes(data.transaction_status)) {
    return "PAID";
  }
  if (["expire", "cancel", "deny"].includes(data.transaction_status)) {
    return "EXPIRED";
  }
  return "PENDING";
}

module.exports = { createQrisCharge, checkMidtransStatus };
