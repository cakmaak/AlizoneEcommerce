import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { fetchCart } from "../../features/cart/cartSlice";
import MiniCart from "../cart/MiniCart"; 

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);
  const cartItems = useSelector((state) => state.cart?.items || []);

  // 1. ÇIKIŞ YAPMA FONKSİYONU (Hatanın çözümü burada)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Çıkış yapınca anasayfaya atar
  };

  // 2. SEPETİ GÜNCELLEME (Kullanıcı değiştikçe çalışır)
useEffect(() => {
  if (user) {
    // Giriş yapıldıysa biraz bekle ve çek (Backend merge işlemi için süre tanı)
    const timer = setTimeout(() => {
      dispatch(fetchCart());
    }, 1000); 
    return () => clearTimeout(timer);
  } else {
    // Misafir durumunda direkt çek
    dispatch(fetchCart());
  }
}, [dispatch, user]);
  
  useEffect(() => {
    setMobileOpen(false);
    setIsMiniCartOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ================= NAVBAR (Üst Kısım) ================= */}
      <header className="fixed top-0 left-0 w-full z-[10000] bg-[#121212]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex items-center h-24">

            {/* LOGO */}
            <Link to="/" className="z-10 flex items-center h-full">
              <img src="/logooo.png" alt="Logo" className="w-56 md:w-72 object-contain mt-2" />
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center text-lg font-semibold">
              {[
                { to: "/", label: "Anasayfa" },
                { to: "/products", label: "Ürünler" },
                { to: "/about", label: "Hakkımızda" },
                { to: "/contact", label: "İletişim" },
                { to: "/references", label: "Referanslar" },
              ].map((item, index, arr) => (
                <div key={item.to} className="flex items-center">
                  <Link to={item.to} className="px-4 text-white transition hover:text-emerald-400">
                    {item.label}
                  </Link>
                  {index !== arr.length - 1 && <span className="text-white/30 select-none">|</span>}
                </div>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-4 z-10">
              
              {/* USER & LOGOUT */}
              {user ? (
                <div className="hidden sm:flex items-center gap-4 text-white">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.isim}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-1 text-sm font-semibold text-red-400 hover:text-red-300">
                    <LogOut size={18} /> Çıkış
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:inline-block px-5 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
                  Giriş Yap
                </Link>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
                {mobileOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SAĞ ALT MAVİ BUTON (Mini Sepeti Açar) ================= */}
      <button
        onClick={() => setIsMiniCartOpen((prev) => !prev)}
        className="fixed bottom-8 right-8 z-[10001] bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
      >
        {isMiniCartOpen ? <X size={28} /> : <ShoppingCart size={28} />}
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-bold">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* ================= MİNİ SEPET PANELİ ================= */}
      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={() => setIsMiniCartOpen(false)} 
      />

      {/* ================= MOBILE MENU PANEL ================= */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300
          ${
            mobileOpen
              ? "opacity-100 visible bg-black/80 backdrop-blur-sm"
              : "opacity-0 invisible"
          }
        `}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 text-2xl font-semibold">

          {user && (
            <div className="flex flex-col items-center gap-2 mb-4 text-white">
              <User size={36} />
              <span className="text-sm opacity-80">{user.isim}</span>

              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold"
              >
                Hesabım
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="mt-2 flex items-center gap-2 text-red-400 text-sm font-semibold"
              >
                <LogOut size={18} />
                Çıkış Yap
              </button>
            </div>
          )}

          {[
            { to: "/", label: "Anasayfa" },
            { to: "/products", label: "Ürünler" },
            { to: "/about", label: "Hakkımızda" },
            { to: "/contact", label: "İletişim" },
            { to: "/references", label: "Referanslar" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="text-white"
            >
              {item.label}
            </Link>
          ))}

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-6 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold"
            >
              Giriş Yap
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;