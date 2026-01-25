import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductBtu,
  getAdminProducts,
} from "../../features/admin/adminProductSlice";
import AdminProductTable from "./AdminProductTable";

const UpdateBtu = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error, products = [] } = useSelector(
    (state) => state.adminProduct
  );

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const [productId, setProductId] = useState("");
  const [btu, setBtu] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProductBtu({
        productId,
        btu: Number(btu),
      })
    );
  };

  return (
    <div className="space-y-16">
      {/* 🔹 FORM */}
      <div className="max-w-md bg-white p-8 rounded-2xl shadow mx-auto">
        <h1 className="text-2xl font-bold mb-6">❄️ BTU Güncelle</h1>

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
            placeholder="Yeni BTU (örn: 9000)"
            value={btu}
            onChange={(e) => setBtu(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold"
          >
            {isLoading ? "Güncelleniyor..." : "BTU Güncelle"}
          </button>

          {success && (
            <p className="text-emerald-600 font-medium">
              BTU güncellendi
            </p>
          )}

          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}
        </form>
      </div>

      {/* 🔹 TABLO */}
      <div className="max-w-7xl mx-auto px-4">
        <AdminProductTable products={products} />
      </div>
    </div>
  );
};

export default UpdateBtu;
