import axios from "axios";
import { logout } from "../app/slices/auth/authSlice";
import i18n from '../i18n';
import { generateToken } from "../Services/Security";
import { decryptJsonAesGcm, encryptJsonAesGcm } from "./encriptor";
 
export const baseURL = import.meta.env.VITE_API_BASE_URL;
const secret = import.meta.env.VITE_SECRET_KEY;
 
// Toggle encryption globally or per request
const ENABLE_E2E_ENCRYPTION = true;
 
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
 
    // Enable AES-256-GCM E2E for this request
    if (ENABLE_E2E_ENCRYPTION) {
      config.headers['x-enc'] = 'aes-256-gcm';
      // Only encrypt if we have a JSON body
      if (config.data && typeof config.data === 'object') {
        const encBody = await encryptJsonAesGcm(config.data);
        config.data = encBody;
      }
    }
 
    return config;
  },
  (error) => Promise.reject(error)
);
 
let isLoggingOut = false;
axiosInstance.interceptors.response.use(
  async (response) => {
    // Decrypt only if server returned the encrypted shape
    const data = response?.data;
    if (
      data &&
      typeof data === 'object' &&
      'ciphertext' in data &&
      'iv' in data &&
      'tag' in data
    ) {
      try {
        const decrypted = await decryptJsonAesGcm(data);
        response.data = decrypted;
      } catch (_) {
        // If decrypt fails, leave as-is so you can inspect
      }
    }
    return response;
  },
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