import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        // --- DEĞİŞİKLİK BURADA BAŞLIYOR ---
        const config = {};
        
        // Eğer token varsa (null veya undefined değilse) header'ı ekle
        if (token && token !== "null") {
          config.headers = { Authorization: `Bearer ${token}` };
        }
        // --- DEĞİŞİKLİK BURADA BİTİYOR ---



        const res = await axios.get(
          `https://api.alizoneklima.com/alizone/status/${orderId}`,
          config // { headers: ... } yerine direkt config objesini veriyoruz
        );
        
        console.log("Response:", res.data);
        setStatusData(res.data);
      } catch (err) {
        console.error("401 Hatası Alındı! Token kontrol et:", err.response?.status);
      }
    };

    if (orderId) checkStatus();
  }, [orderId]);

  // Token yoksa misafirdir
  const isGuest = !localStorage.getItem("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">🎉 Siparişiniz Alındı!</h1>
        <p className="mb-2">Ödemeniz başarıyla alındı ✅</p>
        <p className="text-sm text-gray-500 mb-6">Faturanız mail adresinize gönderilecektir.</p>

        {/* Buton Yönlendirmesi: Misafirse Ana Sayfaya, Üyeyse Profile */}
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate(isGuest ? "/" : "/profile")}
        >
          {isGuest ? "Ana Sayfaya Dön" : "Siparişlerim"}
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;