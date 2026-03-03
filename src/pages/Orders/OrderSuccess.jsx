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
        console.log("Token:", token);
        const res = await axios.get(
          `https://api.alizoneklima.com/alizone/status/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Order status endpoint response:", res.data);
        setStatusData(res.data); // bunu state'e atıyoruz
      } catch (err) {
        console.error("Order status error:", err.response?.status, err.message);
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">🎉 Siparişiniz Alındı!</h1>
        <p className="mb-2">Faturanız Ürün teslim edildikten sonra mail adresinize gönderilecektir</p>
        <p className="mb-4">Ödemeniz başarıyla alındı ✅</p>

        {statusData ? (
          <p className="text-sm text-gray-500 mb-4">
            Sipariş durumu: {JSON.stringify(statusData)}
          </p>
        ) : (
          <p className="text-sm text-gray-400 mb-4">Faturanız Ürün teslim edildikten sonra mail adresinize gönderilecektir</p>
        )}

        <p className="text-sm text-gray-500 mb-4">
          Sipariş detaylarını "Siparişlerim" sayfasında görebilirsiniz.
        </p>
        <button
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/profile")}
        >
          Siparişlerim
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;