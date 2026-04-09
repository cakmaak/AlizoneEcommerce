import { useState } from "react";
import { ChevronDown, Building2 } from "lucide-react";



const references = [


  {
    title: "AKYURT BELEDİYESİ BOSCH SALON TİPİ KLİMALAR ",
    images: [
      "/AKYURT/1.jpg",
      "/AKYURT/2.jpg",
      "/AKYURT/3.jpg",
      "/AKYURT/4.jpg",
      
    ],
  },
  
  {
    title: "MEDİCAL PARK HASTANESİ -İNCEK- BOSCH SALON TİPİ KLİMALAR ",
    images: [
      "/INCEKMEDIKAL/1.jpeg",
      "/INCEKMEDIKAL/2.jpeg",
      "/INCEKMEDIKAL/3.jpeg",
      "/INCEKMEDIKAL/4.jpeg",
      
    ],
  },
  {
    title: "ZÜBEYDE HANIM KONUK EVİ -YENİMAHALLE- BOSCH SPLİT KLİMALAR",
    images: [
      "/konukev/1.jpeg",
      "/konukev/2.jpeg",
      "/konukev/4.jpeg",
      "/konukev/6.jpeg",
      "/konukev/7.jpeg",
      "/konukev/8.jpeg",
      "/konukev/9.jpeg",
      "/konukev/10.jpeg",
      "/konukev/11.jpeg",
      "/konukev/12.jpeg",
      "/konukev/13.jpeg",
      "/konukev/14.jpeg",
      "/konukev/15.jpeg",
      "/konukev/16.jpeg",
      "/konukev/17.jpeg",



      
    ],
  },
  {
    title: "PALAN OTEL -ULUS- BOSCH SPLİT KLİMALAR ",
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
    title: "COLDWELL BANKER WEST -YENİMAHALLE- BOSCH SALON TİPİ KLİMA & Split Klima",
    images: [
      "/CW/1.jpeg",
      "/CW/2.jpeg",
      "/CW/3.jpeg",
      "/CW/4.jpeg",
      
      
    ],
  },
   {
    title: "MERDAN OTOMOTİV -OSTİM- BOSCH SPLİT PREMIUM KLİMA",
    images: [
      "/MER/1.jpeg",
      "/MER/2.jpeg"
    ],
  },
  {
    title: "TÜRK BURGER PURSAKLAR ŞUBESİ -KEÇİÖREN- BOSCH KASET TİPİ KLİMALAR ",
    images: [
      "/TURKBURGER/1.jpg",
      "/TURKBURGER/2.jpg",
      "/TURKBURGER/3.jpg",
      "/TURKBURGER/4.jpg",
      
    ],
  },

  {
    title: "AHSENLER MANZARA KONUTLARI -YENİMAHALLE- CARRİER SALON TİPİ KLİMA ",
    images: [
      "/AHSmanzara/1.jpeg",
      "/AHSmanzara/2.jpeg",
      "/AHSmanzara/3.jpeg",
      "/AHSmanzara/4.jpeg",
     
    ],
  },

  {
    title: "AHSENLER EXEN TOWER -YENİMAHALLE- CARRİER SALON TİPİ KLİMA ",
    images: [
      "/Exentower/1.jpeg",
      "/Exentower/3.jpeg",
      "/Exentower/4.jpeg",
   
     
    ],
  },


   {
    title: "TADO TEKNOLOJİ -KAHRAMANKAZAN- SAKURA SALON TİPİ KLİMA",
    images: [
      "/Tadotek/1.jpeg",
      "/Tadotek/2.jpeg",
      "/Tadotek/3.jpeg",
     
    ],
  },

  {
    title: "ZİRVEDEN BATI SİTESİ -YENİMAHALLE- BOSCH PREMİUM SPLİT KLİMALAR ",
    images: [
      "/ZirvedenBati/1.jpeg",
      "/ZirvedenBati/2.jpeg",
      "/ZirvedenBati/3.jpeg",
      "/ZirvedenBati/4.jpeg",
      "/ZirvedenBati/5.jpeg",
      "/ZirvedenBati/6.jpeg",
      "/ZirvedenBati/7.jpeg",
      "/ZirvedenBati/8.jpeg",
      "/ZirvedenBati/9.jpeg",
      "/ZirvedenBati/10.jpeg",
    ],
  },
  
  {
    title: "BAYINDIR OTEL -ÇANKAYA- BOSCH SPLİT KLİMALAR",
    images: [
      "/Bayindir/1.jpg",
      "/Bayindir/2.jpg",
      "/Bayindir/3.jpg",
      "/Bayindir/4.jpg",
      "/Bayindir/5.jpg",
    ],
  },
  {
    title: "ARİSSA POİNT -YENİMAHALLE- BOSCH MULTİSPLİT KLİMA 5 İÇ Ünite 1 DIŞ ÜNİTE" ,
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
    title: "PROSİSTA ASMA TAVAN VE PROFİL SİSTEMLERİ -YENİMAHALLE YAPI MARKETÇİLERİ SİTESİ-  BOSCH SPLİT TİPİ KLİMA ",
    images: [
      "/Prosista/1.jpeg",
      "/Prosista/2.jpeg",
      "/Prosista/3.jpeg",
      "/Prosista/4.jpeg",
     
    ],
  },
  {
    title: "Hz.HATİCE CAMİ-YENİMAHALLE-BOSCH SALON TİPİ KLİMALAR",
    images: [
      "/HaticeCami/6.jpeg",
      "/HaticeCami/5.jpeg",
      "/HaticeCami/4.jpeg",
      "/HaticeCami/3.jpeg",
      "/HaticeCami/2.jpeg",
      "/HaticeCami/1.jpeg",
    

    ],
  },
  {
    title: "FARAS 2 BULVAR KONUTLARI -YENİMAHALLE- BOSCH MULTİSPLİT KLİMA 2 İÇ 1 DIŞ ÜNİTE ",
    images: [
 "/Faraf/1.jpeg",
      "/Faraf/2.jpeg",
      "/Faraf/3.jpeg",
      "/Faraf/4.jpeg",
      "/Faraf/5.jpeg",
   

    ],
  },
   {
    title: "BATI YAKASI 2 SİTESİ-YENİMAHALLE-BOSCH SPLİT KLİMALAR",
    images: [
      "/batıyak2/1.jpeg",
      "/batıyak2/2.jpeg",
      "/batıyak2/3.jpeg",
      "/batıyak2/4.jpeg",
      
     
    ],
  },
     {
    title: "KUASAR MAKİNE-KAHRAMANKAZAN-SAKURA SPLİT KLİMA",
    images: [
      "/kuasar/1.jpeg",
      "/kuasar/2.jpeg",
      "/kuasar/3.jpeg",
      "/kuasar/4.jpeg",
      
     
    ],
  },
  
  {
    title: "NAVLUNGO Ankara Şubesi-YENİMAHALLE-BOSCH SPLİT KLİMALAR",
    images: [
      "/Navlunga/1.jpeg",
      "/Navlunga/2.jpeg",
      "/Navlunga/3.jpeg",
      "/Navlunga/4.jpeg",
      
     
    ],
  },
    {
    title: "BOSCH BAYİ ÇAKIRLAR-YENİMAHALLE-BOSCH KASET TİPİ KLİMA",
    images: [
      "/bshcakir/1.jpeg",
      "/bshcakir/2.jpeg",
      "/bshcakir/3.jpeg",
      
      
     
    ],
  },
  
  {
    title: "NİLOVA CAFE-KAHRAMANKAZAN -CARRIER SALON TİPİ KLİMA",
    images: [
      "/Nilova/1.jpeg",
      "/Nilova/2.jpeg",
      
     
    ],
  },
    {
    title: "NUR OTOMOTİV  -YENİMAHALLE -  BOSCH SPLİT PREMİUM KLİMA ",
    images: [
      "/NUROTO/1.jpeg",
      "/NUROTO/2.jpeg",
  
    ],
  },
      {
    title: "BOSCH BAYİ İLKYERLEŞİM -YENİMAHALLE -  BOSCH SPLİT KLİMA ",
    images: [
      "/BSHOZ/1.jpeg",
      "/BSHOZ/2.jpeg",
  
    ],
  },
  {
    title: "DİŞ HEKİMİ KLİNİĞİ -KAHRAMANKAZAN- BOSCH SPLİT KLİMA",
    images: [
      "/Dis/1.jpeg",
      "/Dis/2.jpeg",
      "/Dis/3.jpeg",
      
     
    ],
  },
  {
    title: "TADBİLEN SHOP -YENİMAHALLE- CARRIER SALON TİPİ KLİMA ",
    images: [
      "/Tadbilen/1.jpeg",
      "/Tadbilen/2.jpeg",
      "/Tadbilen/3.jpeg",
      "/Tadbilen/4.jpeg",
     
    ],
  },
    {
    title: "FARİS BİSTRO -ETLİK- LG SALON TİPİ KLİMA   ",
    images: [
      "/Faris/1.jpeg",
      "/Faris/2.jpeg",
   
     
    ],
  },
      {
    title: "GALLERİA KONUTLARI -ÇANKAYA- BOSCH SPLİT KLİMA  ",
    images: [
      "/Galleria/1.jpeg",
      "/Galleria/2.jpeg",
   
     
    ],
  },
  
];

export default function References() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="min-h-screen bg-gray-50 py-36 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-14">
  <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border">
    
    <img
      src="/fav32.png"
      alt="logo"
      className="w-8 h-8"
    />

    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide">
      REFERANSLARIMIZ
    </h1>
  </div>

  <div className="w-20 h-1 bg-blue-500 mt-4 rounded-full"></div>
</div>

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
  className="w-full h-full object-cover cursor-zoom-in"
  loading="lazy"
  onClick={() => setSelectedImage(img)}
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
      {selectedImage && (
  <div
    onClick={() => setSelectedImage(null)}
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  >
    <img
      src={selectedImage}
      className="max-w-[90%] max-h-[90%] rounded-xl"
    />
  </div>
)}
    </section>
  );
}


