import { useParams, useNavigate } from "react-router-dom";

const OrderFail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ⚠️ Ödeme Tamamlanamadı
        </h1>

        <p className="mb-3">
            Bir Sorun Var .. 
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Lütfen:
          <br />• Kartınızın <b>internet alışverişine açık</b> olduğundan,
          <br />• Kart limitinizin <b>yeterli</b> olduğundan,
          <br />• <b>3D Secure</b> onayını doğru verdiğinizden emin olun.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Sorun devam ederse bankanızla iletişime geçebilir
          veya işlemi tekrar deneyebilirsiniz.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/cart")}
            className="px-5 py-2 bg-gray-200 rounded"
          >
            Tekrar Dene
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Anasayfa
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFail;