import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../features/address/addressSlice";
import { createOrder as createOrderApi } from "../../services/orderApi";
import { useNavigate } from "react-router-dom";
import { MapPin, User, Phone, FileText, Building2, Home, ShoppingCart,Check } from "lucide-react";
import { fetchCart } from "../../features/cart/cartSlice";
import { addAddress } from "../../features/address/addressSlice";
import { Link } from "react-router-dom";
import { showToast } from "../../components/ui/showToast";





const AddressSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector((state) => state.address);
const { items: cartItems = [], totalPrice = 0 } = useSelector(
  (state) => state.cart
);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);


  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleSelect = (id) => setSelectedAddressId(id);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Adresler yükleniyor...</p>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Henüz adres yok. Lütfen önce bir adres ekleyin.</p>
        <button onClick={() => navigate("/addresses/add")}>
  Yeni Adres Ekle
</button>
      </div>
    );
  const handleCreateOrder = async () => {
  if (!selectedAddressId) {
    showToast("error", "Lütfen bir teslimat adresi seçin");
    return;
  }

  if (!termsAccepted) {
   showToast("error", "KVKK ve Mesafeli Satış Sözleşmesini kabul etmelisiniz");
    return;
  }

  try {
    setCreatingOrder(true);

    const result = await createOrderApi({
      addressId: selectedAddressId,
      contractsAccepted: true,
    });

    const url = new URL(result.paymentLink);
    const orderId = url.searchParams.get("orderId");
    const amount = url.searchParams.get("amount");

    navigate(`/fakebank?orderId=${orderId}&amount=${amount}`);
  } catch (err) {
   showToast("error", "Sipariş oluşturulamadı");
  } finally {
    setCreatingOrder(false);
  }
};
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
     {orderSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
      
      {/* ICON */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" />
        </div>
      </div>

      {/* TEXT */}
      <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
        Siparişiniz Alındı 🎉
      </h2>

      <p className="mt-2 text-center text-gray-600 text-sm">
        Sipariş Numaranız
      </p>

      <p className="text-center text-lg font-bold text-green-700 mt-1">
        #{orderId}
      </p>

      <p className="mt-4 text-center text-gray-600 text-sm leading-relaxed">
        Siparişinizi <span className="font-semibold">Siparişlerim</span> sayfasından
        anlık olarak takip edebilirsiniz.
      </p>

      {/* ACTIONS */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow"
        >
          Siparişlerim
        </button>

        <button
          onClick={() => {
            setOrderSuccess(false);
            navigate("/");
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold"
        >
          Alışverişe Devam
        </button>
      </div>
    </div>
  </div>
)}


      <div className="max-w-5xl mx-auto">
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
          Sipariş ve Adres Seçimi
        </h1>

        {/* Sipariş Özeti */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            Sipariş Özeti
          </h2>
          {cartItems.length === 0 ? (
  <p className="text-gray-600">Sepetiniz boş</p>
) : (
  <div className="space-y-4">
    {cartItems.map((item) => (
      <div
        key={item.basketItemId}
        className="flex items-center justify-between gap-4"
      >
        {/* SOL: FOTO + İSİM */}
        <div className="flex items-center gap-3">
          <img
            src={item.imageUrl?.[0]}
            alt={item.productIsim}
            className="w-16 h-16 rounded-lg object-cover border"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              {item.productIsim}
            </span>
            <span className="text-sm text-gray-500">
              Adet: {item.adet}
            </span>
          </div>
        </div>

        {/* SAĞ: FİYAT */}
        <span className="font-bold text-gray-900">
          {item.fiyat * item.adet} ₺
        </span>
      </div>
    ))}

    {/* TOPLAM */}
    <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
      <span>Toplam:</span>
      <span>{totalPrice} ₺</span>
    </div>
  </div>
)}
        </div>

        {/* Hata Mesajı */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 shadow">
            {errorMessage}
          </div>
        )}

        {/* Adres Seçimi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((address) => (
            <label
              key={address.id}
              className={`bg-white rounded-2xl shadow-lg border-2 p-5 flex flex-col gap-3 cursor-pointer transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1
                ${selectedAddressId === address.id ? "border-blue-500 shadow-2xl" : "border-gray-200"}
              `}
            >
              <input
                type="radio"
                name="selectedAddress"
                className="hidden"
                value={address.id}
                checked={selectedAddressId === address.id}
                onChange={() => handleSelect(address.id)}
              />
              
              {/* Kişi Bilgileri */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{address.aliciAdiSoyadi}</p>
                  <div className="flex items-center gap-2 text-gray-700 mt-1">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{address.telefon}</span>
                  </div>
                </div>
              </div>
              {/* Adres */}
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-800">{address.adresSatir1}</p>
                  {address.adresSatir2 && <p className="text-gray-700 mt-1">{address.adresSatir2}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">{address.ilce}</span>
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">{address.sehir}</span>
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">{address.ulke}</span>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-6 bg-white border rounded-2xl p-5 shadow-lg">
  <label className="flex gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={termsAccepted}
      onChange={(e) => setTermsAccepted(e.target.checked)}
      className="mt-1 w-5 h-5 accent-blue-600"
    />

    <div className="text-sm text-gray-700 leading-relaxed">
      <p className="font-semibold text-gray-900 mb-1">
        Yasal Bilgilendirme
      </p>
      <p>
        <p>
  <Link to="/on-bilgilendirme" target="_blank" className="text-blue-600 underline font-medium">
    Ön Bilgilendirme Formu
  </Link>,{" "}
  <Link to="/mesafeli-satis-sozlesmesi" target="_blank" className="text-blue-600 underline font-medium">
    Mesafeli Satış Sözleşmesi
  </Link>,{" "}
  <Link to="/iade-ve-cayma" target="_blank" className="text-blue-600 underline font-medium">
    İade ve Cayma Koşulları
  </Link>{" "}
  ile{" "}
  <Link to="/gizlilik-ve-kvkk" target="_blank" className="text-blue-600 underline font-medium">
    KVKK Aydınlatma Metni
  </Link>
  ’ni okudum ve kabul ediyorum.
</p>
      </p>
    </div>
  </label>
</div>
        

        {/* Sipariş Oluştur Butonu */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleCreateOrder}
            disabled={creatingOrder || cartItems.length === 0}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingOrder ? "Sipariş Oluşturuluyor..." : "Siparişi Oluştur"}
          </button>
        </div>
        <button
  onClick={() => navigate("/addresses/add")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
>
  Yeni Adres Ekle
</button>

      </div>
    </div>
  );
};

export default AddressSelect;
