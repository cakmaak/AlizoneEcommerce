import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productApi";
import ProductCard from "../../components/product/ProductCard";
import { Filter, Check, ChevronDown } from "lucide-react";
import HomepageSlider from "../../components/ui/HomepageShowcase";
import HomepageShowcase from "../../components/ui/HomepageShowcase";
import ProductIntro from "../../components/ui/ProductIntro";
import PriceRange from "../../components/ui/PriceRange";

const CATEGORIES = ["SPLIT", "TICARI", "MULTISPLIT", "ISIPOMPASI", "MOBILKLIMA"];
const BTUS = ["9000", "12000", "18000", "24000","28000", "42000","48000"];
const BRAND_PRIORITY = {
  BOSCH: 1,
  DAIKIN: 2,
  MITSUBISHI: 3,
  SAKURA: 99, 
};


const FunBanner = () => {
  const messages = [
    "❄️ Eviniz için en ferah çözümler!",
    "🔥 Yaz sıcağını dert etmeyin!",
    "💰 KDV dahil fiyatlar!",
    "🚚 Hızlı teslim ve ücretsiz montaj!",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-6 rounded-3xl overflow-hidden relative shadow-lg">
      <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4 text-white font-bold text-center text-lg md:text-xl animate-pulse">
        {messages[index]}
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute animate-bounce text-white text-xl" style={{ top: "10%", left: "5%" }}>❄️</span>
        <span className="absolute animate-bounce text-white text-xl" style={{ top: "40%", left: "80%" }}>🔥</span>
        <span className="absolute animate-bounce text-white text-xl" style={{ top: "70%", left: "20%" }}>💰</span>
      </div>
    </div>
  );
};
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
  kategori: [], 
  marka: [],
  btu: [],
  montajDahil: false,
  fiyat: [0, 200000]
});
  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const brands = [...new Set(products.map((p) => p.marka))];

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const filteredProducts = products
  .filter((p) => {
    if (filters.kategori.length && !filters.kategori.includes(p.kategori))
      return false;
    if (filters.marka.length && !filters.marka.includes(p.marka))
      return false;
    if (filters.btu.length && !filters.btu.includes(String(p.btu)))
      return false;
    if (filters.montajDahil && !p.montajDahil) return false;
    if (p.fiyat < filters.fiyat[0] || p.fiyat > filters.fiyat[1]) return false;
    return true;
  })
  .sort((a, b) => {
    
    if (filters.kategori.length === 0) {
      if (a.kategori === "SPLIT" && b.kategori !== "SPLIT") return -1;
      if (a.kategori !== "SPLIT" && b.kategori === "SPLIT") return 1;
    }

    // Marka önceliği
    const pa = BRAND_PRIORITY[a.marka?.toUpperCase()] ?? 50;
    const pb = BRAND_PRIORITY[b.marka?.toUpperCase()] ?? 50;
    return pa - pb;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600">
        Ürünler yükleniyor...
      </div>
    );
  }

  return (
    
   <main className="pt-28 min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
  <div className="max-w-[1440px] mx-auto px-3 lg:px-6">

    {/* <HomepageSlider /> */}
    <HomepageShowcase></HomepageShowcase>
    <ProductIntro></ProductIntro>

    {/* === MOBİL FİLTRE BUTONU === */}
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="lg:hidden w-full mb-6 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform"
    >
      Filtrele
      <ChevronDown className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
    </button>

    {/* === GRID === */}
    <div className="grid lg:grid-cols-12 gap-8">

      {/* === FİLTRE PANELİ === */}
      <aside className={`lg:col-span-3 lg:pl-0 ${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-5
                lg:sticky lg:top-28">
          {/* Logo */}
          

          {/* Filtre Başlığı */}
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm uppercase tracking-wider">
            <Filter size={16} />
            Filtrele
          </div>

          <FilterGroup title="Kategori">
            {CATEGORIES.map((c) => (
              <Checkbox key={c} label={c} checked={filters.kategori.includes(c)} onChange={() => toggleFilter("kategori", c)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Marka">
            {brands.map((m) => (
              <Checkbox key={m} label={m} checked={filters.marka.includes(m)} onChange={() => toggleFilter("marka", m)} />
            ))}
          </FilterGroup>

          <FilterGroup title="BTU">
            {BTUS.map((b) => (
              <Checkbox key={b} label={`${b} BTU`} checked={filters.btu.includes(b)} onChange={() => toggleFilter("btu", b)} />
            ))}
          </FilterGroup>
                        <PriceRange
  value={filters.fiyat}
  onChange={(val) =>
    setFilters((prev) => ({ ...prev, fiyat: val }))
  }
/>
<button
  onClick={() =>
    setFilters({
      kategori: [],
      marka: [],
      btu: [],
      montajDahil: false,
      fiyat: [0, 200000],
    })
  }
  className="w-full mt-3 py-2 rounded-lg bg-gray-100
           text-gray-700 font-semibold text-xs
           hover:bg-gray-200 transition"
>
  Tüm Filtreleri Temizle
</button>
        </div>

     
      </aside>
 

      {/* === ÜRÜNLER === */}
      <section className="lg:col-span-9">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center font-semibold text-pink-500 text-lg animate-pulse">
            Üzgünüz 😢 <br /> Bu filtrelere uygun ürün bulunamadı!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            
          </div>
          
        )}
        
      </section>
      

    </div>
  </div>
</main>
  )
};


/* === ALT BİLEŞENLER === */

const FilterGroup = ({ title, children }) => (
  <div>
    <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
    <div className="grid grid-cols-2 gap-2">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label
    className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer border transition text-xs
      ${
        checked
          ? "bg-indigo-50 border-indigo-400 text-indigo-700 font-semibold"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
  >
    <div
      className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border
        ${checked ? "bg-indigo-600 text-white" : "bg-white"}`}
    >
      {checked && <Check size={10} />}
    </div>
    {label}
    <input type="checkbox" checked={checked} onChange={onChange} hidden />
  </label>
);

export default ProductList;
