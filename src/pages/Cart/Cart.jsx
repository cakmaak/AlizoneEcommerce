import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses } from "../../features/address/addressSlice";
import { Link } from "react-router-dom";
import { fetchCart } from "../../features/cart/cartSlice";
import { useEffect } from "react";





import {
  deleteCartItem,
  updateCartQuantity,
} from "../../features/cart/cartSlice";
import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Sepeti çekme
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(fetchCart())
      .unwrap()
      .catch((err) => {
        console.log("Sepet getirilemedi:", err.response?.status);
        // opsiyonel: kullanıcıyı login sayfasına yönlendirebilirsin
      });
  }
}, [dispatch]);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.fiyat) * Number(item.adet),
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-14 h-14 text-gray-400" />
        <h2 className="text-2xl font-bold">Sepetiniz boş</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold"
        >
          Ürünleri İncele
        </button>
      </div>
    );
  }
  const handleCheckout = async () => {  
  if (!termsAccepted) return;

  try {
    const data = await createOrder({
      addressId: selectedAddressId, 
      contractsAccepted: termsAccepted,
    });

    if (data.paymentLink) {
      window.location.href = data.paymentLink; 
    } else {
      alert("Sipariş oluşturulamadı.");
    }
  } catch (error) {
    alert("Sipariş oluşturulamadı. Lütfen tekrar deneyin.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-emerald-600" />
          Sepetim
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ÜRÜNLER */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <CartItem
                key={item.basketItemId}
                item={item}
                dispatch={dispatch}
              />
            ))}
          </div>

          {/* SİPARİŞ ÖZETİ */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Ara Toplam</span>
              <span>{totalPrice.toLocaleString()} ₺</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Kargo</span>
              <span className="text-emerald-600 font-semibold">
                Ücretsiz
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-extrabold">
              <span>Toplam</span>
              <span>{totalPrice.toLocaleString()} ₺</span>
            </div>
          
        <button
  onClick={() => navigate("/order/select-address")}
  className="w-full mt-6 py-4 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition"
>
  Ödemeye Geç
</button>

            <div className="mt-5 flex items-center gap-3 bg-emerald-50 p-4 rounded-xl text-sm">
              <Package className="w-5 h-5 text-emerald-600" />
              <span>Güvenli teslimat • 2-3 iş günü</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, dispatch }) => {
  const images = item.imageUrl || [];
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-5 
flex flex-col sm:flex-row gap-4 sm:gap-5">
      {/* SOL - SLIDER */}
      <div className="w-36 flex-shrink-0">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border">
          <img
            src={images[index]}
            alt={item.productIsim}
            className="w-full h-full object-contain p-2"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setIndex(index === 0 ? images.length - 1 : index - 1)
                }
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() =>
                  setIndex(index === images.length - 1 ? 0 : index + 1)
                }
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* THUMBNAIL */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-10 h-10 rounded-lg border overflow-hidden ${
                  index === i ? "ring-2 ring-emerald-500" : ""
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SAĞ - DETAY */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 line-clamp-2">
            {item.productIsim}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Inverter Klima • A++ Enerji
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* ADET */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() =>
                item.adet > 1 &&
                dispatch(
                  updateCartQuantity({
                    basketItemId: item.basketItemId,
                    quantity: item.adet - 1,
                  })
                )
              }
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="px-4 font-bold">{item.adet}</span>

            <button
              onClick={() =>
                dispatch(
                  updateCartQuantity({
                    basketItemId: item.basketItemId,
                    quantity: item.adet + 1,
                  })
                )
              }
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* FİYAT */}
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {item.fiyat.toLocaleString()} ₺ / adet
            </p>
            <p className="text-lg font-extrabold text-emerald-600">
              {(item.fiyat * item.adet).toLocaleString()} ₺
            </p>
          </div>
        </div>
      </div>

      {/* SİL */}
      <button
        onClick={() => dispatch(deleteCartItem(item.basketItemId))}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Cart;
