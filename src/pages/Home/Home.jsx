import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const videoRef = useRef(null);

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
      <section className="relative min-h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Homepagevideo.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
          <div className="max-w-4xl text-center text-white space-y-6">
            <p className="text-xs tracking-[0.35em] uppercase text-emerald-300">
              Alizone Klima
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Ankara Klima Satış & Profesyonel Montaj
            </h1>

            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              {/* Alizone Klima olarak Ankara klima satışı alanında konut ve iş yerleri için güvenilir çözümler sunuyoruz. Ücretsiz keşif, profesyonel montaj ve satış sonrası destekle yanınızdayız.*/}
              TEST AMAÇLIDIR GERÇEK E TİCARETLE ALAKASI YOKTUR SATIŞ YAPILMAZ,YAPILAMAZ,ÖDEME SİSTEMİ TAMAMEN HAYAL ÜRÜNÜDÜR.
            </p>

            <Link
              to="/products"
              className="inline-block rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white hover:bg-emerald-600 transition"
            >
              Ürünleri İncele
            </Link>
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
