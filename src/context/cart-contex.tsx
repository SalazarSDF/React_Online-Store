import { createContext, useContext, useEffect, useState } from "react";
import { TProductItem } from "../utils/types";

type TShopCartContext = {
  shopCartProducts: TProductItem[];
  //setShopCartProducts: React.Dispatch<React.SetStateAction<TProductItem[]>>;
  addProductToCart: (product: TProductItem) => void;
  removeProductFromCart: (product: TProductItem) => void;
};

const ShopCartContext = createContext<TShopCartContext | null>(null);
ShopCartContext.displayName = "SHOPINGCARTCONTEXT";

function ShopCartContextProvider({ children }: { children: React.ReactNode }) {
  function getItemsFromLocalStorage(): TProductItem[] {
    const lsValue = localStorage.getItem("shopCartIds");
    if (lsValue) {
      return JSON.parse(lsValue);
    }
    return [];
  }
  const [shopCartProducts, setShopCartProducts] = useState<TProductItem[]>(
    getItemsFromLocalStorage()
  );

  function addProductToCart(product: TProductItem) {
    const update = [...shopCartProducts, product];
    setShopCartProducts(update);
    localStorage.setItem("shopCartIds", JSON.stringify(update));
  }

  function removeProductFromCart(product: TProductItem) {
    const update = shopCartProducts.filter((el) => el.id !== product.id);
    setShopCartProducts(update);
    localStorage.setItem("shopCartIds", JSON.stringify(update));
  }

  return (
    <ShopCartContext.Provider
      value={{
        shopCartProducts,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShopCartContext.Provider>
  );
}

function useShopCartContext() {
  const context = useContext(ShopCartContext);
  if (!context) {
    throw new Error(
      `useShopCartContext must be used within a ShopCartContextProvider`
    );
  }
  return context;
}

export { ShopCartContextProvider, useShopCartContext };
