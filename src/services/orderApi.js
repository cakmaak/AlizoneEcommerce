import axios from "axios";

export const createOrder = async ({ addressId, contractsAccepted }) => {
  try {
    const token = localStorage.getItem("token"); // auth varsa
    const response = await axios.post(
      "https://alizone-production.up.railway.app/alizone/createorder",
      { addressId, contractsAccepted }, // <-- buraya contractsAccepted ekledik
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
    `https://alizone-production.up.railway.app/alizone/${orderId}/cancel`,
    {
      orderId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};