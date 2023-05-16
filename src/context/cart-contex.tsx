import { createContext, useContext, useState } from "react";
import { TProductItem } from "../utils/types";
import { TShopCartProductItem } from "../utils/types";

type TShopCartContext = {
  shopCartProducts: TShopCartProductItem[];
  //setShopCartProducts: React.Dispatch<React.SetStateAction<TProductItem[]>>;
  addProductToCart: (product: TProductItem) => void;
  removeProductFromCart: (product: TProductItem) => void;
  increaseProductQuatity: (product: TShopCartProductItem) => void;
  decreseProductQuatity: (product: TShopCartProductItem) => void;
  countPrice: () => number;
  countProducts: () => number;
};

const ShopCartContext = createContext<TShopCartContext | null>(null);
ShopCartContext.displayName = "SHOPINGCARTCONTEXT";

function ShopCartContextProvider({ children }: { children: React.ReactNode }) {
  function getItemsFromLocalStorage(): TShopCartProductItem[] {
    const lsValue = localStorage.getItem("shopCartIds");
    if (lsValue) {
      return JSON.parse(lsValue);
    }
    return [];
  }
  const [shopCartProducts, setShopCartProducts] = useState<
    TShopCartProductItem[]
  >(getItemsFromLocalStorage());

  function addProductToCart(product: TProductItem) {
    const newShopCartProduct: TShopCartProductItem = {
      ...product,
      quantity: 1,
    };
    const update = [...shopCartProducts, newShopCartProduct];
    setShopCartProducts(update);
    localStorage.setItem("shopCartIds", JSON.stringify(update));
  }

  function removeProductFromCart(product: TProductItem) {
    const update = shopCartProducts.filter((el) => el.id !== product.id);
    setShopCartProducts(update);
    localStorage.setItem("shopCartIds", JSON.stringify(update));
  }

  function increaseProductQuatity(product: TShopCartProductItem) {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    setShopCartProducts(
      shopCartProducts.map((el) => (el.id === product.id ? updatedProduct : el))
    );
  }

  function decreseProductQuatity(product: TShopCartProductItem) {
    if (product.quantity - 1 <= 0) {
      const { quantity, ...productItem } = product;
      removeProductFromCart(productItem);
    } else {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      setShopCartProducts(
        shopCartProducts.map((el) =>
          el.id === product.id ? updatedProduct : el
        )
      );
    }
  }

  function countPrice() {
    const price = shopCartProducts.reduce(
      (sum, el) => sum + el.price * el.quantity,
      0
    );
    console.log(price, "price");
    return price;
  }

  function countProducts() {
    const productsLength = shopCartProducts.reduce(
      (sum, el) => sum + el.quantity,
      0
    );
    return productsLength;
  }

  return (
    <ShopCartContext.Provider
      value={{
        shopCartProducts,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuatity,
        decreseProductQuatity,
        countPrice,
        countProducts,
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
