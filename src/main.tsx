import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ShopCartContextProvider } from "./context/cart-contex";
import { ProductContextProvider } from "./context/products-context";
import { FilterContextProvider } from "./context/filter-contex";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopCartContextProvider>
        <ProductContextProvider>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </ProductContextProvider>
      </ShopCartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
