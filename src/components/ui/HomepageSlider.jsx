import { useEffect, useState } from "react";

const images = [
  "/HomepageSlider/1.png",
  "/HomepageSlider/2.png",
  "/HomepageSlider/0.png",
];

const HomepageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[300px] md:h-[420px] lg:h-[520px] rounded-3xl overflow-hidden shadow-xl mb-8">
      {/* Background images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Alizone Klima"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Eviniz & Ofisiniz İçin  
          <span className="block text-indigo-300">Profesyonel Klima Çözümleri</span>
        </h1>

        <p className="mt-4 text-sm md:text-lg text-white/90 max-w-xl">
          Bosch, Daikin ve Mitsubishi inverter klimalarla  
          dört mevsim konforu yaşayın
        </p>

        <a
          href="#urunler"
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-xl font-semibold shadow-lg"
        >
          Ürünleri Keşfet
        </a>
      </div>
    </section>
  );
};

export default HomepageSlider;