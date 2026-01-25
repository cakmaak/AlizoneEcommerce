import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCartState } from "../../features/cart/cartSlice"; 

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;

   const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
  `https://alizone-production.up.railway.app/alizone/status/${orderId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (res.data.paid) {
  dispatch(clearCartState());
  setPaid(true);
  setLoading(false);
  clearInterval(interval);
} else {
  setLoading(false);
}
  } catch (err) {
    console.error("Order status error:", err.response?.status, err.message);
    setLoading(false);
  }
};

  fetchStatus();
  interval = setInterval(fetchStatus, 1000);

  return () => clearInterval(interval);
}, [orderId, dispatch]);
  if (loading) return <p>Yükleniyor...</p>;

  if (!paid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ödemeniz henüz alınmadı...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Siparişiniz Alındı!</h1>
        <p className="mb-2">Sipariş Numaranız: #{orderId}</p>
        <p className="mb-2">Ödemeniz başarıyla alındı ✅</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/profile")}
        >
          Siparişlerim
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;