const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
      
      <img
        src="https://res.cloudinary.com/diyibvvua/image/upload/v1770716217/ChatGPT_Image_10_%C5%9Eub_2026_11_15_42_cqpnnt.png"
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
