import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productApi";
import ProductCard from "../../components/product/ProductCard";
import { Filter, Check, ChevronDown } from "lucide-react";

const CATEGORIES = ["SPLIT", "TICARI", "MULTISPLIT", "ISIPOMPASI", "MOBILKLIMA"];
const BTUS = ["9000", "12000", "18000", "24000","48000"];
const BRAND_PRIORITY = {
  BOSCH: 1,
  DAIKIN: 2,
  MITSUBISHI: 3,
  SAKURA: 99, 
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
  kategori: ["SPLIT"], 
  marka: [],
  btu: [],
  montajDahil: false,
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
    return true;
  })
  .sort((a, b) => {
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
    <main className="pt-28 min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      
      <div className="max-w-[1440px] mx-auto px-3 lg:px-6">

        {/* === MOBİL FİLTRE BUTONU === */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-6 flex items-center justify-between px-6 py-4 bg-white rounded-2xl shadow font-bold text-indigo-600"
        >
          Filtrele
          <ChevronDown
            className={`transition ${showFilters ? "rotate-180" : ""}`}
          />
        </button>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* === FİLTRE PANELİ === */}
         <aside
  className={`
    lg:col-span-3 lg:pl-0
    ${showFilters ? "block" : "hidden"}
    lg:block
  `}
>
  <div
    className="bg-white rounded-3xl shadow-xl p-4 space-y-6
  lg:sticky lg:top-28
  h-auto lg:h-[calc(100vh-8rem)]
  overflow-y-auto
  direction-rtl
  "
  >
    {/* === LOGO === */}
    <div className="flex justify-center mb-4">
      <img
        src="https://res.cloudinary.com/diyibvvua/image/upload/v1765462385/WhatsApp_Image_2025-11-16_at_14.48.31_be2ory.jpg"
        alt="Logo"
        className="w-50 object-contain"
      />
    </div>

    {/* === BAŞLIK === */}
    <div className="flex items-center gap-2 text-indigo-600 font-semibold text-base tracking-wide">
      <Filter size={16} />
      Filtrele
    </div>

    <FilterGroup title="Kategori">
      {CATEGORIES.map((c) => (
        <Checkbox
          key={c}
          label={c}
          checked={filters.kategori.includes(c)}
          onChange={() => toggleFilter("kategori", c)}
        />
      ))}
    </FilterGroup>

    <FilterGroup title="Marka">
      {brands.map((m) => (
        <Checkbox
          key={m}
          label={m}
          checked={filters.marka.includes(m)}
          onChange={() => toggleFilter("marka", m)}
        />
      ))}
    </FilterGroup>

    <FilterGroup title="BTU">
      {BTUS.map((b) => (
        <Checkbox
          key={b}
          label={`${b} BTU`}
          checked={filters.btu.includes(b)}
          onChange={() => toggleFilter("btu", b)}
        />
      ))}
    </FilterGroup>
  </div>
</aside>

          {/* === ÜRÜNLER === */}
          <section className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl shadow p-20 text-center font-semibold text-gray-600">
                Bu filtrelere uygun ürün bulunamadı 😔
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
  );
};

/* === ALT BİLEŞENLER === */

const FilterGroup = ({ title, children }) => (
  <div>
    <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer border transition text-sm
      ${
        checked
          ? "bg-indigo-50 border-indigo-400 text-indigo-700 font-semibold"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
  >
    <div
      className={`w-4 h-4 rounded-sm flex items-center justify-center border
        ${checked ? "bg-indigo-600 text-white" : "bg-white"}`}
    >
      {checked && <Check size={10} />}
    </div>
    {label}
    <input type="checkbox" checked={checked} onChange={onChange} hidden />
  </label>
);

export default ProductList;
