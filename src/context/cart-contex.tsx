import { createContext, useContext, useEffect, useState } from "react";
import { TProductItem } from "../utils/types";

type TShopCartContext = {
  shopCartProducts: TProductItem[];
  //setShopCartProducts: React.Dispatch<React.SetStateAction<TProductItem[]>>;
  addProductToCart: (product: TProductItem) => void;
  removeProductFromCart: (product: TProductItem) => void;
  cartTotal: number;
};

const ShopCartContext = createContext<TShopCartContext | null>(null);
ShopCartContext.displayName = "SHOPINGCARTCONTEXT";

function ShopCartContextProvider({ children }: { children: React.ReactNode }) {
  const [shopCartProducts, setShopCartProducts] = useState<TProductItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  function addProductToCart(product: TProductItem) {
    setShopCartProducts([...shopCartProducts, product]);
  }

  function removeProductFromCart(product: TProductItem) {
    setShopCartProducts(shopCartProducts.filter((el) => el.id !== product.id));
  }

  useEffect(() => {
    const newCartTotal = shopCartProducts.reduce(
      (total, product) => total + product.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [shopCartProducts]);

  return (
    <ShopCartContext.Provider
      value={{
        shopCartProducts,
        addProductToCart,
        removeProductFromCart,
        cartTotal,
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
