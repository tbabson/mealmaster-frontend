import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store.js";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <App />
          <ToastContainer position="top-center" />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Register the service worker: offline support plus push notification delivery.
// Vite serves the worker from a different path (as a module) during dev than
// the classic worker emitted by the production build.
const SW_URL = import.meta.env.DEV ? "/dev-sw.js?dev-sw" : "/service-worker.js";
const SW_OPTIONS = import.meta.env.DEV ? { type: "module" } : undefined;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(SW_URL, SW_OPTIONS)
      .then((registration) => {
        // Activate a newly installed worker as soon as it is ready
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              installing.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
