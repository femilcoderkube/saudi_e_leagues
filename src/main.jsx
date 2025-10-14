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

let primeCSSLoaded = false;
let saudiCSSLoaded = false;

const applyConditionalCSS = () => {
  return new Promise((resolve) => {
    const path = window.location.pathname;
    document.body.classList.remove("prime-theme", "saudi-theme", "default-theme");

    if (path.startsWith("/prime") && !primeCSSLoaded) {
      document.body.classList.add("prime-theme");
      import("./assets/css/prime.css")
        .then(() => {
          primeCSSLoaded = true;
          console.log("Prime CSS applied");
          resolve();
        })
        .catch((err) => {
          console.error("Failed to load Prime CSS:", err);
          resolve();
        });
    } else if (path.startsWith("/saudi") && !saudiCSSLoaded) {
      document.body.classList.add("saudi-theme");
      import("./assets/css/saudi.css")
        .then(() => {
          saudiCSSLoaded = true;
          console.log("Saudi CSS applied");
          resolve();
        })
        .catch((err) => {
          console.error("Failed to load Saudi CSS:", err);
          resolve();
        });
    } 
  });
};

const waitForCSS = () => {
  return Promise.all([applyConditionalCSS()]);
};

const renderApp = () => {
  const rootElement = document.getElementById("root");
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

  const loadingFallback = document.getElementById("loading-fallback");
  if (loadingFallback) {
    loadingFallback.style.transition = "opacity 0.3s ease-out";
    loadingFallback.style.opacity = "0";
    loadingFallback.addEventListener("transitionend", () => {
      loadingFallback.style.display = "none";
    }, { once: true });
  }
};

waitForCSS()
  .then(() => {
    setAxiosStore(store);
    MobileEvent.onLogin();
    renderApp();
  })
  .catch((err) => {
    console.error("Error loading CSS:", err);
    import("react-toastify").then(({ toast }) => {
      toast.error("Failed to load styles. Some features may not display correctly.");
    });
    setAxiosStore(store);
    MobileEvent.onLogin();
    renderApp();
  });

window.addEventListener("popstate", () => {
  waitForCSS().then(() => {
    console.log("CSS reapplied after navigation");
  });
});