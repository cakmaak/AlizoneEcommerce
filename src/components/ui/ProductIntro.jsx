import { Snowflake, Volume2, Zap, ShieldCheck } from "lucide-react";

const ProductIntro = () => {
  return (
    <section className="mb-10 text-center">

      {/* Başlık */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
        Alanınıza Uygun En İyi Klimalar
      </h2>

      {/* Alt açıklama */}
      <p className="mt-2 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
        Eviniz, ofisiniz veya iş yeriniz için en verimli klima çözümlerini
        Alizone güvencesiyle keşfedin.
      </p>

      {/* İkonlar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">

        <div className="flex items-center justify-center gap-2 bg-white rounded-xl shadow-sm px-4 py-3">
          <Snowflake className="text-sky-500" size={20} />
          <span className="text-sm font-semibold text-gray-700">
            Alanınıza Uygun BTU
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 bg-white rounded-xl shadow-sm px-4 py-3">
          <Volume2 className="text-indigo-500" size={20} />
          <span className="text-sm font-semibold text-gray-700">
            Sessiz & Güçlü
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 bg-white rounded-xl shadow-sm px-4 py-3">
          <Zap className="text-yellow-500" size={20} />
          <span className="text-sm font-semibold text-gray-700">
            Enerji Tasarruflu
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 bg-white rounded-xl shadow-sm px-4 py-3">
          <ShieldCheck className="text-emerald-500" size={20} />
          <span className="text-sm font-semibold text-gray-700">
            Montaj & Servis
          </span>
        </div>

      </div>
    </section>
  );
};

export default ProductIntro;