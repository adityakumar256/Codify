import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./styles/globals.css";
import "./index.css";
import RootLayout from "./components/RootLayout";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootLayout>
        <App />
      </RootLayout>
    </BrowserRouter>
  </React.StrictMode>
);
