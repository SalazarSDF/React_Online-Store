import React, { useState } from "react";
import { createContext, useEffect } from "react";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/useAsync";
import { ProductItems } from "../utils/types";

type ProductsContextType = {
  data: null | ProductItems;
  isLoading: boolean;
  isSuccess: boolean;
  allData: null | ProductItems;
};

const ProductsContext = createContext<ProductsContextType>({
  data: null,
  isLoading: true,
  isSuccess: false,
  allData: null,
});
ProductsContext.displayName = "ProdcutsContext";

function ProductsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess, run } = useAsync();
  const [allData, setAllData] = useState<null | ProductItems>(null);
  useEffect(() => {
    // TODO: Save state in localStorage && check it
    run(client(`products`).then((data) => data));
  }, [run]);

  if (!data) {
    return (
      <ProductsContext.Provider
        value={{ data: null, isLoading, isSuccess, allData: null }}
      >
        {children}
      </ProductsContext.Provider>
    );
  }

  if (data && !allData) {
    setAllData(data);
    console.log("ETO  ALLDATA CHANGING ONCE!", allData);
  }
  return (
    data && (
      <ProductsContext.Provider value={{ data, isLoading, isSuccess, allData }}>
        {children}
      </ProductsContext.Provider>
    )
  );
}

export { ProductsProvider, ProductsContext };
