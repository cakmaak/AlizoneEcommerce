import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❌ Şifreler uyuşmuyor");
      return;
    }

    if (password.length < 6) {
      setError("❌ Şifre en az 6 karakter olmalı");
      return;
    }

    try {
      await api.post(
        `/alizone/user/reset-password?token=${token}&newPassword=${encodeURIComponent(
          password
        )}`
      );

      setMessage("✅ Şifre başarıyla güncellendi");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("❌ Token geçersiz veya süresi dolmuş");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow w-full max-w-md overflow-hidden">

        {/* 🔥 ÜST GÖRSEL */}
        <div className="h-56">
          <img
            src="https://res.cloudinary.com/diyibvvua/image/upload/v1765462385/WhatsApp_Image_2025-11-16_at_14.48.31_be2ory.jpg"
            alt="Alizone İklimlendirme"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Yeni Şifre Belirle
          </h2>

          {message && <p className="text-green-600 mb-3">{message}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ŞİFRE */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Yeni şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* ŞİFRE TEKRAR */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni şifre (tekrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-xl"
            />

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-xl font-semibold">
              Şifreyi Güncelle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;