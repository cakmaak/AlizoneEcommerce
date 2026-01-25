import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../features/address/addressSlice";
import { Plus, MapPin, Phone, User, Building2, FileText, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddressList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );

  const handleAddAddress = () => navigate("/addresses/new");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Başlık Bölümü */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Adreslerim</h1>
              <p className="text-gray-600 mt-1">{items.length} kayıtlı adres</p>
            </div>
          </div>
          <button
            onClick={handleAddAddress}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Yeni Adres Ekle
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-96 bg-white rounded-3xl shadow-xl border-2 border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Henüz Adres Yok</h2>
            <p className="text-gray-500 text-lg mb-6">İlk adresinizi ekleyerek başlayın</p>
            <button
              onClick={handleAddAddress}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Adres Ekle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {items.map((address) => (
              <div
                key={address.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 group"
              >
                {/* Üst Kısım - Kişi Bilgileri */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {address.aliciAdiSoyadi}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-gray-700">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{address.telefon}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orta Kısım - Adres Detayları */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium leading-relaxed">{address.adresSatir1}</p>
                      {address.adresSatir2 && (
                        <p className="text-gray-700 mt-1 leading-relaxed">{address.adresSatir2}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">{address.ilce}</span>
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold">{address.sehir}</span>
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">{address.ulke}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alt Kısım - Fatura Bilgileri */}
                {(address.faturaTipi || address.faturaAdiSoyadi || address.tcKimlikNo || address.firmaAdi || address.vergiNo) && (
                  <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-50 border-t-2 border-gray-100">
                    <div className="flex items-start gap-3">
                      {address.faturaTipi === "BIREYSEL" ? (
                        <>
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Bireysel Fatura</p>
                            <p className="text-sm font-semibold text-gray-900">{address.faturaAdiSoyadi}</p>
                            <p className="text-xs text-gray-600 mt-1">TC: {address.tcKimlikNo}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Kurumsal Fatura</p>
                            <p className="text-sm font-semibold text-gray-900">{address.firmaAdi}</p>
                            <p className="text-xs text-gray-600 mt-1">Vergi No: {address.vergiNo}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
