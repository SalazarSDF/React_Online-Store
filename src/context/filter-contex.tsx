import React, { useState } from "react";
import { createContext } from "react";
import { TFilterContextType, TFilterOptions } from "../utils/types";

const FilterContext = createContext<TFilterContextType>({
  filterOptions: {
    category: [],
    brand: [],
    price: [0, Infinity],
    stock: [0, Infinity],
  },
  setFilterOptions: () => {},
});
FilterContext.displayName = "FILTERCONTEXT";


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
