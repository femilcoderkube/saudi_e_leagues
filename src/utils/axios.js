import axios from "axios";
import { logout } from "../app/slices/auth/authSlice";
import i18n from '../i18n';

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

let reduxStore = null;
export const setAxiosStore = (storeInstance) => {
  reduxStore = storeInstance;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const lang = localStorage.getItem('lang') || i18n.language || 'en';
    config.headers['Accept-Language'] = lang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("401 detected, logging out...");
      if (reduxStore) {
        reduxStore.dispatch(logout());
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally, force reload or redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
