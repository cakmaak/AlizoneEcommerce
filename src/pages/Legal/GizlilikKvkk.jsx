const GizlilikKvkk = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-36 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">
        Gizlilik ve KVKK Aydınlatma Metni
      </h1>

      <p>
        İşbu Aydınlatma Metni, veri sorumlusu sıfatıyla Alizone Teknoloji ve
        İklimlendirme Ltd. Şti. tarafından, 6698 sayılı Kişisel Verilerin
        Korunması Kanunu (“KVKK”) uyarınca hazırlanmıştır.
      </p>

      <h2 className="font-bold mt-6">1. Veri Sorumlusu</h2>
      <p>
        Veri sorumlusu: Alizone Teknoloji ve İklimlendirme Ltd. Şti.
        <br />
        E-posta: info@alizoneklima.com
      </p>

      <h2 className="font-bold mt-6">2. İşlenen Kişisel Veriler</h2>
      <p>
        İnternet sitemiz üzerinden gerçekleştirilen işlemler kapsamında;
        ad-soyad, telefon numarası, e-posta adresi, teslimat adresi, fatura
        bilgileri, sipariş bilgileri, <strong>IP adresi</strong>,{" "}
        <strong>cihaz ve tarayıcı bilgileri (User-Agent)</strong> ile işlem
        güvenliğine ilişkin log kayıtları işlenebilmektedir.
      </p>

      <h2 className="font-bold mt-6">
        3. Kişisel Verilerin İşlenme Amaçları
      </h2>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Sipariş ve satış süreçlerinin yürütülmesi</li>
        <li>Sözleşmenin kurulması ve ifası</li>
        <li>Faturalandırma ve muhasebe işlemleri</li>
        <li>Teslimat ve lojistik süreçleri</li>
        <li>Bilgi güvenliği ve dolandırıcılığın önlenmesi</li>
        <li>Sistem kayıtlarının (log) tutulması</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
      </ul>

      <h2 className="font-bold mt-6">4. Hukuki Sebep</h2>
      <p>
        Kişisel verileriniz, KVKK’nın 5. maddesi uyarınca; sözleşmenin
        kurulması ve ifası, veri sorumlusunun hukuki yükümlülüklerini yerine
        getirmesi ve meşru menfaat hukuki sebeplerine dayanılarak
        işlenmektedir.
      </p>

      <h2 className="font-bold mt-6">5. Ödeme Güvenliği</h2>
      <p>
        Ödeme işlemleri, lisanslı ödeme kuruluşları aracılığıyla
        gerçekleştirilmektedir. Kredi kartı bilgileri sistemlerimizde
        kaydedilmemekte ve saklanmamaktadır.
      </p>

      <h2 className="font-bold mt-6">6. Saklama Süresi</h2>
      <p>
        Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca veya
        işlenme amacının gerektirdiği süre kadar saklanmakta, sürenin
        sonunda silinmekte veya anonim hale getirilmektedir.
      </p>

      <h2 className="font-bold mt-6">7. İlgili Kişinin Hakları</h2>
      <p>
        KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
        işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme,
        işlenmesine itiraz etme ve zarar halinde tazminat talep etme
        haklarına sahipsiniz.
      </p>
    </div>
  );
};

export default GizlilikKvkk;