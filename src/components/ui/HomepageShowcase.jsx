import { useNavigate } from "react-router-dom";

const HomepageShowcase = () => {
  const navigate = useNavigate();

  const slides = [
   { img: "1", path: "/products/22" },
  { img: "2", path: "/products/1" },
  { img: "0", path: "/products/15" },
  ];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {slides.map((item) => (
          <div
            key={item.img}
            onClick={() => navigate(item.path)}
            className="relative rounded-3xl overflow-hidden shadow-xl
                       group bg-white cursor-pointer"
          >
            <img
              src={`/HomepageSlider/${item.img}.png`}
              alt="Alizone Klima"
              className="w-full h-[200px] md:h-[260px] lg:h-[300px]
                         object-contain
                         transition-transform duration-500
                         group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
              <h3 className="font-bold text-lg">
                Profesyonel Klima Çözümleri
              </h3>
              <p className="text-sm opacity-90">
                
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HomepageShowcase;