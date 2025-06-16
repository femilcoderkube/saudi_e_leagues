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
setAxiosStore(store);

createRoot(document.getElementById("root")).render(
  //  <StrictMode>
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
  //  </StrictMode>
);
