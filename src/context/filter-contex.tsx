import React, { useContext, useState, useRef } from "react";
import { createContext, useEffect } from "react";
// import { client } from "../utils/api-client";
// import { useAsync } from "../utils/useAsync";
// import { ProductItems, ProductItem } from "../utils/types";

// type ProductsContextType = {
//   data: null | ProductItems;
//   isLoading: boolean;
//   isSuccess: boolean;
//   run?: (promise: Promise<ProductItems>) => Promise<ProductItems>;
// };

// const ProductsContext = createContext<ProductsContextType>({
//   data: null,
//   isLoading: true,
//   isSuccess: false,
// });
// ProductsContext.displayName = "ProdcutsContext";

type FilterContextType = {
  filterOptions: TFilterOptions;
  setFilterOptions:
    | React.Dispatch<React.SetStateAction<TFilterOptions>>
    | (() => void);
};

export type TFilterOptions = {
  category: string[];
  brand: string[];
  price: [number, number];
  stock: [number, number];
};

const FilterContext = createContext<FilterContextType>({
  filterOptions: {
    category: [],
    brand: [],
    price: [0, Infinity],
    stock: [0, Infinity],
  },
  setFilterOptions: () => {},
});
FilterContext.displayName = "JOPA FILTERCONTESX";

// new Promise((resolve, reject) => {
//   resolve({ products: filteredProducts });
//   reject

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    category: [],
    brand: [],
    price: [0, Infinity],
    stock: [0, Infinity],
  });
  return (
    <FilterContext.Provider value={{ filterOptions, setFilterOptions }}>
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };
