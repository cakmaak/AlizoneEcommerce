import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Eye, EyeOff, Snowflake } from "lucide-react";

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

    // Şifre eşleşiyor mu
    if (password !== confirmPassword) {
      setError("❌ Şifreler uyuşmuyor");
      return;
    }

    // Minimum 6 karakter ve güçlü şifre kontrolü
    const strongPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!strongPassword.test(password)) {
      setError("❌ Şifre en az 6 karakter, 1 büyük harf ve 1 rakam içermeli");
      return;
    }

    try {
      await api.post("/alizone/user/reset-password", null, {
        params: { token, newPassword: password },
      });
      setMessage("✅ Şifre başarıyla güncellendi");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("❌ Token geçersiz veya süresi dolmuş");
    }
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
          Yeni Şifre Belirle
        </h2>

        {message && <p className="text-green-600 mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Şifre */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-xl pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Şifre Tekrar */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Yeni şifre (tekrar)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="text-xs mb-2">
            <p>• En az 6 karakter, 1 büyük harf ve 1 rakam</p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-2 rounded-xl font-semibold text-sm"
          >
            Şifreyi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;