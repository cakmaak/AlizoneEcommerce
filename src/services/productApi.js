import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get(
    "/alizone/product/getalldtoproduct"
  );
  return response.data;
};
