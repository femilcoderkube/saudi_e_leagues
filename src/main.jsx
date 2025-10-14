import { createRoot } from "react-dom/client";
import "./index.css"; // Your global CSS
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

// Function to apply conditional CSS and return a Promise
const applyConditionalCSS = () => {
  return new Promise((resolve) => {
    const path = window.location.pathname; // e.g., "/prime" or "/saude"
    if (path === "/prime") {
      // Option 1: Add a class to the body
      document.body.classList.add("prime-theme");

      // Option 2: Dynamically import prime.css
      import("./assets/css/prime.css")
        .then(() => {
          console.log("Prime CSS applied");
          resolve();
        })
        .catch((err) => {
          console.error("Failed to load Prime CSS:", err);
          resolve(); // Resolve even if CSS fails to avoid blocking
        });
    } else {
      // Remove the class if not on /prime
      document.body.classList.remove("prime-theme");
      resolve(); // No additional CSS to load
    }
  });
};

// Function to wait for all CSS to load
const waitForCSS = () => {
  const cssPromises = [];

  // Add global CSS files (already imported via `import` statements)
  // Since they are synchronous in modern bundlers, we assume they're loaded
  // If you have dynamically imported global CSS, add them here as Promises

  // Add conditional CSS
  cssPromises.push(applyConditionalCSS());

  // Wait for all CSS to load
  return Promise.all(cssPromises);
};

// Function to render the app
const renderApp = () => {
  const rootElement = document.getElementById("root");
  const loadingFallback = document.getElementById("loading-fallback");

  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
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

  // Hide loading fallback after rendering
  if (loadingFallback) {
    setTimeout(() => {
      loadingFallback.style.opacity = "0";
      loadingFallback.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => {
        loadingFallback.style.display = "none";
      }, 300);
    }, 100);
  }
};

// Initialize app after CSS is loaded
waitForCSS()
  .then(() => {
    setAxiosStore(store);
    MobileEvent.onLogin();
    renderApp();
  })
  .catch((err) => {
    console.error("Error loading CSS:", err);
    // Render anyway to avoid a blank page
    setAxiosStore(store);
    MobileEvent.onLogin();
    renderApp();
  });

// Listen for navigation changes (for single-page apps)
window.addEventListener("popstate", () => {
  waitForCSS().then(() => {
    console.log("CSS reapplied after navigation");
  });
});
