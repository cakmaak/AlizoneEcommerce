const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
      
      <img
        src="https://res.cloudinary.com/diyibvvua/image/upload/v1765462385/WhatsApp_Image_2025-11-16_at_14.48.31_be2ory.jpg"
        alt="Loading"
        className="w-52 mb-6 animate-pulse"
      />

      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-indigo-600 font-semibold text-lg">
          Yükleniyor...
        </span>
      </div>

    </div>
  );
};

export default FullPageLoader;
