import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="space-y-4">
        <Link
          to="/admin/add-product"
          className="block w-fit px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          ➕ Ürün Ekle
        </Link>
         <Link
          to="/admin/update-price"
          className="block w-fit px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          ➕ Fiyat Güncelle
        </Link>

        <Link
          to="/admin/setname"
          className="block w-fit px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          ➕ İsim Güncelle
        </Link>

        
      
        <Link
  to="/admin/update-image"
  className="block w-fit px-6 py-3 bg-indigo-600 text-white rounded-lg"
>
  🖼️ Ürün Fotoğraflarını Güncelle
</Link>
<Link
  to="/admin/update-stock"
  className="block w-fit px-6 py-3 bg-blue-600 text-white rounded-lg"
>
  📦 Stok Güncelle
</Link>
<Link
  to="/admin/delivered-truck"
  className="block w-fit px-6 py-3 bg-indigo-600 text-white rounded-lg"
>
  🚚 Kargo Gir
</Link>
<Link
  to="/admin/update-btu"
  className="block w-fit px-6 py-3 bg-sky-600 text-white rounded-lg"
>
  ❄️ BTU Güncelle
</Link>
<Link
  to="/admin/refund-order"
  className="block w-fit px-6 py-3 bg-red-600 text-white rounded-lg"
>
  💸 Refund Başlat
</Link>
<Link
  to="/admin/set-teklif"
  className="block w-fit px-6 py-3 bg-gray-900 text-white rounded-lg"
>
  🏷️ Teklifli Ürünleri Yönet
</Link>

        

      </div>
    </div>
  );
};

export default AdminDashboard;
