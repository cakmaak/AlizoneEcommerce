import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/admin/adminProductSlice";
import AdminProductTable from "./AdminProductTable"
import { getAdminProducts } from "../../features/admin/adminProductSlice";

const CATEGORY_LIST = [
  "SPLIT",
  "TICARI",
  "MULTISPLIT",
  "ISIPOMPASI",
  "MOBILKLIMA",
];

const MARKA_LIST = ["BOSCH", "SAKURA", "CARRIER","ALTUS","TCL"];

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isLoading,products } = useSelector((s) => s.adminProduct);
  useEffect(() => {
  dispatch(getAdminProducts());
}, [dispatch]);


  const [form, setForm] = useState({
    marka: "",
    model: "",
    isim: "",
    kategori: "",
    fiyat: "",
    eskiFiyat: "",
    renk: "",
    inverter: true,
    garantiAy: "",
    stokDurumu: "Stokta var",
    stokAdeti: "",

    onemliOzellikler: [""],
    notlar: [""],
    resimler: [""],

    kapasite: {
      sogutmaBtu: "",
      isitmaBtu: "",
      sogutmaKw: "",
      isitmaKw: "",
    },

    enerji: {
      sogutmaSinifi: "",
      isitmaSinifi: "",
      seer: "",
      scop: "",
    },

    refrigerant: {
      tur: "",
      gwp: "",
      chargeKg: "",
      co2EquivalentTon: "",
    },

    digerOzellikler: {
      havaDebisi: { icHavaM3h: "" },
      sesSeviyesi: {
        icDusukDb: "",
        icYuksekDb: "",
        disDb: "",
      },
      calismaSicakligi: {
        sogutmaMin: "",
        sogutmaMax: "",
        isitmaMin: "",
        isitmaMax: "",
      },
      tasarim: {
        dortYonluHava: true,
        tazeHavaBaglantisi: true,
        kondensPompa: true,
        kabloluKumandaDestegi: true,
      },
      kontroller: {
        uzaktanKumanda: true,
      },
    },

    boyutlar: {
      icGenislik: "",
      icYukseklik: "",
      icDerinlik: "",
      disGenislik: "",
      disYukseklik: "",
      disDerinlik: "",
    },

    sertifikalar: {
      erpEnerjiEtiketi: "",
      fgazIceriyor: true,
    },
  });

  const setVal = (path, value) => {
    setForm((prev) => {
      const copy = structuredClone(prev);
      let obj = copy;
      path.slice(0, -1).forEach((p) => (obj = obj[p]));
      obj[path.at(-1)] = value;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(form));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">🛠️ Yeni Ürün Ekle</h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* TEMEL */}
        <Section title="Temel Bilgiler">
          <Select label="Marka" options={MARKA_LIST} value={form.marka} onChange={(v)=>setVal(["marka"],v)} />
          <Input label="Model" value={form.model} onChange={(v)=>setVal(["model"],v)} />
          <Input label="Ürün İsmi" value={form.isim} onChange={(v)=>setVal(["isim"],v)} />
          <Select label="Kategori" options={CATEGORY_LIST} value={form.kategori} onChange={(v)=>setVal(["kategori"],v)} />
          <Input type="number" label="Fiyat" value={form.fiyat} onChange={(v)=>setVal(["fiyat"],v)} />
          <Input type="number" label="Eski Fiyat" value={form.eskiFiyat} onChange={(v)=>setVal(["eskiFiyat"],v)} />
          <Input label="Renk" value={form.renk} onChange={(v)=>setVal(["renk"],v)} />
          <Input type="number" label="Garanti (Ay)" value={form.garantiAy} onChange={(v)=>setVal(["garantiAy"],v)} />
          <Input type="number" label="Stok Adeti" value={form.stokAdeti} onChange={(v)=>setVal(["stokAdeti"],v)} />
        </Section>

        <ArraySection title="Önemli Özellikler" data={form.onemliOzellikler} set={(v)=>setVal(["onemliOzellikler"],v)} />
        <ArraySection title="Notlar" data={form.notlar} set={(v)=>setVal(["notlar"],v)} />
        <ArraySection title="Resimler (URL)" data={form.resimler} set={(v)=>setVal(["resimler"],v)} />

        <Section title="Kapasite">
          <Input label="Soğutma BTU" value={form.kapasite.sogutmaBtu} onChange={(v)=>setVal(["kapasite","sogutmaBtu"],v)} />
          <Input label="Isıtma BTU" value={form.kapasite.isitmaBtu} onChange={(v)=>setVal(["kapasite","isitmaBtu"],v)} />
          <Input label="Soğutma kW" value={form.kapasite.sogutmaKw} onChange={(v)=>setVal(["kapasite","sogutmaKw"],v)} />
          <Input label="Isıtma kW" value={form.kapasite.isitmaKw} onChange={(v)=>setVal(["kapasite","isitmaKw"],v)} />
        </Section>

        <Section title="Enerji">
          <Input label="Soğutma Sınıfı" value={form.enerji.sogutmaSinifi} onChange={(v)=>setVal(["enerji","sogutmaSinifi"],v)} />
          <Input label="Isıtma Sınıfı" value={form.enerji.isitmaSinifi} onChange={(v)=>setVal(["enerji","isitmaSinifi"],v)} />
          <Input label="SEER" value={form.enerji.seer} onChange={(v)=>setVal(["enerji","seer"],v)} />
          <Input label="SCOP" value={form.enerji.scop} onChange={(v)=>setVal(["enerji","scop"],v)} />
        </Section>

        <Section title="Refrigerant">
          <Input label="Tür" value={form.refrigerant.tur} onChange={(v)=>setVal(["refrigerant","tur"],v)} />
          <Input label="GWP" value={form.refrigerant.gwp} onChange={(v)=>setVal(["refrigerant","gwp"],v)} />
          <Input label="Charge (kg)" value={form.refrigerant.chargeKg} onChange={(v)=>setVal(["refrigerant","chargeKg"],v)} />
          <Input label="CO₂ Eq (ton)" value={form.refrigerant.co2EquivalentTon} onChange={(v)=>setVal(["refrigerant","co2EquivalentTon"],v)} />
        </Section>

        <Section title="Boyutlar (mm)">
          {Object.keys(form.boyutlar).map((k)=>(
            <Input key={k} label={k} value={form.boyutlar[k]} onChange={(v)=>setVal(["boyutlar",k],v)} />
          ))}
        </Section>

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {isLoading ? "Ekleniyor..." : "ÜRÜNÜ KAYDET"}
        </button>
        
      </form>
      {/* ADMIN PRODUCT TABLE */}
<div className="mt-16">
  <AdminProductTable products={products} />
</div>

      
    </div>
  );
  
};


export default AddProduct;

/* ==== UI ==== */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, value, onChange, type="text" }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select value={value} onChange={(e)=>onChange(e.target.value)} className="w-full border rounded-lg px-3 py-2">
      <option value="">Seçiniz</option>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const ArraySection = ({ title, data, set }) => (
  <div>
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {data.map((v,i)=>(
      <input key={i} value={v} onChange={(e)=>{
        const arr=[...data]; arr[i]=e.target.value; set(arr);
      }} className="w-full border rounded-lg px-3 py-2 mb-2" />
    ))}
    <button type="button" onClick={()=>set([...data,""])} className="text-blue-600">+ Ekle</button>
  </div>
);