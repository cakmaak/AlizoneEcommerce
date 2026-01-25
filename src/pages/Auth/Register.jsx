import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/authSlice";
import { showToast } from "../../components/ui/showToast";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    isim: "",
    soyisim: "",
    telno: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError(null);
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (form.password !== form.passwordAgain) {
    setLocalError("Şifreler eşleşmiyor");
    return;
  }

  const payload = {
    isim: form.isim,
    soyisim: form.soyisim,
    telno: form.telno,
    email: form.email,
    password: form.password,
  };

  dispatch(registerUser(payload))
  .then((res) => {
    console.log("REGISTER RES:", res);
    alert("Kayıt başarıyla gerçekleşti!");
    navigate("/login");
  })
  .catch((err) => {
    console.error("REGISTER ERR:", err);
    setLocalError(err || "Kayıt yapılamadı");
  });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        {/* IMAGE */}
       <div className="h-56">
          <img
            src="https://res.cloudinary.com/diyibvvua/image/upload/v1765462385/WhatsApp_Image_2025-11-16_at_14.48.31_be2ory.jpg"
            alt="Alizone İklimlendirme"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-extrabold text-center mb-6">
          Alizone Kayıt Ol
        </h2>

        {(localError || error) && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-sm">
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="isim"
            placeholder="Ad"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            name="soyisim"
            placeholder="Soyad"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            name="telno"
            placeholder="Telefon"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            type="email"
            name="email"
            placeholder="E-posta"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            type="password"
            name="password"
            placeholder="Şifre"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            type="password"
            name="passwordAgain"
            placeholder="Şifre Tekrar"
            required
            onChange={handleChange}
            className="input"
          />

          <button
  type="submit"
  disabled={isLoading}
  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
>
  {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
</button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
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
