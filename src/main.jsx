import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { EtherProvider } from "./context/Ether";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EtherProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EtherProvider>
  </React.StrictMode>
);
