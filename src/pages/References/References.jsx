import { useState } from "react";
import { ChevronDown, Building2 } from "lucide-react";

const references = [

  {
    title: "Akyurt Belediyesi-BOSCH Salon Tipi Klima ",
    images: [
      "/AKYURT/1.jpg",
      "/AKYURT/2.jpg",
      "/AKYURT/3.jpg",
      "/AKYURT/4.jpg",
      
    ],
  },
  {
    title: "İncek Medical Park Hastanesi-BOSCH Salon Tipi Klima ",
    images: [
      "/INCEKMEDIKAL/1.jpeg",
      "/INCEKMEDIKAL/2.jpeg",
      "/INCEKMEDIKAL/3.jpeg",
      "/INCEKMEDIKAL/4.jpeg",
      
    ],
  },
  {
    title: "Bayındır Otel-Çankaya-BOSCH Split Klima ",
    images: [
      "/Bayindir/1.jpg",
      "/Bayindir/2.jpg",
      "/Bayindir/3.jpg",
      "/Bayindir/4.jpg",
      "/Bayindir/5.jpg",
    ],
  },
  {
    title: "Türk Burger-Pursaklar Şubesi-BOSCH Kaset Tipi Klima ",
    images: [
      "/TURKBURGER/1.jpg",
      "/TURKBURGER/2.jpg",
      "/TURKBURGER/3.jpg",
      "/TURKBURGER/4.jpg",
      
    ],
  },

   {
    title: "Tado Teknoloji-Kahramankazan-SAKURA Salon Tipi Klima ",
    images: [
      "/Tadotek/1.jpeg",
      "/Tadotek/2.jpeg",
      "/Tadotek/3.jpeg",
     
    ],
  },
  
  {
    title: "Bayındır Otel-Çankaya-BOSCH Split Klima ",
    images: [
      "/Bayindir/1.jpg",
      "/Bayindir/2.jpg",
      "/Bayindir/3.jpg",
      "/Bayindir/4.jpg",
      "/Bayindir/5.jpg",
    ],
  },
  {
    title: "Arissa Point/Yenimahalle-Bosch 5 İç Ünite 1 Dış Ünite Multisplit Klima" ,
    images: [
      "/Arissa/1.jpeg",
      "/Arissa/2.jpeg",
      "/Arissa/3.jpeg",
      "/Arissa/4.jpeg",
      "/Arissa/5.jpeg",
      "/Arissa/6.jpeg",
     
    ],
  },
  {
    title: "Prosista Asma Tavan ve Profil Sistemleri-Yenimahalle Yapı Marketçileri Sitesi-Split Klima/BOSCH SPLİT TİPİ KLİMA ",
    images: [
      "/Prosista/1.jpeg",
      "/Prosista/2.jpeg",
      "/Prosista/3.jpeg",
      "/Prosista/4.jpeg",
     
    ],
  },
  {
    title: "Palan Otel-Ulus-BOSCH Split Klima ",
    images: [
      "/PALAN/1.jpeg",
      "/PALAN/2.jpeg",
      "/PALAN/3.jpeg",
      "/PALAN/4.jpeg",
      "/PALAN/5.jpeg",
      "/PALAN/6.jpeg",
      "/PALAN/7.jpeg",
      "/PALAN/8.jpeg",

    ],
  },
  {
    title: "Navlungo Ankara Şubesi-Yenimahalle-BOSCH Split Klima",
    images: [
      "/Navlunga/1.jpeg",
      "/Navlunga/2.jpeg",
      "/Navlunga/3.jpeg",
      "/Navlunga/4.jpeg",
      
     
    ],
  },
  {
    title: "Nilova Cafe-Kahramankazan-CARRIER Salon Tipi Klima ",
    images: [
      "/Nilova/1.jpeg",
      "/Nilova/2.jpeg",
      
     
    ],
  },
  {
    title: "Kahramankazan Dis Hekimi Kliniği-BOSCH Split Klima ",
    images: [
      "/Dis/1.jpeg",
      "/Dis/2.jpeg",
      "/Dis/3.jpeg",
      
     
    ],
  },
  {
    title: "TADBİLEN SHOP CARRIER SALON TİPİ KLİMA-YENİMAHALLE ",
    images: [
      "/Tadbilen/1.jpeg",
      "/Tadbilen/2.jpeg",
      "/Tadbilen/3.jpeg",
      "/Tadbilen/4.jpeg",
     
    ],
  },
];

export default function References() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-12">
          Referanslarımız
        </h1>

        <div className="space-y-6">
          {references.map((ref, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border shadow-sm"
              >
                {/* HEADER */}
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Building2 className="text-blue-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {ref.title}
                    </span>
                  </div>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* CONTENT */}
                {isOpen && (
                  <div className="px-6 pb-8">
                    <p className="text-sm text-gray-600 mb-6">
                      Klima satışı ve profesyonel montaj hizmeti
                      tarafımızdan gerçekleştirilmiştir.
                    </p>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
  {ref.images.map((img, i) => (
    <div
      key={i}
      className="h-48 rounded-xl border bg-white flex items-center justify-center overflow-hidden"
    >
      <img
        src={img}
        alt={`${ref.title} ${i + 1}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  ))}
</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


