import { useEffect, useState } from "react";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../features/address/addressSlice";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../../features/order/orderSlice";
import Toast from "../../components/ui/Toast";
import {
  User,
  MapPin,
  Pencil,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Home,
  XCircle,
  Plus,
} from "lucide-react";



/* === ENUM FIX === */
const normalizeStatus = (status) =>
  status
    ?.toUpperCase()
    .replace("İ", "I")
    .replace("Ş", "S")
    .replace("Ğ", "G")
    .replace("Ü", "U")
    .replace("Ö", "O")
    .replace("Ç", "C");

const formatOrderDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* === STATUS MAP === */
const orderStatusMap = {
  PENDING: {
    label: "Ödeme Bekleniyor",
    desc: "Ödemeniz henüz alınmadı.",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    iconColor: "text-amber-600",
    icon: Clock,
  },
  PAID: {
    label: "Sipariş Onaylandı",
    desc: "Siparişiniz hazırlanıyor.",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    iconColor: "text-indigo-600",
    icon: CheckCircle,
  },
  SHIPPED: {
    label: "Kargoya Verildi",
    desc: "Siparişiniz kargoya teslim edildi.",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    iconColor: "text-violet-600",
    icon: Truck,
  },
  DELIVERED: {
    label: "Teslim Edildi",
    desc: "Siparişiniz başarıyla teslim edildi.",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconColor: "text-emerald-600",
    icon: Home,
  },
  CANCELLED: {
    label: "İptal Edildi",
    desc: "Siparişiniz iptal edilmiştir.",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    iconColor: "text-rose-600",
    icon: XCircle,
  },
  REFUND_PENDING: {
  label: "İade Sürecinde",
  desc: "İade işlemi bankada devam ediyor.",
  badge: "bg-orange-100 text-orange-800 border-orange-200",
  iconColor: "text-orange-600",
  icon: Clock,
},
REFUNDED: {
  label: "İade Tamamlandı",
  desc: "Ücret hesabınıza iade edildi.",
  badge: "bg-green-100 text-green-800 border-green-200",
  iconColor: "text-green-600",
  icon: CheckCircle,
},
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((s) => s.address.items || []);

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [refundModal, setRefundModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [refundToastShown, setRefundToastShown] = useState(false);

  useEffect(() => {
    api.get("/alizone/getprofile").then((res) => setProfile(res.data));
    api.get("/alizone/my-orders").then((res) => setOrders(res.data || []));
    dispatch(fetchAddresses());
  }, [dispatch]);
 
useEffect(() => {
  const hasRefundPending = orders.some(
    (o) => normalizeStatus(o.status) === "REFUND_PENDING"
  );

  if (!hasRefundPending) return;

  const interval = setInterval(() => {
    api.get("/alizone/my-orders").then((res) => {
      setOrders(res.data || []);
    });
  }, 30000);

  return () => clearInterval(interval);
}, [orders]);
  const handleCancelOrder = async (orderId) => {
  if (!window.confirm("Siparişi iptal etmek istediğine emin misin?")) return;

  try {
    await dispatch(cancelOrder(orderId)).unwrap();

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, status: "REFUND_PENDING" }
          : o
      )
    );

    setToast({
      type: "success",
      message:
        "Sipariş iptal edildi. İade süreci başlatıldı (1–3 iş günü).",
    });
  } catch (err) {
    setToast({
      type: "error",
      message: err || "Sipariş iptal edilemedi",
    });
  }
};

  if (!profile) return null;

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto
  px-4 sm:px-6
  pt-24 sm:pt-28 md:pt-32 lg:pt-36
  py-6 sm:py-8
  space-y-5 sm:space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Hesabım
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Profil, adres ve siparişlerinizi yönetin
        </p>
      </div>

      {/* PROFİL */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6 md:p-4 border border-emerald-100 flex gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 border">
          <User size={22} />
        </div>

        <div className="flex-1">
          <h2 className="text-lg sm:text-xl md:text-lg font-bold text-slate-800">
            {profile.isim} {profile.soyisim}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">{profile.email}</p>
          <p className="text-xs sm:text-sm text-slate-600">{profile.telno}</p>
        </div>

        <span className="h-fit px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
          Aktif
        </span>
      </section>

      {/* SİPARİŞLER */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-xl font-bold flex items-center gap-2">
          <Package size={20} className="text-emerald-600" />
          Siparişlerim
        </h2>

        {[...orders]
          .sort((a, b) => new Date(b.tarih) - new Date(a.tarih))
          .map((order) => {
            const statusKey = normalizeStatus(order.status);
            const status =
  orderStatusMap[statusKey] || orderStatusMap.PENDING;

const StatusIcon = status.icon;

            return (
              <details
                key={order.orderId}
                className="bg-white rounded-xl p-4 md:p-3 border shadow-sm"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500 text-white">
                        <Package size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {formatOrderDate(order.tarih)}
                        </p>
                        <p className="text-xs">Sipariş Id: #{order.orderId}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(order.tarih).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${status.badge}`}
                    >
                      <StatusIcon size={14} className="inline mr-1" />
                      {status.label}
                    </span>
                  </div>
                </summary>

                <div className="mt-4 space-y-3">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg"
                    >
                      <img
                        src={item.imageUrl || "/placeholder.png"}
                        alt={item["ürünismi"]}
                        className="w-14 h-14 object-contain"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">
                          {item["ürünismi"]}
                        </p>
                        <p className="text-xs text-slate-500">
                          Adet: {item.adet}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-emerald-600">
                        ₺{(item.fiyat * item.adet).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between font-semibold text-sm">
                    <span>Toplam</span>
                    <span className="text-emerald-700">
                      ₺{order.toplamTutar.toLocaleString("tr-TR")}
                    </span>
                  </div>
                  {(statusKey === "REFUND_PENDING" || statusKey === "REFUNDED") && (
  <button
    onClick={() => setRefundModal(order)}
    className="w-full mt-2 text-sm text-indigo-600 hover:underline"
  >
    İade Detayını Gör
  </button>
)}
                {(statusKey === "PENDING" || statusKey === "PAID") && (
  <button
    onClick={() => handleCancelOrder(order.orderId)}
    className="mt-3 w-full px-4 py-2 text-sm rounded-lg
    bg-rose-500 text-white hover:bg-rose-600 transition"
  >
    Siparişi İptal Et
  </button>
)}
                </div>
              </details>
            );
          })}
      </section>

      {/* ADRESLER */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl md:text-xl font-bold flex items-center gap-2">
            <MapPin size={20} className="text-emerald-600" />
            Adreslerim
          </h2>

          <button
            onClick={() => navigate("/addresses/add")}
            className="px-4 py-2 text-sm rounded-lg bg-emerald-500 text-white flex items-center gap-1"
          >
            <Plus size={14} />
            Yeni Adres
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-4 rounded-xl border shadow-sm"
            >
              <div className="flex justify-between">
                <p className="text-sm font-semibold">
                  {addr.adresSatir1}
                </p>
                <button
                  onClick={() => navigate(`/addresses/edit/${addr.id}`)}
                  className="text-indigo-600"
                >
                  <Pencil size={14} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {addr.ilce} / {addr.sehir}
              </p>
            </div>
          ))}
        </div>
        {refundModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h3 className="text-lg font-bold mb-3">İade Detayı</h3>

      <div className="text-sm space-y-2">
        <p>
          <b>Sipariş No:</b> {refundModal.orderId}
        </p>
        <p>
          <b>Toplam Tutar:</b> ₺
          {refundModal.toplamTutar.toLocaleString("tr-TR")}
        </p>
       <p>
  <b>Durum:</b>{" "}
  {normalizeStatus(refundModal.status) === "REFUND_PENDING"
    ? "Bankada işlemde"
    : "İade tamamlandı"}
</p>

{normalizeStatus(refundModal.status) === "REFUND_PENDING" ? (
  <p className="text-xs text-slate-500 mt-2">
    İade işlemi bankada devam ediyor. 1–3 iş günü sürebilir.
  </p>
) : (
  <p className="text-xs text-emerald-600 mt-2">
    İade tutarı hesabınıza başarıyla aktarılmıştır.
  </p>
)}
       
      </div>

      <button
        onClick={() => setRefundModal(null)}
        className="mt-4 w-full px-4 py-2 rounded-lg bg-emerald-500 text-white"
      >
        Kapat
      </button>
    </div>
  </div>
)}
      </section>
      {toast && (
  <Toast
    type={toast.type}
    message={toast.message}
    onClose={() => setToast(null)}
  />
)}
    </div>
    
  );
};

export default Profile;