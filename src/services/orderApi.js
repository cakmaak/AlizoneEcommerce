import axios from "axios";


export const createOrder = async ({ addressId, contractsAccepted }) => {
  try {
    const token = localStorage.getItem("token");
    const guestId = sessionStorage.getItem("guestId");
    const response = await axios.post(
      "https://api.alizoneklima.com/alizone/createorder",
      { addressId, contractsAccepted,guestId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (err) {
    console.error("Sipariş oluşturulamadı:", err);
    throw err;
  }
};
export const cancelOrderApi = async (orderId) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `https://api.alizoneklima.com/alizone/${orderId}/cancel`, 
    null, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};