const IadeCayma = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-36 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">İade ve Cayma Koşulları</h1>

      <p>
        İşbu iade ve cayma koşulları, 6502 sayılı Tüketicinin Korunması
        Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri
        uyarınca düzenlenmiştir.
      </p>

      <h2 className="font-bold mt-6">Cayma Hakkı</h2>
      <p>
        Alıcı, ürünü teslim aldığı tarihten itibaren
        <strong> 14 (ondört) gün</strong> içerisinde
        herhangi bir gerekçe göstermeksizin ve cezai şart
        ödemeksizin cayma hakkını kullanabilir.
      </p>

      <h2 className="font-bold mt-6">Cayma Hakkı Kapsamı Dışındaki Ürünler</h2>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği’nin
        <strong> 15. maddesi</strong> uyarınca;
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>
          Yetkili servis tarafından montajı yapılmış klima,
          ısı pompası ve tüm iklimlendirme ürünlerinde,
          <strong> cayma hakkı kullanılamaz</strong>.
        </li>
        <li>
          Kurulumu yapılmış ürünler tekrar satışa uygun
          nitelikte olmadığından iade kapsamı dışındadır.
        </li>
      </ul>

      <p className="mt-4">
        Montaj işlemi gerçekleştirilmemiş ürünlerde;
        ürünün kullanılmamış, ambalajının zarar görmemiş,
        aksesuarlarının eksiksiz ve tekrar satılabilir
        durumda olması şartıyla iade kabul edilir.
      </p>

      <h2 className="font-bold mt-6">İade Süreci</h2>
      <p>
        Cayma hakkının kullanılması halinde,
        iade talebi satıcıya ulaştıktan sonra
        ürün bedeli en geç <strong>14 gün</strong> içerisinde,
        alıcının ödeme yaptığı yöntemle iade edilir.
      </p>

      <p className="mt-4">
        İade sürecinin başlatılabilmesi için,
        ürünün satıcıya fiilen ulaşması veya
        kargo firmasına teslim edildiğine dair
        belgenin sunulması gerekmektedir.
      </p>

      <h2 className="font-bold mt-6">Kargo Masrafları</h2>
      <p>
        Cayma hakkının kullanılması halinde,
        iade kargo masrafları Mesafeli Sözleşmeler
        Yönetmeliği hükümleri doğrultusunda belirlenir.
        Satıcının anlaşmalı kargo firması dışında
        yapılan gönderimlerde oluşabilecek ek
        masraflar alıcıya aittir.
      </p>
    </div>
  );
};

export default IadeCayma;