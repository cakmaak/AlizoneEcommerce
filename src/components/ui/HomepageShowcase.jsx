import { useNavigate } from "react-router-dom";

const HomepageShowcase = () => {
  const navigate = useNavigate();

  const slides = [
    { img: "2", title: "SPLİT KLİMALAR", path: "/products?kategori=SPLIT,MOBILKLIMA" },
    { img: "4", title: "MULTİSPLİT KLİMALAR", path: "/products?kategori=MULTISPLIT" },
    { img: "0", title: "SALON TİPİ KLİMALAR", path: "/products?kategori=SALON_TIPI" },
    { img: "kaset", title: "KASET TİPİ KLİMALAR", path: "/products?kategori=KASET_TIPI" },
    { img: "3", title: "MOBİL KLİMALAR", path: "/products?kategori=MOBILKLIMA" },
    { img: "isi", title: "ISI POMPALARI", path: "/products?kategori=ISIPOMPASI" },
  ];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slides.map((item) => (
          <div
            key={item.img}
            onClick={() => (window.location.href = item.path)}
            className="relative rounded-3xl overflow-hidden shadow-xl group bg-white cursor-pointer"
          >
            <img
  src={`/HomepageSlider/${item.img}.png`}
  alt="Alizone Klima"
  className="w-full aspect-[4/3]  // orantılı yüksekliği otomatik yap
             object-cover
             object-top
             transition-transform duration-500
             group-hover:scale-105"
/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
              <h3 className="font-bold text-lg bg-black/40 px-2 py-1 rounded">{item.title}</h3>
              <p className="text-sm opacity-90"></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomepageShowcase;