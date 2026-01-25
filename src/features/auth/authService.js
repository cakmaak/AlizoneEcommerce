import api from "../../services/api";

// LOGIN
const login = async (credentials) => {
  const response = await api.post("/alizone/login", credentials);
  return response.data; // { token }
};

// REGISTER
const register = async (data) => {
  const response = await api.post("/alizone/user/signup", data);
  return response.data;
};


const authService = {
  login,
  register,
};

export default authService;