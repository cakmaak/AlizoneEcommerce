
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const FloatingCartButton = ({ onClick }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [shake, setShake] = useState(false);

  useEffect(() => {
  const handler = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  window.addEventListener("openCart", handler);
  return () => window.removeEventListener("openCart", handler);
}, []);

  return (
    <button
      onClick={onClick}
      className={`fixed right-5 bottom-5 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-xl transition
${shake ? "animate-bounce" : ""}`}
    >
      <ShoppingCart />

      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton; 
