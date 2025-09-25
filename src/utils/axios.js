import axios from "axios";
import { logout } from "../app/slices/auth/authSlice";
import i18n from "../i18n";
import { generateToken } from "../Services/Security";
import cryptoUtils from "./cryptoUtils";

export const baseURL = import.meta.env.VITE_API_BASE_URL;
const secret = import.meta.env.VITE_SECRET_KEY;
 
// Toggle encryption globally or per request
const ENABLE_E2E_ENCRYPTION = true;
 
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "X-Encrypt-Response": "true", // Request encrypted responses
  },
});
 
let reduxStore = null;
export const setAxiosStore = (storeInstance) => {
  reduxStore = storeInstance;
};

// Request interceptor for encryption
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const payload = { data: "SecurityPayload", time: Date.now() };

    // Add security token
    if (secret) {
      let secrets = await generateToken(secret, payload);
      config.headers["X-Auth-Token"] = secrets;
    }

    // Add JWT token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Add language header
    const lang = localStorage.getItem("lang") || i18n.language || "en";
    config.headers["Accept-Language"] = lang;

    // Encrypt request data if needed
    if (
      config.data &&
      cryptoUtils.shouldEncrypt(config.data, config.headers["Content-Type"])
    ) {
      try {
        const encryptedData = cryptoUtils.encrypt(config.data);
        config.data = { encryptedData };
        config.headers["X-Encrypted"] = "true";
        config.headers["X-Encryption-Method"] = "AES-256-CBC";
        console.log("Request encrypted successfully");
      } catch (error) {
        console.error("Failed to encrypt request data:", error);
        // Continue with unencrypted data if encryption fails
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
 
let isLoggingOut = false;

// Response interceptor for decryption
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response headers:", response.headers);
    console.log("Raw response data:", response.data);

    // Check for encrypted response (case-insensitive header check)

    if (response.data?.encryptedData) {
      console.log("innnini");
      try {
        console.log("Decrypting response data...");
        const decryptedData = cryptoUtils.decrypt(response.data.encryptedData);
        console.log("Response decrypted successfully:", decryptedData);
        response.data = decryptedData;
      } catch (error) {
        console.error("Failed to decrypt response data:", error);
        console.error("Encrypted data was:", response.data.encryptedData);
        // Return original response if decryption fails
      }
    } else {
      console.warn("Response marked as encrypted but no encryptedData found");
      console.log("Response data structure:", Object.keys(response.data || {}));
    }

    return response;
  },
  (error) => {
    console.log("Error response headers:", error.response?.headers);
    console.log("Raw error response data:", error.response?.data);

    // Handle encrypted error responses (case-insensitive header check)
    const isEncrypted =
      error.response?.headers["x-encrypted"] === "true" ||
      error.response?.headers["X-Encrypted"] === "true";

    if (isEncrypted && error.response?.data?.encryptedData) {
      try {
        console.log("Decrypting error response data...");
        const decryptedError = cryptoUtils.decrypt(
          error.response.data.encryptedData
        );
        console.log("Error response decrypted successfully:", decryptedError);
        error.response.data = decryptedError;
      } catch (decryptError) {
        console.error("Failed to decrypt error response:", decryptError);
        console.error(
          "Encrypted error data was:",
          error.response.data.encryptedData
        );
      }
    } else if (isEncrypted) {
      console.warn(
        "Error response marked as encrypted but no encryptedData found"
      );
    }

    // Handle 401 errors
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