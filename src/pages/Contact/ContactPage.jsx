
const ContactPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      

      {/* HERO – HOME İLE AYNI MANTIK */}
      <section className="relative min-h-[60vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Alizone_iklimlendirme.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-6">
          <div className="text-center text-white max-w-3xl space-y-5">
            <p className="text-xs tracking-[0.35em] uppercase text-emerald-300">
              Alizone İklimlendirme
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Ankara Klima Satışı & Teknik Servis
            </h1>

            <p className="text-base sm:text-lg text-slate-200">
              Ücretsiz keşif, profesyonel montaj ve güvenilir klima servisi için
              bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="container mx-auto px-6 py-20 space-y-20">

        {/* BAŞLIK */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
            İletişim
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Bize Ulaşın
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ankara genelinde klima satışı, montaj ve servis hizmetleri için
            ekibimiz her zaman yanınızda.
          </p>
        </div>

        {/* İLETİŞİM KARTI */}
        <section className="bg-white rounded-2xl shadow-lg p-10 grid md:grid-cols-3 gap-10">

          {/* SOL */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">
              Profesyonel Klima Hizmetleri
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Alizone Klima olarak Ankara’da bireysel ve ticari müşterilerimize
              klima satışı, ücretsiz keşif, uzman montaj ve satış sonrası teknik
              servis hizmetleri sunuyoruz.
            </p>

            <div className="space-y-4 pt-4">

              <div>
                <p className="text-sm text-slate-500">Telefon</p>
                <a
                  href="tel:+905542309563"
                  className="text-lg font-semibold text-slate-800 hover:text-emerald-600 transition"
                >
                  0 (554) 230 95 63
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-500">E-posta</p>
                <a
                  href="mailto:alizoneteknoloji@hotmail.com"
                  className="text-lg font-semibold text-slate-800 hover:text-emerald-600 transition"
                >
                  alizoneteknoloji@hotmail.com
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-500">Adres</p>
                <p className="font-semibold text-slate-800">
                  Ahi Evran Mah. 225. Cadde  
                  F Blok No:61  
                  Sincan / Ankara
                </p>
              </div>
            </div>
          </div>

          {/* SAĞ CTA */}
          <div className="flex flex-col justify-center gap-4">
            <a
              href="tel:+905542309563"
              className="w-full text-center py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition"
            >
              Hemen Ara
            </a>

            <a
              href="mailto:alizoneteknoloji@hotmail.com"
              className="w-full text-center py-4 rounded-xl border border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50 transition"
            >
              Mail Gönder
            </a>
          </div>
        </section>
      </main>

      {/* PROJE & TOPLU SATIŞ */}
<section className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-10 shadow-md">
  <div className="max-w-5xl mx-auto text-center space-y-6">

    <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">
      Kurumsal Çözümler
    </p>

    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">
      Yeni Binalar & İşyerleri İçin  
      Profesyonel İklimlendirme Projeleri
    </h3>

    <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
      Alizone İklimlendirme olarak Ankara’da;  
      <strong> yeni konut projeleri, iş merkezleri, mağazalar ve ticari alanlar</strong> için
      <strong> multi klima sistemleri</strong>, VRF ve merkezi iklimlendirme çözümleri
      sunuyoruz.
    </p>

    <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
      Keşif aşamasından başlayarak, ihtiyaç analizi, proje çizimi,
      doğru ürün seçimi, toplu klima satışı ve profesyonel montaj
      süreçlerini anahtar teslim olarak yönetiyoruz.
    </p>

    <div className="flex flex-wrap justify-center gap-4 pt-6">
      <span className="px-5 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow">
        Multi Split Sistemler
      </span>
      <span className="px-5 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow">
        Yeni Bina Projelendirme
      </span>
      <span className="px-5 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow">
        Toplu Klima Satışı
      </span>
      <span className="px-5 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow">
        Kurumsal & Ticari Çözümler
      </span>
    </div>

    <div className="pt-8">
      <a
              href="mailto:alizoneteknoloji@hotmail.com"
              className="w-full text-center py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition"
            >
              Proje & Toplu Satış İçin İletişime Geçin
            </a>
    </div>

  </div>
</section>

      
    </div>
  );
};

export default ContactPage;
