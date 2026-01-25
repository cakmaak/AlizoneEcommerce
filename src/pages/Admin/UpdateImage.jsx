import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductImages } from "../../features/admin/adminProductSlice";

const UpdateImage = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(
    (state) => state.adminProduct
  );

  const [productId, setProductId] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageList = images
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    dispatch(
      updateProductImages({
        productId,
        images: imageList,
      })
    );
  };

  return (
    <div className="max-w-lg bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        🖼️ Ürün Fotoğraflarını Güncelle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Ürün ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

        <textarea
          rows={5}
          placeholder={`Her satıra 1 foto URL yaz`}
          value={images}
          onChange={(e) => setImages(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

        <button
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          {isLoading ? "Güncelleniyor..." : "Fotoğrafları Güncelle"}
        </button>

        {success && (
          <p className="text-emerald-600 font-medium">
            Fotoğraflar güncellendi
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}
      </form>
    </div>
  );
};

export default UpdateImage;
