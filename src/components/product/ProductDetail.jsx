import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  CheckCircle,
  CreditCard,
  Percent,
  Wind,
  Volume2,
  Thermometer,
  Layers,
  Award,
  ChevronDown
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../features/cart/cartSlice";
import { useState } from "react";




const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <Icon size={16} className="text-indigo-600" />
    <span className="text-slate-600">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
 

  


  
  const handleAddToCart = async () => {
  const token = localStorage.getItem("token");

  // 🚫 GİRİŞ YOKSA
  if (!token) {
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          type: "error",
          message: "Sepete eklemek için lütfen giriş yapınız",
        },
      })
    );
    return;
  }

  try {
    // ✅ GİRİŞ VAR → API
    await dispatch(
      addCartItem({ productId: product.id, quantity: 1 })
    ).unwrap();

    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          type: "success",
          message: "Ürün sepete eklendi",
        },
      })
    );
  } catch (err) {
    // ❌ STOK / BACKEND HATASI
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: {
          type: "error",
          message:
            err?.message ||
            err?.response?.data?.message ||
            "Stokta yeterli ürün yok",
        },
      })
    );
  }
};
const isOutOfStock = product.stokadeti === 0;
const isSakura = product.marka.toUpperCase() === "SAKURA";


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

  const mail = `mailto:info@alizoneklima.com
?subject=${encodeURIComponent(subject)}
&body=${encodeURIComponent(body)}`;

  window.location.href = mail;
};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
      <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
  >
    ← Önceki Sayfaya Dön
  </button>

      {/* ================= ÜST ================= */}
      <div className="grid lg:grid-cols-2 gap-10">

        {/* GÖRSELLER */}
        <div className="space-y-4">
  <div className="bg-slate-100 rounded-xl h-[300px] flex items-center justify-center">
    <img
      src={product.resimler?.[activeImage]}
      alt={product.isim}
      className="max-h-[260px] object-contain"
    />
  </div>

  <div className="flex gap-3 justify-center">
    {product.resimler?.map((img, i) => (
      <button
        key={i}
        onClick={() => setActiveImage(i)}
        className={`w-16 h-16 rounded-lg border ${
          activeImage === i ? "border-indigo-600" : "border-slate-200"
        }`}
      >
        <img src={img} className="w-full h-full object-contain" />
      </button>
    ))}
  </div>
</div>

        {/* SAĞ BİLGİ */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold leading-snug">
              {product.isim}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {product.marka} • {product.model}
            </p>
          </div>

          <div className="text-xl md:text-2xl font-semibold text-gray-900">
            ₺{product.fiyat}
          </div>

          {/* KAMPANYALAR */}
          <div className="space-y-2 bg-indigo-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-medium">
              <CreditCard size={18} /> Kredi kartına 9 aya varan taksit
            </div>
            
          </div>

        {isOutOfStock ? (
  <button
    disabled
    className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed"
  >
    Stokta Yok
  </button>
) : isSakura ? (
  <button
    onClick={handleTeklifMail}
    className="w-full py-3 rounded-xl bg-gray-900 text-white
      text-sm font-semibold hover:bg-gray-800 transition"
  >
    Teklif Al
  </button>
) : (
  <button
    onClick={handleAddToCart}
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex justify-center gap-2"
  >
    <ShoppingCart size={18} /> Sepete Ekle
  </button>
)}
        </div>
      </div>

      

      <div className="mt-6">
  <h2 className="text-lg font-bold mb-4">Başlıca Özellikler & Garanti</h2>

  <div className="grid md:grid-cols-2 gap-3">
    {/* Başlıca Özellikler */}
    {product.onemliOzellikler?.map((oz, i) => (
      <div
        key={i}
        className="flex items-start gap-2 text-sm bg-slate-50 rounded-lg p-3"
      >
        <CheckCircle size={16} className="text-emerald-600 mt-0.5" />
        <span className="text-slate-700">{oz}</span>
      </div>
    ))}

    {/* Garanti Süresi */}
    {product.garantiAy && (
      <div className="flex items-start gap-2 text-sm bg-slate-50 rounded-lg p-3">
        <Award size={16} className="text-indigo-600 mt-0.5" />
        <span className="text-slate-700">{product.garantiAy} Ay Garanti</span>
      </div>
    )}
  </div>
</div>

      {/* ================= NOTLAR ================= */}
{product.notlar?.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-bold mb-4">Notlar</h2>
    <div className="grid md:grid-cols-2 gap-3">
      {product.notlar.map((note, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 text-sm bg-slate-50 rounded-lg p-3"
        >
          <CheckCircle size={16} className="text-emerald-600 mt-0.5" />
          <span className="text-slate-700">{note}</span>
        </div>
      ))}
    </div>
  </div>
)}

      {/* ================= DİĞER ÖZELLİKLER ================= */}
   {/* ================= DİĞER TEKNİK ÖZELLİKLER ================= */}
