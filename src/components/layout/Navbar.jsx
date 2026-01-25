import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Snowflake,LogOut } from "lucide-react";
import { useSelector ,useDispatch} from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { fetchCart } from "../../features/cart/cartSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const handleLogout = () => {
  dispatch(logout());
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  useEffect(() => {
  dispatch(fetchCart());
}, [dispatch]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500
          ${
            isHome
              ? scrolled
                ? "bg-black/40 backdrop-blur-md"
                : "bg-black/20"
              : "bg-white shadow"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex items-center h-24">

        <Link to="/" className="z-10 flex items-center gap-2">
  <Snowflake
    className={`
      w-5 h-5
      ${isHome ? "text-emerald-400" : "text-emerald-500"}
    `}
  />
  <span
    className={`
      text-2xl md:text-3xl font-extrabold tracking-[0.25em]
      ${isHome ? "text-white" : "text-gray-900"}
    `}
  >
    ALİ<span className="text-emerald-400">ZONE</span>
  </span>
</Link>




            {/* MENU */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 font-semibold">
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
                  className={`transition hover:text-emerald-400 ${
                    isHome ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="ml-auto flex items-center gap-4 z-10">

              {/* CART */}
              <Link to="/cart" className="relative">
                <ShoppingCart
                  className={`w-7 h-7 ${
                    isHome ? "text-white" : "text-gray-800"
                  }`}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* USER */}
             {user ? (
  <div
    className={`hidden sm:flex items-center gap-4 ${
      isHome ? "text-white" : "text-gray-800"
    }`}
  >
    {/* PROFİL */}
    <Link to="/profile" className="flex items-center gap-2">
      <User className="w-5 h-5" />
      <span className="font-medium">{user.isim}</span>
    </Link>

    {/* ÇIKIŞ */}
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 text-sm font-semibold text-red-400 hover:text-red-500 transition"
    >
      <LogOut size={18} />
      Çıkış
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="hidden sm:inline-block px-5 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
  >
    Giriş Yap
  </Link>
)}

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden ${
                  isHome ? "text-white" : "text-gray-800"
                }`}
              >
                {mobileOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300
          ${
            mobileOpen
              ? "opacity-100 visible bg-black/80 backdrop-blur-sm"
              : "opacity-0 invisible"
          }
        `}
      >
       <nav className="flex flex-col items-center justify-center h-full gap-6 text-xl font-semibold">

  {/* USER INFO (MOBILE) */}
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

  {/* MENU LINKS */}
  {[
    { to: "/", label: "Anasayfa" },
    { to: "/products", label: "Ürünler" },
    { to: "/about", label: "Hakkımızda" },
    { to: "/contact", label: "İletişim" },
    { to: "/references", label: "Referanslar" }
  ].map((item) => (
    <Link
      key={item.to}
      onClick={() => setMobileOpen(false)}
      to={item.to}
      className="text-white"
    >
      {item.label}
    </Link>
  ))}

  {/* LOGIN (IF NOT LOGGED IN) */}
  {!user && (
    <Link
      onClick={() => setMobileOpen(false)}
      to="/login"
      className="mt-6 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold"
    >
      Login
    </Link>
  )}
</nav>
      </div>
    </>
  );
};

export default Navbar;
