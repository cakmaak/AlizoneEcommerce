import { useEffect, useState } from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Toast = ({ message, onClose }) => {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2500);
    const closeTimer = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const handleClick = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
        px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        text-white font-semibold animate-slide-up
        ${hide ? "animate-fade-out" : "opacity-100"}
        transition-all duration-300
      `}
    >
      <CheckCircle className="w-6 h-6" />
      <span className="text-sm md:text-base">{message}</span>
      <ShoppingCart className="w-5 h-5 ml-auto" />
    </div>
  );
};

export default Toast;