

import api from "./api";

// ➕ Sepete ekle
export const addToCart = async ({ productId, quantity }) => {
  const response = await api.post("/alizone/savebasketitem", {
    productId,
    quantity,
  });
  return response.data;
};

// 📦 Sepeti getir
export const getCart = async () => {
  console.log("GET CART API CALLED");
  const response = await api.get("/alizone/getbasket");
  console.log("GET CART RESPONSE:", response.data);
  return response.data;
};

// ❌ Sepetten sil (soft delete)
export const removeFromCart = async (basketItemId) => {
  await api.delete(`/alizone/deleteitem/${basketItemId}`);
};

// 🔁 Adet güncelle
export const setCartQuantity = async ({ basketItemId, quantity }) => {
  await api.put(`/alizone/setquantity/${basketItemId}`, quantity, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
