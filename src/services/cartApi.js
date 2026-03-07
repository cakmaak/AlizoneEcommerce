import api from "./api";

let guestId = localStorage.getItem("guestId");
if (!guestId) {
  guestId = crypto.randomUUID(); 
  localStorage.setItem("guestId", guestId);
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
  let guestId = localStorage.getItem("guestId");
  const response = await api.get("/alizone/getbasket", { params: { guestId } });
  return response.data;
};

// ❌ Sepetten sil (soft delete)
export const removeFromCart = async (basketItemId) => {
  const guestId = localStorage.getItem("guestId");

  await api.delete(`/alizone/deleteitem/${basketItemId}`, {
    params: { guestId },
  });
};

// 🔁 Adet güncelle
export const setCartQuantity = async ({ basketItemId, quantity }) => {
  const guestId = localStorage.getItem("guestId"); // guestId al
  const response = await api.put(
    `/alizone/setquantity/${basketItemId}?guestId=${guestId}`, // query param olarak ekle
    quantity, // body'de sadece adet
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
