import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Toast from "./components/ui/Toast";
import AppRouter from "./routes/AppRouter";
import MiniCart from "./components/cart/MiniCart";
import FloatingCartButton from "./components/cart/FloatingCartButton";

function App() {
  const [toast, setToast] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setToast(e.detail);
    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  useEffect(() => {
    const handler = () => setCartOpen(true);
    window.addEventListener("openCart", handler);
    return () => window.removeEventListener("openCart", handler);
  }, []);

  return (
    <BrowserRouter>
      {/* ROUTES */}
      <AppRouter />

      {/* TOAST */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

  
    </BrowserRouter>
  );
}

export default App;