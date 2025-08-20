import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { setAxiosStore } from "./utils/axios.js";
import { store } from "./app/slices/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS!
import "@emran-alhaddad/saudi-riyal-font/index.css";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
setAxiosStore(store);

const firebaseConfig = {
  apiKey: "AIzaSyAr6qxfWZaQ6-9Xq_2qLoYHR-uFA7A6eZc",
  authDomain: "stagingprime.firebaseapp.com",
  projectId: "stagingprime",
  storageBucket: "stagingprime.firebasestorage.app",
  messagingSenderId: "408870663796",
  appId: "1:408870663796:web:bb28b8cded171d1f4bc321",
  measurementId: "G-R273JZNFD2",
};

// Define the function globally
window.appLoginData = function (authToken, language, userData, deviceType) {
  console.log("Callback from App:", authToken, language, userData, deviceType);
  // Store values in localStorage or state management
  if (authToken) {
    localStorage.setItem("token", authToken);
  }
  if (deviceType) {
    localStorage.setItem("deviceType", deviceType);
  }
  if (language) {
    localStorage.setItem("lang", language);
  }
  if (userData) {
    localStorage.setItem("user", userData);
  }

  // (Optional) trigger a custom event so React components can update
  window.dispatchEvent(new Event("appLoginDataReceived"));
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Check if service worker is already registered
navigator.serviceWorker.getRegistrations().then((registrations) => {
  const existingRegistration = registrations.find(
    (reg) =>
      reg.scope.includes("/firebase-messaging-sw.js") ||
      reg.active?.scriptURL.includes("/firebase-messaging-sw.js")
  );

  if (existingRegistration) {
    console.log("Service Worker already registered:", existingRegistration);
    // Use existing registration for FCM token
    handleFCMToken(existingRegistration);
  } else {
    // Register new service worker only if not already registered
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("New Service Worker registered:", registration);
        handleFCMToken(registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
});

function handleFCMToken(registration) {
  // Request permission
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          "BA1GZo6MbvoJ3c4SCPNUOKx3rjFg1NU9YdqeblxYAxx3Sbd18nRpTl507rFcjQpoAoqW_XOioM7q-Qf47y0H4WI",
        serviceWorkerRegistration: registration,
      })
        .then((token) => {
          console.log("FCM Token:", token);
          // Send this token to your backend
        })
        .catch((error) => {
          console.error("Error getting FCM token:", error);
        });
    } else {
      console.log("Notification permission denied");
    }
  });
}

createRoot(document.getElementById("root")).render(
  // <StrictMode> // StrictMode is often helpful for development, consider re-enabling
  <Provider store={store}>
    <ToastContainer
      position="top-right" // Common position
      autoClose={2000} // Set toast duration to 2000 milliseconds (2 seconds)
      hideProgressBar={false} // Show a progress bar
      newestOnTop={false} // Newer toasts appear at the bottom
      closeOnClick // Close toast on click
      rtl={false} // Left-to-right text
      pauseOnFocusLoss // Pause autoClose when window loses focus
      draggable // Allow dragging to dismiss
      pauseOnHover // Pause autoClose on hover
      theme="light" // Light theme for toasts
    />
    <svg
      width="0"
      height="0"
      viewBox="0 0 400 72"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute" }}
    >
      <defs>
        <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
          <path
            transform="scale(0.0025, 0.0138889)"
            d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
          />
        </clipPath>
      </defs>
    </svg>
    <App />
  </Provider>
  // </StrictMode>
);
