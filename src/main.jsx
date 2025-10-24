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
import "react-toastify/dist/ReactToastify.css";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import MobileEvent from "./hooks/mobileevents.js";

setAxiosStore(store);
MobileEvent.onLogin();

// Hide loading fallback and render app
const rootElement = document.getElementById("root");
const loadingFallback = document.getElementById("loading-fallback");

// Render the app
const root = createRoot(rootElement);
root.render(
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
);

// Hide loading fallback after React app renders
if (loadingFallback) {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    loadingFallback.style.opacity = "0";
    loadingFallback.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => {
      loadingFallback.style.display = "none";
    }, 300);
  }, 100);
}
