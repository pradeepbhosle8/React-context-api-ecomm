import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/reset.css";
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// bootstrap bundel js
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../node_modules/font-awesome/css/font-awesome.min.css";

// React Router Dom Navigation
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import { SearchFilterProvider } from "./context/searchFilter";
import { CartProvider } from "./context/cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchFilterProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchFilterProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
