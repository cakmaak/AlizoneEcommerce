import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Toast = ({ type = "success", message, onClose }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2500);
    const closeTimer = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
      px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3
      text-white animate-slide-up
      ${hide ? "animate-fade-out" : ""}
      ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}
    >
      {type === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Toast;