<details className="border rounded-xl p-5">
  <summary className="cursor-pointer font-semibold flex justify-between">
    Diğer Teknik Özellikler
    <ChevronDown />
  </summary>

  <div className="mt-6 grid md:grid-cols-2 gap-6">

    {/* HAVA & SES */}
   <div className="space-y-3 bg-slate-50 rounded-xl p-4">
  <InfoRow
    icon={Wind}
    label="Hava Debisi"
    value={
      product.digerOzellikler?.havaDebisi?.icHavaM3h
        ? `${product.digerOzellikler.havaDebisi.icHavaM3h} m³/h`
        : "Belirtilmemiş"
    }
  />
  <InfoRow
    icon={Volume2}
    label="İç Ünite (Düşük)"
    value={
      product.digerOzellikler?.sesSeviyesi?.icDusukDb != null
        ? `${product.digerOzellikler.sesSeviyesi.icDusukDb} dB`
        : "Belirtilmemiş"
    }
  />
  <InfoRow
    icon={Volume2}
    label="İç Ünite (Yüksek)"
    value={
      product.digerOzellikler?.sesSeviyesi?.icYuksekDb != null
        ? `${product.digerOzellikler.sesSeviyesi.icYuksekDb} dB`
        : "Belirtilmemiş"
    }
  />
  <InfoRow
    icon={Volume2}
    label="Dış Ünite"
    value={
      product.digerOzellikler?.sesSeviyesi?.disDb != null
        ? `${product.digerOzellikler.sesSeviyesi.disDb} dB`
        : "Belirtilmemiş"
    }
  />
</div>

    {/* SICAKLIK */}
    <div className="space-y-3 bg-slate-50 rounded-xl p-4">
      <InfoRow
        icon={Thermometer}
        label="Soğutma Aralığı"
        value={`${product.digerOzellikler?.calismaSicakligi?.sogutmaMin}° / ${product.digerOzellikler?.calismaSicakligi?.sogutmaMax}°`}
      />
      <InfoRow
        icon={Thermometer}
        label="Isıtma Aralığı"
        value={`${product.digerOzellikler?.calismaSicakligi?.isitmaMin}° / ${product.digerOzellikler?.calismaSicakligi?.isitmaMax}°`}
      />
    </div>

    {/* TASARIM */}
    <div className="space-y-3 bg-slate-50 rounded-xl p-4">
      <InfoRow
        icon={Layers}
        label="4 Yönlü Hava"
        value={product.digerOzellikler?.tasarim?.dortYonluHava ? "Var" : "Yok"}
      />
      <InfoRow
        icon={Layers}
        label="Taze Hava Bağlantısı"
        value={product.digerOzellikler?.tasarim?.tazeHavaBaglantisi ? "Var" : "Yok"}
      />
      <InfoRow
        icon={Layers}
        label="Kondens Pompası"
        value={product.digerOzellikler?.tasarim?.kondensPompa ? "Var" : "Yok"}
      />
      <InfoRow
        icon={Layers}
        label="Kablolu Kumanda"
        value={product.digerOzellikler?.tasarim?.kabloluKumandaDestegi ? "Var" : "Yok"}
      />
    </div>

    {/* SERTİFİKA & DİĞER */}
    <div className="space-y-3 bg-slate-50 rounded-xl p-4">
      <InfoRow
        icon={Award}
        label="ERP Enerji Etiketi"
        value={product.sertifikalar?.erpEnerjiEtiketi ?? "-"}
      />
      <InfoRow
        icon={Award}
        label="F-Gaz"
        value={product.sertifikalar?.fgazIceriyor ? "Var" : "Yok"}
      />
      <InfoRow
        icon={Award}
        label="Uzaktan Kumanda"
        value={"Var"}
      />
    </div>
    {/* BOYUTLAR */}
<div className="space-y-3 bg-slate-50 rounded-xl p-4">
  <h3 className="font-semibold text-sm text-slate-700 mb-2">
    İç / Dış Ünite Boyutları (mm)
  </h3>

  <InfoRow
    icon={Layers}
    label="İç Ünite (G × Y × D)"
    value={
      product.boyutlar
        ? `${product.boyutlar.icGenislik} × ${product.boyutlar.icYukseklik} × ${product.boyutlar.icDerinlik}`
        : "-"
    }
  />

  <InfoRow
    icon={Layers}
    label="Dış Ünite (G × Y × D)"
    value={
      product.boyutlar
        ? `${product.boyutlar.disGenislik} × ${product.boyutlar.disYukseklik} × ${product.boyutlar.disDerinlik}`
        : "-"
    }
  />
</div>

  </div>
</details>
    </div>
  );
};

export default ProductDetail;
