import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* === ÜST GÖRSEL (KÜÇÜK & ŞIK) === */}
        <div className="h-56">
          <img
            src="https://res.cloudinary.com/diyibvvua/image/upload/v1765462385/WhatsApp_Image_2025-11-16_at_14.48.31_be2ory.jpg"
            alt="Alizone İklimlendirme"
            className="w-full h-full object-cover"
          />
        </div>

        {/* === FORM === */}
        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-1">
            Giriş Yap
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Alizone İklimlendirme hesabınıza giriş yapın
          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="E-posta adresiniz"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Şifreniz"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 text-white font-bold py-3 hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
          <p
  onClick={() => navigate("/forgot-password")}
  className="text-center text-sm text-emerald-600 font-semibold cursor-pointer hover:underline mt-4"
>
  Şifremi Unuttum
</p>

          <p className="text-center text-sm text-slate-500 mt-6">
            Hesabınız yok mu?{" "}
            <span
              className="text-emerald-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Kayıt Ol
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
