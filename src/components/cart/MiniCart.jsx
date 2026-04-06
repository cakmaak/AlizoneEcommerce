import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { fetchCart, deleteCartItem, updateCartQuantity } from "../../features/cart/cartSlice";
import { useEffect } from "react"; 

const MiniCart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [] } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth?.user);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.fiyat) * Number(item.adet),
    0
  );
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCart());
    }
  }, [isOpen, user, dispatch])

  const handleQuantity = async (e, item, newQty) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQty < 1) return;
    dispatch(updateCartQuantity({ basketItemId: item.basketItemId, adet: newQty }))
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => console.error(err));
  };

  if (!isOpen) return null;

  return (
    /* MOBİL DÜZENLEME: 
       - right-2: Mobilde sağa daha yakın durur.
       - sm:right-6: Masaüstünde biraz daha içeride durur.
       - max-w-[90vw]: Ekranın dışına taşmasını önler.
    */
    <div className="fixed top-20 right-2 sm:right-6 w-[280px] sm:w-[340px] max-w-[92vw] h-auto max-h-[70vh] bg-white rounded-[2rem] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 z-[999999] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 p-1.5 rounded-lg">
            <ShoppingBag size={14} className="text-emerald-500" />
          </div>
          <span className="font-black text-gray-800 text-[11px] uppercase tracking-wider">Sepetim</span>
        </div>
        
        {/* 🔥 X BUTONU: Tıklama alanını (padding) artırdım ve cursor-pointer ekledim */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose(); 
          }}
          className="p-2 -mr-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-red-500 active:scale-90 cursor-pointer"
        >
          <X size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Ürün Listesi: Ürün eklendikçe uzayan kısım */}
      <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-[10px] font-bold">
            Sepetiniz boş.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.basketItemId} className="flex gap-2 p-2 rounded-2xl bg-gray-50/50 border border-gray-100/50">
              <img 
                src={item.imageUrl?.[0] || "/placeholder.png"} 
                className="w-10 h-10 object-contain rounded-lg bg-white border border-gray-100"
                alt=""
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-bold text-gray-700 truncate">{item.productIsim}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-emerald-600 font-black text-[10px]">{item.fiyat?.toLocaleString()} ₺</span>
                  
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-1 py-0.5">
                    <button onClick={(e) => handleQuantity(e, item, item.adet - 1)} className="text-gray-400 hover:text-red-500"><Minus size={10} /></button>
                    <span className="text-[10px] font-black w-3 text-center">{item.adet}</span>
                    <button onClick={(e) => handleQuantity(e, item, item.adet + 1)} className="text-emerald-500 hover:text-emerald-700"><Plus size={10} /></button>
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); dispatch(deleteCartItem(item.basketItemId)); }}
                className="p-1 text-gray-300 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] text-gray-400 font-black uppercase">Toplam</span>
            <span className="text-base font-black text-emerald-600">{totalPrice.toLocaleString()} ₺</span>
          </div>
          <button 
            onClick={() => { navigate("/cart"); onClose(); }}
            className="w-full py-3 rounded-xl bg-emerald-500 text-white font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            Ödeme Adımına Geç
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCart;