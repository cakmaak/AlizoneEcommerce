import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendDeliveredTruck,
  fetchOrders,
} from "../../features/admin/adminProductSlice";
import AdminOrders from "./AdminOrders";

const DeliveredTruck = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(
    (state) => state.adminProduct
  );

  const [orderId, setOrderId] = useState("");
  const [trackingNo, setTrackingNo] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      sendDeliveredTruck({
        orderId,
        trackingNo,
      })
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* KARGO FORMU */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow h-fit">
          <h1 className="text-2xl font-bold mb-6">
            🚚 Kargo Bilgisi Gir
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Sipariş ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Kargo Takip No (TR123...)"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold disabled:opacity-60"
            >
              {isLoading ? "Gönderiliyor..." : "Kargoya Verildi"}
            </button>

            {success && (
              <p className="text-emerald-600 font-medium">
                ✅ Kargo bilgisi gönderildi
              </p>
            )}

            {error && (
              <p className="text-red-600 font-medium">
                ❌ {error}
              </p>
            )}
          </form>
        </div>

        {/* SİPARİŞ TABLOSU */}
        <div className="lg:col-span-2">
          <AdminOrders />
        </div>
      </div>
    </div>
  );
};

export default DeliveredTruck;
