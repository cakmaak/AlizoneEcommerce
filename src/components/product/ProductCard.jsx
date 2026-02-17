import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Snowflake } from "lucide-react";
import Toast from "../ui/Toast";

const BRAND_LOGOS = {
  BOSCH: "https://res.cloudinary.com/diyibvvua/image/upload/v1765877243/boschlogo_qnv9f0.png",
  SAKURA: "https://res.cloudinary.com/diyibvvua/image/upload/v1765887110/sakuralogo_r2r0cg.jpg",
  CARRIER: "https://res.cloudinary.com/diyibvvua/image/upload/v1766229711/carrier_logo_broyda.png",
  ALTUS: "https://res.cloudinary.com/diyibvvua/image/upload/v1769003492/altus-logo-3_n4q9h9.png",
  TCL: "https://res.cloudinary.com/diyibvvua/image/upload/v1769003574/tc1509t993-tcl-logo-tcl-logo-png-and-vector-logo-download_tkrwkj.png"
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // 🔥 SLIDER STATE
  const [imgIndex, setImgIndex] = useState(0);
  const images = product.resimler?.length
    ? product.resimler
    : ["/placeholder.png"];

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      setToast({ type: "error", message: "Sepete eklemek için giriş yapınız" });
      return;
    }

    try {
      await dispatch(addCartItem({ productId: product.id, quantity: 1 })).unwrap();
      setToast({ type: "success", message: "Ürün sepete eklendi" });
    } catch (err) {
      setToast({
        type: "error",
        message: err?.message || "Stokta yeterli ürün yok",
      });
    }
  };

  const handleTeklifMail = () => {
    const subject = `Teklif Talebi - ${product.isim}`;
    const body = `
Merhaba,

Aşağıdaki ürün için teklif almak istiyorum:

Ürün: ${product.isim}
Marka: ${product.marka}
Model: ${product.model}
Fiyat: ₺${product.fiyat}
`;
    window.location.href = `mailto:yusuf612844@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const energyClass = product?.enerji?.sogutmaSinifi;
  const coolingBtu = product?.kapasite?.sogutmaBtu;

  const isMontajDahil = product.montage;
  const isOutOfStock = product.stokadeti === 0;
  const isTeklifOnly = product.teklifilesatilir === false;

  return (
    <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition">

      {/* ================= IMAGE SLIDER ================= */}
      <div className="relative h-72 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 overflow-hidden rounded-t-3xl">

        {/* SLIDER TRACK */}
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${imgIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full flex items-center justify-center">
              <img
                src={img}
                alt={product.isim}
                className="h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImgIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              );
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full w-9 h-9 flex items-center justify-center shadow z-20"
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImgIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              );
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full w-9 h-9 flex items-center justify-center shadow z-20"
          >
            ›
          </button>
        )}

        {/* BADGES */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
          {product.stokadeti !== undefined && product.stokadeti <= 3 && (
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              Son {product.stokadeti} ürün
            </span>
          )}
          {isMontajDahil && (
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              Montaj Dahil
            </span>
          )}
        </div>

        {/* BRAND LOGO */}
        {BRAND_LOGOS[product.marka?.toUpperCase()] && (
          <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow z-20">
            <img
              src={BRAND_LOGOS[product.marka.toUpperCase()]}
              alt={product.marka}
              className="h-6"
            />
          </div>
        )}

        {/* ENERGY */}
        {energyClass && (
          <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            {energyClass}
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 md:p-5 space-y-3">
        <h3 className="text-[15px] md:text-base font-semibold text-gray-900 line-clamp-2 min-h-[40px]">
          {product.isim}
        </h3>

        {coolingBtu && (
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <Snowflake className="w-4 h-4 text-sky-500" />
            {coolingBtu.toLocaleString()} BTU
          </div>
        )}

        <p className="text-sm text-gray-600">
          Kredi kartına <strong>9 aya varan taksit</strong>
        </p>

        <div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">
            ₺ {product.fiyat.toLocaleString("tr-TR")}
          </p>
          <span className="text-xs text-gray-400">KDV Dahil</span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex-1 py-3 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition"
          >
            Detayları Gör
          </button>

          {isOutOfStock ? (
            <button
              disabled
              className="flex-1 py-3 rounded-xl bg-gray-300 text-gray-600 font-semibold"
            >
              Stokta Yok
            </button>
          ) : isTeklifOnly ? (
            <button
              onClick={handleTeklifMail}
              className="flex-1 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            >
              Teklif Al
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Sepete Ekle
            </button>
          )}
        </div>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

export default ProductCard;