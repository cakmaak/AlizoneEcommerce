import api from "./api";

let guestId = sessionStorage.getItem("guestId");
if (!guestId) {
  guestId = crypto.randomUUID(); 
  sessionStorage.setItem("guestId", guestId);
}

// ➕ Sepete ekle
export const addToCart = async ({ productId, quantity }) => {
  const response = await api.post("/alizone/savebasketitem", {
    productId,
    quantity,
    guestId
  });
  return response.data;
};

// 📦 Sepeti getir
export const getCart = async () => {
  let guestId = sessionStorage.getItem("guestId");
  const response = await api.get("/alizone/getbasket", { params: { guestId } });
  return response.data;
};

// ❌ Sepetten sil (soft delete)
export const removeFromCart = async (basketItemId) => {
  const guestId = sessionStorage.getItem("guestId");

  await api.delete(`/alizone/deleteitem/${basketItemId}`, {
    params: { guestId },
  });
};

// 🔁 Adet güncelle
// cartService.js (veya api.js içindeki o kısım)
export const setCartQuantity = async ({ basketItemId, quantity }) => {
  const token = localStorage.getItem("token");
  const guestId = sessionStorage.getItem("guestId");
  const finalGuestId = token ? "" : (guestId || "no-id");

  // URL'i oluştur
  const url = `/alizone/setquantity/${basketItemId}?guestId=${finalGuestId}`;

  // BODY: Eğer backend sadece bir sayı bekliyorsa düz quantity gönder, 
  // ama JSON olarak gitmesi için interceptor'ın varsayılanını kullanalım.
  const response = await api.put(url, quantity); 
  
  // EĞER yukarıdaki 400/500 verirse, backend bir nesne bekliyor demektir:
  // const response = await api.put(url, { quantity: quantity }); 

  return response.data;
};