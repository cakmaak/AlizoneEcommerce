import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
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
  const items = useSelector((state) => state.cart.items);
  const [toast, setToast] = useState(null);


  const images = product.resimler || [];
  const [index, setIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
const handleAddToCart = async (e) => {
  e.stopPropagation();

  const token = localStorage.getItem("token");

  if (!token) {
    setToast({
      type: "error",
      message: "Sepete eklemek için giriş yapınız",
    });
    return;
  }

  try {
    await dispatch(
      addCartItem({ productId: product.id, quantity: 1 })
    ).unwrap();

    setToast({
      type: "success",
      message: "Ürün sepete eklendi",
    });
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

  const mail = `mailto:yusuf612844@gmail.com
?subject=${encodeURIComponent(subject)}
&body=${encodeURIComponent(body)}`;

  window.location.href = mail;
};

 



  const energyClass = product?.enerji?.sogutmaSinifi;
  const coolingBtu = product?.kapasite?.sogutmaBtu;
  const isMontajDahil = product.marka?.toUpperCase() === "BOSCH" || "ALTUS";
  const isOutOfStock = product.stokadeti === 0;
const isTeklifOnly = product.teklifilesatilir === false;

  return (
    <div
      
      className="group bg-white rounded-3xl border border-gray-200 shadow-sm"
    >
      {/* IMAGE SLIDER */}
      <div className="relative h-80 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-3xl">
        <img
          src={images[index]}
          alt={product.isim}
          className="h-full object-contain transition-all duration-500"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {BRAND_LOGOS[product.marka?.toUpperCase()] && (
          <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow">
            <img
              src={BRAND_LOGOS[product.marka.toUpperCase()]}
              alt={product.marka}
              className="h-6"
            />
          </div>
        )}

        {energyClass && (
          <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {energyClass}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-5 space-y-3">
        <h3 className="text-[15px] md:text-base font-semibold text-gray-900
               line-clamp-2 min-h-[40px] leading-snug">
          {product.isim}
        </h3>

        <div className="flex justify-between text-sm text-gray-600">
          {coolingBtu && (
            <span className="flex items-center gap-1">
              <Snowflake className="w-4 h-4 text-sky-500" />
              {coolingBtu.toLocaleString()} BTU
            </span>
          )}
          <span className={isMontajDahil ? "text-emerald-700" : "text-gray-500"}>
            {isMontajDahil ? "Montaj Dahil" : "Montaj Hariç"}
          </span>
        </div>

        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="w-full"
        >
          <span className="text-indigo-600 font-bold">Detayları Gör</span>
        </button>

        <div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">
            ₺ {product.fiyat.toLocaleString("tr-TR")}
          </p>
          <span className="text-xs text-gray-400">KDV Dahil</span>
        </div>

        {isOutOfStock ? (
  <button
    disabled
    className="w-full py-3 rounded-xl bg-gray-300 text-gray-600
    text-sm font-semibold cursor-not-allowed"
  >
    Stokta Yok
  </button>
) : isTeklifOnly ? (
   <button
  onClick={handleTeklifMail}
  className=" w-full py-3 rounded-xl bg-gray-900 text-white
    text-sm font-semibold hover:bg-gray-800 transition"
>
  Teklif Al
</button>
 
) : (
  <button
    onClick={handleAddToCart}
    className="w-full py-3 rounded-xl bg-indigo-600 text-white
    text-sm font-semibold hover:bg-indigo-700 transition"
    
  >
    Sepete Ekle
  </button>
)}
        
{toast && (
  <Toast
    type={toast.type}
    message={toast.message}
    onClose={() => setToast(null)}
  />
)}
      </div>
    </div>
  );
};



export default ProductCard;
