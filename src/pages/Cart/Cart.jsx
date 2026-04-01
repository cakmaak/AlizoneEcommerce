import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// API ve Redux Actions
import { createOrder as createOrderApi } from "../../services/orderApi";
import { fetchCart, deleteCartItem, updateCartQuantity } from "../../features/cart/cartSlice";

// İkonlar
import { 
  ShoppingCart, Trash2, Plus, Minus, 
  ChevronRight, User, Ghost 
} from "lucide-react";

// --- YARDIMCI BİLEŞEN: CartItem ---
// --- YARDIMCI BİLEŞEN: CartItem (Gelişmiş Renkli Versiyon) ---
const CartItem = ({ item, dispatch }) => {
  const handleQuantity = async (newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartQuantity({ basketItemId: item.basketItemId, adet: newQty }))
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => console.error(err));
  };

  return (
    <div className="group relative bg-white p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-all hover:shadow-xl overflow-hidden">
      
      {/* Sol Kenar Renkli Şerit - Mobilde Üste Alıyoruz */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-gradient-to-b from-emerald-400 to-blue-500"></div>

      {/* Resim Alanı */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
        <div className="absolute inset-0 bg-emerald-50 rounded-2xl md:rounded-[2rem] -rotate-6 group-hover:rotate-0 transition-transform"></div>
        <img 
          src={item.imageUrl?.[0] || "/placeholder.png"} 
          alt={item.productIsim} 
          className="relative w-full h-full object-contain p-2 rounded-2xl md:rounded-[2rem] bg-white border border-gray-50 shadow-sm" 
        />
      </div>

      {/* İçerik Alanı */}
      <div className="flex-1 min-w-0 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">
             Alizone Seçimi
           </span>
        </div>
        {/* 🔥 İSMİN TAM GÖZÜKMESİ İÇİN: line-clamp kaldırıldı, whitespace-normal eklendi */}
        <h4 className="text-base md:text-lg font-black text-gray-800 leading-tight mb-2 group-hover:text-emerald-600 transition-colors break-words whitespace-normal">
          {item.productIsim}
        </h4>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <span className="text-xl md:text-2xl font-black text-gray-900">
            {item.fiyat?.toLocaleString()} <span className="text-sm font-bold text-emerald-500">₺</span>
          </span>
          {item.indirim > 0 && (
            <span className="text-xs md:text-sm line-through text-gray-400 font-bold">
              {(item.fiyat + item.indirim).toLocaleString()} ₺
            </span>
          )}
        </div>
      </div>

      {/* Adet Kontrolü & Silme - Mobilde Yatay Yapıyoruz */}
      <div className="flex flex-row md:flex-col items-center gap-3 bg-gray-50 p-2 md:p-3 rounded-2xl md:rounded-[2rem] border border-gray-100 w-full md:w-auto justify-between md:justify-center">
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
          <button 
            onClick={() => handleQuantity(item.adet - 1)} 
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-all"
          >
            <Minus size={16} md:size={20} strokeWidth={3} />
          </button>
          
          <span className="font-black text-lg md:text-xl text-gray-800">
            {item.adet}
          </span>

          <button 
            onClick={() => handleQuantity(item.adet + 1)} 
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full shadow-md text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
          >
            <Plus size={16} md:size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Mobilde dikey çizgi, Desktopta yatay çizgi */}
        <div className="hidden md:block w-full h-[1px] bg-gray-200 my-1"></div>
        <div className="block md:hidden h-8 w-[1px] bg-gray-200 mx-2"></div>

        <button 
          onClick={() => dispatch(deleteCartItem(item.basketItemId))} 
          className="p-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={20} md:size={22} />
        </button>
      </div>
    </div>
  );
};
// --- ANA BİLEŞEN: Cart ---
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('selection');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [faturaAyni, setFaturaAyni] = useState(true);
  
  const [guestData, setGuestData] = useState({
    guestname: "", guestemail: "", guestphone: "",
    address: {
      aliciAdiSoyadi: "", adresSatir1: "", adresSatir2: "", 
      sehir: "ANKARA", ilce: "", postaKodu: "", ulke: "Türkiye", telefon: "",
      faturaTipi: "BIREYSEL", faturaAdiSoyadi: "", tcKimlikNo: "",
      firmaAdi: "", vergiNo: "", vergiDairesi: "", FaturaAdresi: ""
    }
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalPrice = items.reduce((sum, item) => sum + Number(item.fiyat) * Number(item.adet), 0);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) setIsModalOpen(true);
    else navigate("/order/select-address");
  };

  const handleFinalGuestSubmit = async (e) => {
    if(e) e.preventDefault();
    if (!termsAccepted) {
      Swal.fire("Uyarı", "Sözleşmeleri onaylamanız zorunludur.", "warning");
      return;
    }

    const guestId = sessionStorage.getItem("guestId");
    let finalAddress = { ...guestData.address };

    if (faturaAyni) {
      finalAddress.FaturaAdresi = `${finalAddress.adresSatir1} ${finalAddress.adresSatir2}`.trim();
      finalAddress.faturaAdiSoyadi = finalAddress.aliciAdiSoyadi;
    }

    const payload = {
      guestId,
      guestemail: guestData.guestemail,
      guestname: guestData.guestname,
      guestphone: guestData.guestphone,
      contractsAccepted: true,
      address: finalAddress
    };

    try {
      const response = await createOrderApi(payload);
      if (response.paymentLink) window.location.replace(response.paymentLink);
    } catch (err) {
      Swal.fire("Hata", err.response?.data?.message || "Sipariş oluşturulamadı", "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <ShoppingCart className="w-16 h-16 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">Sepetiniz şu an boş.</h2>
        <button onClick={() => navigate("/products")} className="mt-2 px-8 py-3 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg">Ürünleri İncele</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">Sepetim</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.basketItemId} item={item} dispatch={dispatch} />
              ))}
            </div>

            {isGuest && (
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                    İletişim Bilgileri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Ad Soyad" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, guestname: e.target.value})} />
                    <input placeholder="E-posta" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, guestemail: e.target.value})} />
                    <input placeholder="Telefon" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2"
                      onChange={(e) => setGuestData({...guestData, guestphone: e.target.value})} />
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">2</span>
                    Teslimat Adresi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <input placeholder="Alıcı Adı Soyadı" className="md:col-span-6 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, aliciAdiSoyadi: e.target.value}})} />
                    <input placeholder="Adres (Cadde, Sokak, No)" className="md:col-span-4 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, adresSatir1: e.target.value}})} />
                    <input placeholder="Daire/No" className="md:col-span-2 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, adresSatir2: e.target.value}})} />
                    <input placeholder="Şehir" className="md:col-span-2 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, sehir: e.target.value}})} />
                    <input placeholder="İlçe" className="md:col-span-2 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, ilce: e.target.value}})} />
                    <input placeholder="Posta Kodu" className="md:col-span-2 p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, postaKodu: e.target.value}})} />
                  </div>
                </section>

                <section className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border">
                       <button type="button" onClick={() => setGuestData({...guestData, address: {...guestData.address, faturaTipi: 'BIREYSEL'}})}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${guestData.address.faturaTipi === 'BIREYSEL' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>Bireysel</button>
                       <button type="button" onClick={() => setGuestData({...guestData, address: {...guestData.address, faturaTipi: 'KURUMSAL'}})}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${guestData.address.faturaTipi === 'KURUMSAL' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>Kurumsal</button>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-600">
                      <input type="checkbox" checked={faturaAyni} onChange={(e) => setFaturaAyni(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                      Fatura Adresim Aynı
                    </label>
                  </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {guestData.address.faturaTipi === 'BIREYSEL' ? (
    /* 🔥 DEĞİŞİKLİK BURADA: 
       faturaAyni olsa bile Bireysel seçiliyse TC her zaman istenir.
    */
    <div className="md:col-span-2">
      <input 
        placeholder="TC Kimlik No" 
        maxLength="11" 
        className="p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-emerald-500 w-full outline-none shadow-sm transition-all" 
        onChange={(e) => setGuestData({
          ...guestData, 
          address: { ...guestData.address, tcKimlikNo: e.target.value }
        })} 
      />
      <p className="text-[10px] text-gray-400 mt-2 ml-2">
        * Yasal zorunluluk gereği fatura için TC Kimlik No gereklidir.
      </p>
    </div>
  ) : (
    /* Kurumsal Seçiliyse */
    <>
      <input 
        placeholder="Firma Adı" 
        className="md:col-span-2 p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" 
        onChange={(e) => setGuestData({...guestData, address: {...guestData.address, firmaAdi: e.target.value}})} 
      />
      <input 
        placeholder="Vergi No" 
        className="p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" 
        onChange={(e) => setGuestData({...guestData, address: {...guestData.address, vergiNo: e.target.value}})} 
      />
      <input 
        placeholder="Vergi Dairesi" 
        className="p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" 
        onChange={(e) => setGuestData({...guestData, address: {...guestData.address, vergiDairesi: e.target.value}})} 
      />
    </>
  )}

  {/* Fatura adresi farklıysa çıkan adres kutusu */}
  {!faturaAyni && (
    <textarea 
      placeholder="Fatura Adresi Detayı" 
      className="md:col-span-2 p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-emerald-500 min-h-[80px] outline-none animate-in slide-in-from-top-2 duration-300"
      onChange={(e) => setGuestData({...guestData, address: {...guestData.address, FaturaAdresi: e.target.value}})} 
    />
  )}
</div>
                </section>
              </div>
            )}
          </div>

          {/* SAĞ TARAF: ÖZET */}
   <div className="lg:sticky lg:top-24 space-y-4">
  <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
    <h2 className="text-xl font-black mb-6 text-gray-800 border-b pb-4">Sipariş Özeti</h2>
    <div className="space-y-4 mb-8 text-gray-600 font-medium">
      <div className="flex justify-between"><span>Ara Toplam</span><span>{totalPrice.toLocaleString()} ₺</span></div>
      <div className="flex justify-between"><span>Kargo</span><span className="text-emerald-600 font-bold">Ücretsiz</span></div>
      <div className="pt-4 border-t flex justify-between items-end">
          <span className="text-gray-800 font-bold">Toplam</span>
          <span className="text-3xl font-black text-emerald-600">{totalPrice.toLocaleString()} ₺</span>
      </div>
    </div>

    {/* 🔥 YENİ SÖZLEŞME ALANI (Güzelleştirilmiş Hali) */}
    {isGuest && (
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
        <label className="flex gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 accent-emerald-500 rounded-lg flex-shrink-0"
          />

          <div className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
            <p className="font-bold text-gray-900 mb-1 uppercase tracking-wider">
              Yasal Bilgilendirme
            </p>
            <p>
              <Link to="/on-bilgilendirme-formu" target="_blank" className="text-emerald-600 underline font-semibold hover:text-emerald-700 transition-colors">
                Ön Bilgilendirme Formu
              </Link>,{" "}
              <Link to="/mesafeli-satis-sozlesmesi" target="_blank" className="text-emerald-600 underline font-semibold hover:text-emerald-700 transition-colors">
                Mesafeli Satış Sözleşmesi
              </Link>,{" "}
              <Link to="/iade-cayma" target="_blank" className="text-emerald-600 underline font-semibold hover:text-emerald-700 transition-colors">
                İade ve Cayma Koşulları
              </Link>{" "}
              ile{" "}
              <Link to="/gizlilik-ve-kvkk" target="_blank" className="text-emerald-600 underline font-semibold hover:text-emerald-700 transition-colors">
                KVKK Aydınlatma Metni
              </Link>
              ’ni okudum ve kabul ediyorum.
            </p>
          </div>
        </label>
      </div>
    )}

    <button onClick={isGuest ? handleFinalGuestSubmit : handleCheckout}
      className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 shadow-lg 
      ${(!isGuest || termsAccepted) 
        ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-1 shadow-emerald-200' 
        : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'}`}>
      {isGuest ? "Siparişi Tamamla" : "Ödemeye Geç"}
    </button>
  </div>
</div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400">✕</button>
            <h3 className="text-2xl font-black text-center mb-8">Devam Et</h3>
            <div className="space-y-4">
              <button onClick={() => navigate('/login')} className="w-full flex items-center justify-between p-6 rounded-2xl border-2 hover:border-emerald-500 transition-all font-bold group">
                <div className="flex items-center gap-4"><User /> Üye Girişi</div> <ChevronRight />
              </button>
              <button onClick={() => { setIsModalOpen(false); setIsGuest(true); }} className="w-full flex items-center justify-between p-6 rounded-2xl border-2 hover:border-blue-500 transition-all font-bold group">
                <div className="flex items-center gap-4"><Ghost /> Misafir Olarak</div> <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;