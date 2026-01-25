import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProductTeklif } from "../../features/admin/adminProductSlice";

const Setteklifal = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const handleTeklifKapat = () => {
    if (!productId) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            type: "error",
            message: "Ürün ID girmen lazım knk",
          },
        })
      );
      return;
    }

    dispatch(setProductTeklif(Number(productId)))
      .unwrap()
      .then(() => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              type: "success",
              message: `Ürün (${productId}) için teklif kapatıldı`,
            },
          })
        );
        setProductId("");
      })
      .catch((err) => {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              type: "error",
              message: err || "İşlem başarısız",
            },
          })
        );
      });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">
        Ürün Teklif Kapat
      </h1>

      <div className="max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Ürün ID
          </label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Örn: 42"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleTeklifKapat}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Teklif Kapat
        </button>
      </div>
    </div>
  );
};

export default Setteklifal;