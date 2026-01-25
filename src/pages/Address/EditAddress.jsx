import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateAddress } from "../../features/address/addressSlice";

const EditAddress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = useSelector((s) =>
    s.address.items.find((a) => a.id === Number(id))
  );

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (address) setForm(address);
  }, [address]);

  if (!form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddress({ id, data: form })).then(() => {
      navigate("/profile");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-3xl font-extrabold mb-8">
          Adresi Düzenle
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Input label="Adres Başlığı" name="adresSatir1" value={form.adresSatir1} onChange={handleChange} />
          <Input label="Açık Adres" name="adresSatir2" value={form.adresSatir2} onChange={handleChange} />
          <Input label="Alıcı Adı Soyadı" name="aliciAdiSoyadi" value={form.aliciAdiSoyadi} onChange={handleChange} />
          <Input label="Telefon" name="telefon" value={form.telefon} onChange={handleChange} />

          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Şehir" name="sehir" value={form.sehir} onChange={handleChange} />
            <Input label="İlçe" name="ilce" value={form.ilce} onChange={handleChange} />
            <Input label="Posta Kodu" name="postaKodu" value={form.postaKodu} onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
          >
            Kaydet
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
      className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
    />
  </div>
);

export default EditAddress;
