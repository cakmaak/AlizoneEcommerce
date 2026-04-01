import axios from "axios";
import { store } from "../app/store"; 
import { startLoading, stopLoading } from "../features/ui/uiSlice";

const api = axios.create({
  baseURL: "https://api.alizoneklima.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Eğer token varsa, her isteğe ekle (Backend artık optional auth destekliyor)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoading());
    return response;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

export default api;