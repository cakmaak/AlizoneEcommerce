import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../features/address/addressSlice";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    aliciAdiSoyadi: "",
    adresSatir1: "",
    adresSatir2: "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addAddress(form));
    navigate("/addresses");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* HEADER */}
        <div className="mb-12 text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">
            Adres Bilgileri
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Yeni Adres Ekle
          </h1>
          <p className="text-slate-500">
            Teslimat ve fatura işlemleri için adres bilgilerinizi girin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* TESLİMAT BİLGİLERİ */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">
              Teslimat Bilgileri
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Alıcı Adı Soyadı"
                name="aliciAdiSoyadi"
                value={form.aliciAdiSoyadi}
                onChange={handleChange}
                placeholder="Teslim alacak kişi"
                required
              />

              <Input
                label="Telefon Numarası"
                name="telefon"
                type="tel"
                value={form.telefon}
                onChange={handleChange}
                placeholder="05xx xxx xx xx"
                required
              />
            </div>

            <Input
              label="Adres Başlığı"
              name="adresSatir1"
              placeholder="Ev, İş Yeri, Ofis"
              value={form.adresSatir1}
              onChange={handleChange}
              required
            />

            <Input
              label="Açık Adres"
              name="adresSatir2"
              placeholder="Mahalle, sokak, bina no, daire no"
              value={form.adresSatir2}
              onChange={handleChange}
              required
            />

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Şehir"
                name="sehir"
                value={form.sehir}
                disabled
              />
              <Input
                label="İlçe"
                name="ilce"
                value={form.ilce}
                onChange={handleChange}
                placeholder="Sincan, Yenimahalle..."
                required
              />
              <Input
                label="Posta Kodu"
                name="postaKodu"
                value={form.postaKodu}
                onChange={handleChange}
                placeholder="06000"
              />
            </div>
          </section>

          {/* FATURA BİLGİLERİ */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">
              Fatura Bilgileri
            </h3>

            {/* FATURA TİPİ */}
            <div className="flex gap-4">
              {["BIREYSEL", "KURUMSAL"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, faturaTipi: type }))
                  }
                  className={`px-6 py-3 rounded-xl font-bold transition
                    ${
                      form.faturaTipi === type
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {type === "BIREYSEL" ? "Bireysel" : "Kurumsal"}
                </button>
              ))}
            </div>

            {/* BİREYSEL */}
            {form.faturaTipi === "BIREYSEL" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Fatura Ad Soyad"
                  name="faturaAdiSoyadi"
                  value={form.faturaAdiSoyadi}
                  onChange={handleChange}
                  placeholder="Faturada görünecek isim"
                  required
                />
                <Input
                  label="TC Kimlik Numarası"
                  name="tcKimlikNo"
                  value={form.tcKimlikNo}
                  onChange={handleChange}
                  placeholder="11 haneli"
                  required
                />
              </div>
            )}

            {/* KURUMSAL */}
            {form.faturaTipi === "KURUMSAL" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Firma Ünvanı"
                  name="firmaAdi"
                  value={form.firmaAdi}
                  onChange={handleChange}
                  placeholder="Faturada görünecek firma adı"
                  required
                />
                <Input
                  label="Vergi Numarası"
                  name="vergiNo"
                  value={form.vergiNo}
                  onChange={handleChange}
                  placeholder="10 haneli"
                  required
                />
                <Input
                  label="Vergi Dairesi"
                  name="vergiDairesi"
                  value={form.vergiDairesi}
                  onChange={handleChange}
                  placeholder="Örn: Sincan"
                  required
                />
              </div>
            )}
          </section>

          {/* SUBMIT */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-extrabold text-lg hover:bg-emerald-700 transition"
            >
              Adresi Kaydet
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-slate-600">
      {label}
    </label>
    <input
      {...props}
      className="rounded-xl border border-slate-300 px-4 py-3
      focus:outline-none focus:ring-2 focus:ring-emerald-500
      disabled:bg-slate-100 disabled:text-slate-500"
    />
  </div>
);

export default AddAddress;
