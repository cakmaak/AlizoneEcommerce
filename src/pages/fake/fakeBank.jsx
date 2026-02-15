import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CryptoJS from "crypto-js";

const FakeBank = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL'den orderId ve amount al
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!orderId || !amount) {
      alert("Sipariş bilgisi eksik!");
      navigate("/cart");
    }
  }, [orderId, amount, navigate]);
  console.log(localStorage.getItem("token"));
  

  const handlePayment = async (success) => {
  const timestamp = Date.now();
  const paymentId = "PAY-" + Math.floor(Math.random() * 10000);

  const data = `${orderId}|${success}|${timestamp}|${paymentId}`;
  const signature = CryptoJS
    .HmacSHA256(data, "alizone_test_secret_123")
    .toString(CryptoJS.enc.Base64);

  try {
    const res = await fetch("https://alizone-production.up.railway.app/payment/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: Number(orderId),
        success,
        timestamp,
        paymentId,
        signature,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    
    setTimeout(() => {
      if (success) {
        navigate(`/order/success/${orderId}`, { replace: true });
      } else {
        navigate("/cart", { replace: true });
      }
    }, 500);
  } catch (err) {
    console.error("Callback error:", err.message);
    alert("Ödeme tamamlanamadı!");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">FakeBank Ödeme</h1>
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center font-semibold">
  Bu sayfa test amaçlıdır. Gerçek bir banka veya ödeme kuruluşu değildir.
  Herhangi bir ödeme alınmamaktadır.
</div>
      <p className="text-lg">
        Sipariş: #{orderId} | Tutar: {amount} ₺
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => handlePayment(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
        >
          Ödemeyi Onayla
        </button>

        <button
          onClick={() => handlePayment(false)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
        >
          Ödemeyi Reddet
        </button>
      </div>
    </div>
  );
};

export default FakeBank;