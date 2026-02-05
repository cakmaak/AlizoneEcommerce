// pages/admin/AdminOrders.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/admin/adminProductSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(
    (state) => state.adminProduct
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders
  ?.filter(o => o.siparisdurumu === "PAID") // sadece ödemesi tamamlanmış
  ?.filter(o => {
    const q = search.toLowerCase();
    return (
      o.id.toString().includes(q) ||
      o.user.isim.toLowerCase().includes(q) ||
      o.user.soyisim.toLowerCase().includes(q) ||
      o.user.email.toLowerCase().includes(q) ||
      o.user.telno?.includes(q)
    );
  })
  ?.sort((a, b) => new Date(b.olusturmatarihi) - new Date(a.olusturmatarihi)); // en yeni en üstte
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        📦 PAID Siparişler
      </h1>

      {/* ARAMA */}
      <input
        type="text"
        placeholder="Sipariş ID, ad, mail veya telefon ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg"
      />

      {isLoading && (
        <p className="text-gray-500">Yükleniyor...</p>
      )}

      {/* TABLO */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Müşteri</th>
              <th className="p-2 border">E-mail</th>
              <th className="p-2 border">Telefon</th>
              <th className="p-2 border">Adres</th>
              <th className="p-2 border">Tutar</th>
              <th className="p-2 border">Tarih</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Sonuç bulunamadı
                </td>
              </tr>
            )}

            {filteredOrders?.map(order => {
              const adres = order.teslimatAdresi;

              return (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-2 border text-center">
                    {order.id}
                  </td>

                  <td className="p-2 border">
                    {order.user.isim} {order.user.soyisim}
                  </td>

                  <td className="p-2 border">
                    {order.user.email}
                  </td>

                  <td className="p-2 border">
                    {order.user.telno}
                  </td>

                  <td className="p-2 border text-xs max-w-xs">
                    {adres
                      ? `${adres.adresSatiri}, ${adres.ilce} / ${adres.il}`
                      : "Adres yok"}
                  </td>

                  <td className="p-2 border text-right font-semibold">
                    ₺{order.toplamtutar.toLocaleString("tr-TR")}
                  </td>

                  <td className="p-2 border text-center">
                    {new Date(order.olusturmatarihi)
                      .toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
