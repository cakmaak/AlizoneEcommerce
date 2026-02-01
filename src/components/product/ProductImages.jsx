import { useState } from "react";
import { X } from "lucide-react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {/* Büyük Görsel */}
      <div
        className="bg-slate-100 rounded-xl h-[300px] flex items-center justify-center cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={images?.[activeImage]}
          alt="Ürün"
          className="max-h-[260px] object-contain"
        />
      </div>

      {/* Küçük Görseller */}
      <div className="flex gap-3 justify-center mt-4">
        {images?.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`w-16 h-16 rounded-lg border overflow-hidden ${
              activeImage === i ? "border-indigo-600" : "border-slate-200"
            }`}
          >
            <img src={img} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <X size={32} />
          </button>
          <img
            src={images?.[activeImage]}
            alt="Ürün büyük"
            className="max-h-full max-w-full object-contain rounded-xl shadow-lg animate-scaleUp"
          />
        </div>
      )}
    </>
  );
};

export default ProductImages;