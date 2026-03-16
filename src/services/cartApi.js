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
export const setCartQuantity = async ({ basketItemId, quantity }) => {
  const guestId = sessionStorage.getItem("guestId"); // guestId al
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
