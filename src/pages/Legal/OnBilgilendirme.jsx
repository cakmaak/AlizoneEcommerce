const OnBilgilendirme = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-36 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Ön Bilgilendirme Formu</h1>

      <p>
        İşbu Ön Bilgilendirme Formu,
        6502 sayılı Tüketicinin Korunması Hakkında Kanun
        ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca,
        alıcının sipariş vermeden önce bilgilendirilmesi amacıyla
        hazırlanmıştır.
      </p>

      <h2 className="font-bold mt-6">1. Satıcı Bilgileri</h2>
      <p>
        <strong>Satıcı:</strong> Alizone Teknoloji ve İklimlendirme Ltd. Şti.<br />
        <strong>Vergi No:</strong> 0531551846<br />
        <strong>E-posta:</strong> alizoneklima@gmail.com
      </p>

      <h2 className="font-bold mt-6">2. Ürün Bilgileri</h2>
      <p>
        Satışa sunulan ürünler; klima, ısı pompası, mobil klima ve
        iklimlendirme ürünleridir.
        Ürünlerin türü, markası, modeli, temel özellikleri,
        satış bedeli, ödeme yöntemi ve teslimat bilgileri,
        sipariş öncesinde alıcıya açık ve anlaşılır şekilde sunulmaktadır.
      </p>

      <h2 className="font-bold mt-6">3. Fiyat ve Ödeme</h2>
      <p>
        Ürün fiyatları, sipariş anında geçerli olan satış bedelleridir
        ve tüm vergiler dahildir.
        Alıcı, siparişi onaylamakla birlikte ödeme yükümlülüğü
        altına girdiğini kabul eder.
      </p>

      <h2 className="font-bold mt-6">4. Teslimat</h2>
      <p>
        Ürünler, yasal süre olan <strong>30 (otuz) gün</strong> içerisinde,
        alıcının sipariş sırasında bildirdiği adrese teslim edilir.
      </p>

      <h2 className="font-bold mt-6">5. Cayma Hakkı</h2>
      <p>
        Alıcı, ürünü teslim aldığı tarihten itibaren
        <strong> 14 (ondört) gün</strong> içerisinde,
        herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilir.
      </p>

      <h2 className="font-bold mt-6">
        6. Cayma Hakkı Kullanılamayacak Ürünler
      </h2>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği’nin
        <strong> 15. maddesi</strong> uyarınca;
        yetkili servis tarafından montajı yapılmış klima,
        ısı pompası ve iklimlendirme ürünlerinde
        <strong> cayma hakkı kullanılamaz</strong>.
      </p>

      <h2 className="font-bold mt-6">7. İade Süreci</h2>
      <p>
        Cayma hakkının usulüne uygun kullanılması halinde,
        ürün bedeli, iade edilen ürünün satıcıya ulaşmasından sonra
        en geç <strong>14 gün</strong> içerisinde,
        alıcının ödeme yaptığı yöntemle iade edilir.
      </p>

      <h2 className="font-bold mt-6">8. Şikayet ve Uyuşmazlık</h2>
      <p>
        Alıcı, şikayet ve taleplerini satıcının iletişim kanalları
        üzerinden iletebilir.
        Uyuşmazlık halinde, Tüketici Hakem Heyetleri
        ve Tüketici Mahkemeleri yetkilidir.
      </p>

      <p className="mt-6 font-medium">
        Alıcı, bu Ön Bilgilendirme Formu’nu okuduğunu,
        anladığını ve elektronik ortamda onayladığını kabul eder.
      </p>
    </div>
  );
};

export default OnBilgilendirme;