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
setAxiosStore(store);

// Register Firebase Messaging service worker for FCM push notifications
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Firebase Messaging Service Worker registered:', registration);
//       })
//       .catch(function(err) {
//         console.log('Service Worker registration failed:', err);
//       });
//   });
// }

// main.tsx or index.tsx

// Define the function globally
window.appLoginData = function (authToken, language, userData,deviceType) {
  console.log("Callback from App:", authToken, language, userData ,deviceType);
  // Store values in localStorage or state management
  if (authToken) {
    localStorage.setItem("token", authToken);
  }
  if(deviceType){
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

const permission = await Notification.requestPermission();
console.log("asfdsadfsd", permission);
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((reg) => {
      console.log("Service Worker registered", reg);
    })
    .catch((err) => console.error("SW registration failed", err));
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
