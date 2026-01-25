import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, startRefund } from "../../features/admin/adminProductSlice";

const RefundOrder = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(
    (state) => state.adminProduct
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleRefund = (orderId) => {
    if (!window.confirm("Bu sipariş için iade başlatılsın mı?")) return;

    dispatch(startRefund(orderId))
      .unwrap()
      .then(() => {
        alert("Refund başlatıldı");
        dispatch(fetchOrders());
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">💸 Refund Başlat</h1>

      {isLoading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Sipariş ID</th>
              <th className="p-3">Kullanıcı</th>
              <th className="p-3">Tutar</th>
              <th className="p-3">Durum</th>
              <th className="p-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.user?.email}</td>
                <td className="p-3">{order.toplamtutar} ₺</td>
                <td className="p-3">{order.siparisdurumu}</td>
                <td className="p-3">
                  {(order.siparisdurumu === "PAID" ||
                    order.siparisdurumu === "CANCELLED") && (
                    <button
                      onClick={() => handleRefund(order.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Refund Başlat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundOrder;