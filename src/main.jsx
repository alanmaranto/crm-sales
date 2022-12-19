import React from "react";
import ReactDOM from "react-dom/client";
import { ToastProvider } from "react-toast-notifications";
import App from "./Crm";
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
