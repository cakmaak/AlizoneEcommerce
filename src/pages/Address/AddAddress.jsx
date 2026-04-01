import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../features/address/addressSlice";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // "Fatura Adresi Aynı" kontrolü için state
  const [faturaAyni, setFaturaAyni] = useState(true);
  

  const [form, setForm] = useState({
    aliciAdiSoyadi: "",
    adresSatir1: "", // Adres Başlığı
    adresSatir2: "", // Açık Adres
    sehir: "ANKARA",
    ilce: "",
    postaKodu: "",
    ulke: "Türkiye",
    telefon: "",
    faturaTipi: "BIREYSEL",
    faturaAdiSoyadi: "",
    tcKimlikNo: "",
    firmaAdi: "",
    vergiNo: "",
    vergiDairesi: "",
    faturaAdresi: ""
  });

const handleNumericChange = (e) => {
  const { name, value } = e.target;
  const cleanValue = value.replace(/\D/g, "");
  
  if (name === "tcKimlikNo" && cleanValue.length > 11) return;
  if (name === "telefon" && cleanValue.length > 10) return;
  if (name === "vergiNo" && cleanValue.length > 10) return; // Vergi no sınırı
  
  setForm((prev) => ({ ...prev, [name]: cleanValue }));
};


useEffect(() => {
  if (faturaAyni) {
    setForm((prev) => ({
      ...prev,
      
      faturaAdresi: `${prev.adresSatir1} - ${prev.adresSatir2}`.trim()
    }));
  }
}, [faturaAyni, form.adresSatir1, form.adresSatir2]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    // --- DOĞRULAMA KONTROLLERİ ---
    
    // Telefon: 5 ile başlamalı ve tam 10 hane olmalı
    if (!/^5[0-9]{9}$/.test(form.telefon)) {
      alert("Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır (Örn: 5051234567)");
      return;
    }

    // TC: Bireysel seçiliyse tam 11 hane olmalı
    if (form.faturaTipi === "BIREYSEL" && form.tcKimlikNo.length !== 11) {
      alert("TC Kimlik Numarası 11 haneli olmalıdır.");
      return;
    }

    let finalForm = { ...form };
    
    if (!finalForm.faturaAdiSoyadi) {
      finalForm.faturaAdiSoyadi = form.aliciAdiSoyadi;
    }

    if (faturaAyni) {
      finalForm.faturaAdresi = `${form.adresSatir1} ${form.adresSatir2}`.trim();
    }

    // Her şey tamamsa gönder
    const result = await dispatch(addAddress(finalForm)).unwrap();
    navigate("/order/select-address", {
      state: {
        guestAddress: result,
        preselectedAddressId: result.id
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        
        {/* HEADER */}
        <div className="mb-12 text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Adres Bilgileri</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Yeni Adres Ekle</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* TESLİMAT BİLGİLERİ */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Teslimat Bilgileri</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Alıcı Adı Soyadı" name="aliciAdiSoyadi" value={form.aliciAdiSoyadi} onChange={handleChange} required />
          <Input 
  label="Telefon Numarası (Başında 0 olmadan)" 
  name="telefon" 
  type="tel" 
  placeholder="5xx xxx xx xx"
  value={form.telefon} 
  onChange={handleNumericChange} // Değişti
  required 
/>
            </div>
            <Input label="Adres Başlığı (Ev/İş)" name="adresSatir1" value={form.adresSatir1} onChange={handleChange} required />
            <Input label="Açık Adres" name="adresSatir2" value={form.adresSatir2} onChange={handleChange} required />
            
            <div className="grid md:grid-cols-3 gap-6">
              <Input label="Şehir" name="sehir" value={form.sehir} disabled />
              <Input label="İlçe" name="ilce" value={form.ilce} onChange={handleChange} required />
              <Input label="Posta Kodu" name="postaKodu" value={form.postaKodu} onChange={handleChange} />
            </div>
          </section>

          {/* FATURA BİLGİLERİ */}
          <section className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Fatura Bilgileri</h3>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">
                <input 
                  type="checkbox" 
                  checked={faturaAyni} 
                  onChange={(e) => setFaturaAyni(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
                Fatura Adresim Aynı
              </label>
            </div>

            <div className="flex gap-4">
              {["BIREYSEL", "KURUMSAL"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, faturaTipi: type }))}
                  className={`px-6 py-3 rounded-xl font-bold transition ${form.faturaTipi === type ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {type === "BIREYSEL" ? "Bireysel" : "Kurumsal"}
                </button>
              ))}
            </div>

            {!faturaAyni && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <Input 
                  label="Fatura Adresi Detayı" 
                  name="faturaAdresi" 
                  value={form.faturaAdresi} 
                  onChange={handleChange} 
                  placeholder="Fatura için farklı bir adres girin"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
{form.faturaTipi === "BIREYSEL" && (
  <>
    <Input 
      label="Fatura Ad Soyad" 
      name="faturaAdiSoyadi" 
      value={form.faturaAdiSoyadi}
      onChange={handleChange} 
      placeholder="Faturada görünecek isim"
      // Artık required değil, boşsa alıcı adını alıyoruz
    />
    <Input 
      label="TC Kimlik Numarası" 
      name="tcKimlikNo" 
      value={form.tcKimlikNo} 
      onChange={handleNumericChange} // Değişti
      placeholder="11 haneli"
      required 
    />
  </>
)}
{form.faturaTipi === "KURUMSAL" && (
    <>
      <Input 
        label="Firma Ünvanı" 
        name="firmaAdi" 
        value={form.firmaAdi}
        onChange={handleChange} 
        placeholder="Resmi şirket adı"
        required 
      />
      <Input 
        label="Vergi Numarası" 
        name="vergiNo" 
        value={form.vergiNo} 
        onChange={handleNumericChange} 
        placeholder="10 haneli"
        required 
      />
      {/* Vergi dairesi genellikle tek başına alt satırda daha iyi durur, 
          grid'i bozmamak için div içine alabilirsin */}
      <div className="md:col-span-2">
        <Input 
          label="Vergi Dairesi" 
          name="vergiDairesi" 
          value={form.vergiDairesi}
          onChange={handleChange} 
          placeholder="Bağlı olunan vergi dairesi"
          required 
        />
      </div>
    </>
  )}

            </div>
          </section>

          <button type="submit" className="w-full py-4 rounded-xl bg-emerald-600 text-white font-extrabold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
            Adresi Kaydet ve Devam Et
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-slate-600">{label}</label>
    <input
      {...props}
      className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-400"
    />
  </div>
);

export default AddAddress;