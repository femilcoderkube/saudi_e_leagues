import axios from "axios";
import { logout } from "../app/slices/auth/authSlice";
import i18n from '../i18n';
import { generateToken } from "../Services/Security";

export const baseURL = import.meta.env.VITE_API_BASE_URL;
const secret = import.meta.env.VITE_SECRET_KEY;

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
  async (config) => {
    const token = localStorage.getItem("token");
    const payload = { data: "SecurityPayload", time: Date.now() };

    if (secret) {
      let secrets = await generateToken(secret, payload);
      config.headers["X-Auth-Token"] = secrets;
    }

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

let isLoggingOut = false;
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!isLoggingOut) {
        isLoggingOut = true;
        if (reduxStore) {
          reduxStore.dispatch(logout());
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
