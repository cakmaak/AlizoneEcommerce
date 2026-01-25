import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductPrice,
  getAdminProducts,
} from "../../features/admin/adminProductSlice";
import AdminProductTable from "./AdminProductTable";

const UpdatePrice = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error, products } = useSelector(
    (state) => state.adminProduct
  );

  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProductPrice({
        productId,
        price: Number(price),
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">
        💰 Fiyat Güncelle
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Ürün ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="number"
              placeholder="Yeni Fiyat"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl"
            />

            <button
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? "Güncelleniyor..." : "Fiyat Güncelle"}
            </button>

            {success && (
              <p className="text-emerald-600 font-medium">
                ✅ Fiyat güncellendi
              </p>
            )}

            {error && (
              <p className="text-red-600 font-medium">
                ❌ {error}
              </p>
            )}
          </form>
        </div>

        {/* TABLE */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow overflow-x-auto">
          <AdminProductTable products={products} />
        </div>

      </div>
    </div>
  );
};

export default UpdatePrice;