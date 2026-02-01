import { useState } from "react";
import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await api.post(
  "/alizone/user/forgot-password",
  null,
  {
    params: { email },
  }
);
      setMessage("📩 Şifre sıfırlama maili gönderildi");
      setError("");
    } catch (err) {
      setError("Bu email bulunamadı");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Şifremi Unuttum
        </h2>

        {message && <p className="text-green-600 mb-3">{message}</p>}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-xl"
          />

          <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold">
            Mail Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;