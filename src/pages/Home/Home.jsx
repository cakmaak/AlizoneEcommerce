import { useEffect, useRef,useState } from "react";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Wrench, Zap } from "lucide-react";


const Home = () => {
  const videoRef = useRef(null);

  function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}</span>;
}


  useEffect(() => {
    const v = videoRef.current;
    if (v && v.paused) {
      const attempt = v.play();
      if (attempt?.catch) attempt.catch(() => {});
    }
  }, []);

  const activityAreas = [
    {
      title: "Klimalar",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766052267/A_cozy_indoor_scene_featuring_children_playing_in_a_living_room._The_focus_is_on_a_modern_split_air_conditioner_prominently_mounted_on_the_wall._The_room_is_bright_with_natural_light_and_the_children_are_engaged_i_omgds1.jpg",
      href: "/products?type=split",
    },
    {
      title: "Mobil Klimalar",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766047423/A_portable_air_conditioner_in_a_modern_living_room_showing_the_appliance_working_quietly_and_efficiently._The_room_is_bright_and_airy_with_green_plants_in_the_background._s3a3zl.jpg",
      href: "/products?type=mobile",
    },
    {
      title: "Multi Split Klima",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766047574/A_modern_multi_split_air_conditioning_system_installed_in_a_bright_open_plan_living_area._The_indoor_units_are_mounted_on_the_walls_showcasing_a_sleek_design_with_sunlight_streaming_through_large_windows_and_decor_m0zyww.jpg",
      href: "/products?type=multi-split",
    },
    {
      title: "Isı Pompası",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766052360/%C4%B1s%C4%B1pompasiiii_dve5gm.jpg",
      href: "/products?type=isipompasi",
    },
  ];

  return (
    <main className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] md:min-h-screen w-full overflow-hidden">
      <video
  ref={videoRef}
  className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
  autoPlay
  muted
  loop
  playsInline
>
          <source src="/Alizone_iklimlendirme.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-20 md:top-6 left-1/2 -translate-x-1/2 z-30">
  <img
    src="/logooo.png"
    alt="Alizone Klima Logo"
    className="w-64 md:w-[420px] object-contain drop-shadow-2xl"
  />
</div>

       <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white">
          <div className="max-w-4xl text-center text-white space-y-4">
         

            <h1 className="text-2xl md:text-4xl font-bold leading-snug mt-8">
              Ankara Klima Satış & Profesyonel Montaj
            </h1>
             <p className="text-base sm:text-lg md:text-xl text-slate-100/90 max-w-2xl mx-auto">
                  Alizone Klima olarak <strong>Ankara klima satışı</strong>{" "}
                  alanında konut ve iş yerleri için güvenilir çözümler sunuyoruz.
                  Ücretsiz keşif, profesyonel montaj ve satış sonrası destekle
                  yanınızdayız.
                </p>

             
            

            <Link
              to="/products"
              className="inline-block mt-28 rounded-full bg-emerald-500 px-10 py-3 font-semibold text-white hover:bg-emerald-600 transition"
            >
              Ürünleri İncele
            </Link>
          </div>
        </div>
      </section>
{/* ================= BAŞARI ================= */}
<section className="relative py-28 bg-white overflow-hidden">

  <div className="relative max-w-6xl mx-auto px-6 text-center">

    <div className="flex justify-center mb-8">
      <div className="bg-black/5 p-6 rounded-full border border-black/10 shadow-md">
        <Award size={50} className="text-black" />
      </div>
    </div>

    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
      2025 İç Anadolu <br />
      <span className="text-gray-700">
        Bosch Klima Devreye Alma Lideri
      </span>
    </h2>

    <div className="w-24 h-[2px] bg-black mx-auto mb-10" />

    <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
      2025 yılında İç Anadolu Bölgesi’nde Bosch klima devreye alma alanında
      lider konuma ulaştık. Uzman teknik kadromuz ve güçlü servis altyapımızla
      kalite standartlarımızı en üst seviyede sürdürüyoruz.
    </p>

    <div className="grid md:grid-cols-3 gap-12 mt-12">

      <div className="flex flex-col items-center">
        <Wrench className="text-gray-800 mb-3" size={30} />
        <h3 className="text-xl font-semibold text-gray-900">
          Sertifikalı Teknik Kadro
        </h3>
        <p className="text-gray-500 mt-2 text-sm max-w-xs">
          Alanında uzman ve yetkili ekip ile güvenli devreye alma hizmeti.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <ShieldCheck className="text-gray-800 mb-3" size={30} />
        <h3 className="text-xl font-semibold text-gray-900">
          Güvenilir Hizmet
        </h3>
        <p className="text-gray-500 mt-2 text-sm max-w-xs">
          Satış öncesi ve sonrası destekle sürdürülebilir memnuniyet.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Zap className="text-gray-800 mb-3" size={30} />
        <h3 className="text-xl font-semibold text-gray-900">
          Profesyonel Devreye Alma
        </h3>
        <p className="text-gray-500 mt-2 text-sm max-w-xs">
          Planlı ve titiz devreye alma süreçleri ile maksimum performans.
        </p>
      </div>

    </div>

  </div>
</section>
      {/* ================= HİZMETLER ================= */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center space-y-3 mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">
            Faaliyet Alanlarımız
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Hizmetlerimiz
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            İklimlendirme alanında geniş hizmet yelpazemizle yanınızdayız.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {activityAreas.map((area) => (
            <Link
              key={area.title}
              to={area.href}
              className="group relative rounded-2xl bg-gray-50 shadow hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={area.image}
                  alt={`Ankara ${area.title} satışı ve montaj hizmeti`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">
                    {area.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= REFERANSLAR ================= */}
      <section className="container mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">
              Referanslarımız
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Güvenilir Hizmet, Memnun Müşteriler
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Yıllardır sektörde edindiğimiz tecrübe ile yüzlerce projede
              başarıyla hizmet verdik.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Enerji verimliliği, kaliteli işçilik ve zamanında teslimat
              prensibiyle çalışıyoruz.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow hover:-translate-y-2 hover:shadow-xl transition">
            <img
              src="https://res.cloudinary.com/diyibvvua/image/upload/v1765709315/referans_flfxhq.webp"
              alt="Ankara klima montaj referans projeleri"
              className="h-72 md:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
