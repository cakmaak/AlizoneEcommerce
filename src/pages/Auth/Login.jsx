import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";
import { Snowflake } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-36">
      {/* ÜST LOGO */}
      <div className="flex items-center mb-6">
        <Snowflake className="w-4 h-4 text-emerald-400 mr-2" />
        <span className="text-2xl font-extrabold tracking-[0.15em]">
          ALİ<span className="text-emerald-400">ZONE</span>
        </span>
      </div>

      {/* FORM KONTEYNER */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
          Giriş Yap
        </h2>
        <p className="text-xs text-gray-500 text-center mb-4">
          Alizone İklimlendirme hesabınıza giriş yapın
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="E-posta adresiniz"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Şifreniz"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 text-white font-bold py-2 text-sm hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-sm text-emerald-600 font-semibold cursor-pointer hover:underline mt-3"
        >
          Şifremi Unuttum
        </p>

        <p className="text-center text-xs text-gray-500 mt-4">
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
  );
};

export default Login;