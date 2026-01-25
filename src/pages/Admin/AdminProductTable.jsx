import { useState } from "react";

const AdminProductTable = ({ products }) => {
  const [search, setSearch] = useState("");

  const filtered = products
  .filter((p) =>
    `${p.id} ${p.isim} ${p.marka} ${p.model} ${p.kategori}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => a.stokAdeti - b.stokAdeti);

  return (
    <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">📦 Ürünler</h2>

      <input
        type="text"
        placeholder="Ürün ara (id, isim, marka...)"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">İsim</th>
              <th className="p-2 border">Marka</th>
              <th className="p-2 border">Kategori</th>
              <th className="p-2 border">Fiyat</th>
              <th className="p-2 border">Stok</th>
              <th className="p-2 border">Aktif</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.isim}</td>
                <td className="p-2 border">{p.marka}</td>
                <td className="p-2 border">{p.kategori}</td>
                <td className="p-2 border font-semibold">
                  {p.fiyat.toLocaleString()} ₺
                </td>
                <td className="p-2 border">{p.stokAdeti}</td>
                <td className="p-2 border">
                  {p.aktif ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Sonuç bulunamadı
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProductTable
