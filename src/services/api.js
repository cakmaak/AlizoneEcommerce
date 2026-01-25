import axios from "axios";
import { store } from "../app/store"; 
import { startLoading, stopLoading } from "../features/ui/uiSlice";

const api = axios.create({
  baseURL: "https://alizone-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const isPublic =
      config.url.includes("/alizone/login") ||
      config.url.includes("/alizone/user/signup") ||
      config.url.includes("/alizone/product/getalldtoproduct")||
      config.url.includes("/alizone/user/reset-password") ||
     config.url.includes("/alizone/user/forgot-password");

    if (!isPublic) {
      const token = localStorage.getItem("token");

      if (!token) {
        return Promise.reject({ message: "Token yok, giriş yapın" });
      }

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