
import api from "./api";

const addProduct = async (productData) => {
  const res = await api.post(
    "/alizone/adminpanel/addproduct",
    productData
  );
  return res.data;
};
const updatePrice = async (productId, price) => {
  const res = await api.put(
    `/alizone/adminpanel/updprice/${productId}`,
     price 
  );
  return res.data;
};
const setProductTeklif = async (productId) => {
  const res = await api.put(
    `/alizone/adminpanel/setteklifal/${productId}`
  );
  return res.data;
};
const updateImages = async (productId, images) => {
  const res = await api.put(
    `/alizone/adminpanel/updimage/${productId}`,
    images 
  );
  return res.data;
};
const updateStock = async (productId, stock) => {
  const res = await api.put(
    `/alizone/adminpanel/updstock/${productId}`,
    stock
  );
  return res.data;
};
const deliveredTruck = async (orderId, trackingNo) => {
  const res = await api.post(
    `/alizone/adminpanel/deliveredtruck/${orderId}`,
    trackingNo, 
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  return res.data;
};
const updateBtu = async (productId, btu) => {
  const res = await api.put(
    `/alizone/adminpanel/updatebtu/${productId}`,
    btu 
  );
  return res.data;
};
const getProducts = async () => {
  const res = await api.get("/alizone/adminpanel/getproducts");
  return res.data;
};
const getOrders = async () => {
  const res = await api.get("/alizone/adminpanel/getorders");
  return res.data;
};
const startRefund = async (orderId) => {
  const res = await api.post(`/alizone/adminpanel/refund/${orderId}`);
  return res.data;
};

const adminProductService = {
  addProduct,
  updatePrice,
  updateImages,
  updateStock,
  deliveredTruck,
  updateBtu,
  getProducts,
  getOrders,
  startRefund,
  setProductTeklif
};


export default adminProductService;

