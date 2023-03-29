import React, { useContext, useState, useRef } from "react";
import { createContext, useEffect } from "react";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/useAsync";
import { ProductItems, ProductItem } from "../utils/types";

type ProductsContextType = {
  data: null | ProductItems;
  isLoading: boolean;
  isSuccess: boolean;
  run?: (promise: Promise<ProductItems>) => Promise<ProductItems>;
};

const ProductsContext = createContext<ProductsContextType>({
  data: null,
  isLoading: true,
  isSuccess: false,
});
ProductsContext.displayName = "ProdcutsContext";

// const filterByCategory = async (category: string[], allData: ProductItems) => {
//   if (allData && category.length === 0) {
//     Promise.resolve({ ...allData });
//   }
//   const filteredProducts = allData?.products.filter((el) =>
//     category.includes(el.category)
//   );

//   if (filteredProducts && allData && category.length > 0) {
//     return Promise.resolve({
//       ...allData,
//       products: filteredProducts,
//       total: filteredProducts.length,
//     });
//   } else {
//     return Promise.reject("no productsData");
//   }
// };

// new Promise((resolve, reject) => {
//   resolve({ products: filteredProducts });
//   reject

function ProductsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess, run } = useAsync();

  // TODO: Save state in localStorage && check it

  if (isLoading) {
    return <h1>Loading from useContext</h1>;
    // <ProductsContext.Provider value={{ data, isLoading, isSuccess }}>
    //   {children}
    // </ProductsContext.Provider>
  }
  return (
    data && (
      <ProductsContext.Provider value={{ data, isLoading, isSuccess, run }}>
        {children}
      </ProductsContext.Provider>
    )
  );
}

export { ProductsProvider, ProductsContext };
