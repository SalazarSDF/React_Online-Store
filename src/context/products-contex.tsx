import React from "react";
import { createContext, useEffect } from "react";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/useAsync";
import { ProductItems } from "../utils/types";

type ProductsContextType = {
  data: boolean | ProductItems;
  isLoading: boolean;
  isSuccess: boolean;
};

const ProductsContext = createContext<ProductsContextType>({
  data: false,
  isLoading: true,
  isSuccess: false,
});
ProductsContext.displayName = "ProdcutsContext";

function ProductsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess, run } = useAsync();
  useEffect(() => {
    // TODO: Save state in localStorage && check it
    run(client(`products`).then((data) => data));
  }, [run]);

  if (!data) {
    return (
      <ProductsContext.Provider value={{ data: false, isLoading, isSuccess }}>
        {children}
      </ProductsContext.Provider>
    );
  }
  //SUCCESS && data
  return (
    <ProductsContext.Provider value={{ data, isLoading, isSuccess }}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsProvider, ProductsContext };
