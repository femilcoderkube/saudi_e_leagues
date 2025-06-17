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

setAxiosStore(store);

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
    <App />
  </Provider>
  // </StrictMode>
);
