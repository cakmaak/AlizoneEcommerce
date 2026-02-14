import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/authSlice";
import {Snowflake} from "lucide-react";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    isim: "",
    soyisim: "",
    telno: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const [strength, setStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
  });

  const [localError, setLocalError] = useState(null);

  const checkPasswordStrength = (pwd) => {
    setStrength({
      minLength: pwd.length >= 6,
      hasUppercase: /[A-Z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setLocalError(null);

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.passwordAgain) {
      setLocalError("❌ Şifreler eşleşmiyor");
      return;
    }

    if (!strength.minLength || !strength.hasUppercase || !strength.hasNumber) {
      setLocalError("❌ Şifre kurallarına uymuyor");
      return;
    }

    if (!kvkkAccepted) {
  alert("KVKK metnini kabul etmelisiniz");
  return;
}

  



    const payload = { ...form,kvkkAccepted };
    dispatch(registerUser(payload))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => setLocalError(err || "Kayıt yapılamadı"));
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

  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden p-6">
    <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
      Hesap Oluştur
    </h2>

    {(localError || error) && (
      <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-lg text-sm text-center">
        {localError || error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-3">
      {["isim", "soyisim", "telno", "email"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field === "telno" ? "Telefon" : field.charAt(0).toUpperCase() + field.slice(1)}
          type={field === "email" ? "email" : "text"}
          value={form[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          
        />
        
      ))}

      <input
        name="password"
        type="password"
        placeholder="Şifre"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
      />
      <input
        name="passwordAgain"
        type="password"
        placeholder="Şifre Tekrar"
        value={form.passwordAgain}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
      />

      <div className="text-xs mb-2">
        <p className={strength.minLength ? "text-green-600" : "text-red-600"}>• En az 6 karakter</p>
        <p className={strength.hasUppercase ? "text-green-600" : "text-red-600"}>• En az 1 büyük harf</p>
        <p className={strength.hasNumber ? "text-green-600" : "text-red-600"}>• En az 1 rakam</p>
      </div>
        <label className="flex gap-2 mt-3">
  <input
    type="checkbox"
    checked={kvkkAccepted}
    onChange={(e) => setKvkkAccepted(e.target.checked)}
  />
  KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum
</label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold hover:bg-emerald-700 text-sm"
      >
        {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
      </button>
    </form>

    <p className="text-center text-gray-500 text-xs mt-4">
      Zaten hesabın var mı?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-emerald-600 font-semibold cursor-pointer hover:underline"
      >
        Giriş Yap
      </span>
    </p>
  </div>
</div>
  );
};

export default Register;