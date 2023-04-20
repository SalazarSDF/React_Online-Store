import { createContext, useContext, useEffect, useState } from "react";
import { getProductsItems } from "../utils/getProductItems";
import { TProductItem } from "../utils/types";

type TProductsContext = {
  allProducts: TProductItem[];
  //filteredProducts: TProductItem[];
  isLoading: boolean;
  isError: boolean;
  //setFilteredProducts: React.Dispatch<React.SetStateAction<TProductItem[]>>;
};

const ProductContext = createContext<TProductsContext | null>(null);
ProductContext.displayName = "PRODUCT CONTEXT";

function ProductContextProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<TProductItem[]>([]);
  //const [filteredProducts, setFilteredProducts] = useState<TProductItem[]>([]);
  const getResult = getProductsItems();

  //run only when init
  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      getResult.execute();
      setAllProducts(getResult.products);
      didInit = true;
    }
    // set loading state
  }, []);

  useEffect(() => {
    if (getResult.isSuccess) {
      setAllProducts(getResult.products);
    }
  }, [getResult.isSuccess]);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        isLoading: getResult.isLoading,
        isError: getResult.isError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      `useProductsContext must be used within a ProductContextProvider`
    );
  }
  return context;
}

export { ProductContextProvider, useProductsContext };
