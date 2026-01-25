import React from "react";

const About = () => {
  return (
    <div className="w-full">

      {/* HERO VIDEO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          src="/Alizone_iklimlendirme.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Ankara Klima Satışı ve İklimlendirme Çözümleri
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Alizone İklimlendirme; Ankara genelinde bireysel ve kurumsal
              müşterilerine klima satışı, ısı pompası sistemleri ve
              profesyonel iklimlendirme çözümleri sunmaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* TEXT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Alizone İklimlendirme Hakkında
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Alizone İklimlendirme, Ankara merkezli olarak faaliyet gösteren;
              klima satışı, montajı ve satış sonrası teknik servis hizmetleri
              sunan bir iklimlendirme firmasıdır.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Konut, ofis, mağaza ve endüstriyel alanlar için
              enerji verimli, uzun ömürlü ve çevre dostu klima sistemleri
              ile müşterilerimizin ihtiyaçlarına özel çözümler üretmekteyiz.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Uzman teknik ekibimiz ile satış öncesi keşif, doğru ürün seçimi,
              profesyonel montaj ve satış sonrası destek süreçlerini
              titizlikle yürütmekteyiz.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Müşteri memnuniyetini ön planda tutan hizmet anlayışımız ile
              Ankara klima sektöründe güvenilir ve tercih edilen bir marka
              olmayı hedeflemekteyiz.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/diyibvvua/image/upload/v1765709315/referans_flfxhq.webp"
                alt="Ankara klima satışı ve montaj hizmetleri"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;