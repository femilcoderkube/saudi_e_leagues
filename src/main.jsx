/* index.jsx — No FOUC, loader stays until CSS loads */
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

/* ---------------------------
   Helper: resolve path to bundled CSS
----------------------------*/
const getCssHref = (relativePath) => {
  try {
    return new URL(relativePath, import.meta.url).href;
  } catch {
    return relativePath;
  }
};

/* ---------------------------
   Detect theme by pathname
----------------------------*/
const detectThemeForPath = (path) => {
  if (path.startsWith("/prime")) return "prime";
  if (path.startsWith("/saudi")) return "saudi";
  return null;
};

/* ---------------------------
   Insert <link> stylesheet with loader handling
----------------------------*/
const insertThemeStylesheetBlocking = async (theme) => {
  if (!theme) return;

  const href = getCssHref(
    theme === "prime"
      ? import("./assets/css/prime.css")
      : import("./assets/css/saudi.css")
  );

  // Avoid duplicates
  const existing = Array.from(document.querySelectorAll("link")).find(
    (l) => l.href === href
  );
  if (existing) {
    if (existing.sheet) return; // already loaded
    return new Promise((resolve) => {
      existing.onload = resolve;
      existing.onerror = resolve;
    });
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.theme = theme;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn("⚠️ CSS load timeout, continuing anyway");
      resolve();
    }, 2500);

    link.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    link.onerror = () => {
      clearTimeout(timeout);
      resolve();
    };

    document.head.appendChild(link);
  });
};

/* ---------------------------
   Render App (don't hide loader yet)
----------------------------*/
const renderApp = () => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <App />
    </Provider>
  );
};

/* ---------------------------
   Hide loader smoothly
----------------------------*/
const hideLoader = () => {
  const loader = document.getElementById("loading-fallback");
  if (loader) {
    loader.style.transition = "opacity 0.4s ease-out";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }
};

/* ---------------------------
   Initialize
----------------------------*/
(async () => {
  setAxiosStore(store);
  MobileEvent.onLogin();

  const path = window.location.pathname;
  let theme = detectThemeForPath(path);

  // Show loader by default — background stays visible
  document.body.style.background = "#020326";

  // Render app (React Router can trigger redirects)
  renderApp();

  // Wait for theme CSS — handle initial redirect from "/"
  if (!theme) {
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 100));
      theme = detectThemeForPath(window.location.pathname);
      if (theme) break;
    }
  }

  // Load theme CSS (still keep loader visible)
  if (theme) {
    await insertThemeStylesheetBlocking(theme);
    console.log(`🎨 ${theme} theme CSS loaded`);
  }

  // Remove loader *after* CSS ready
  hideLoader();
})();

/* ---------------------------
   Handle browser navigation
----------------------------*/
window.addEventListener("popstate", () => {
  const theme = detectThemeForPath(window.location.pathname);
  if (theme) insertThemeStylesheetBlocking(theme);
});
