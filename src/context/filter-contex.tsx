import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { TFilterContextType, TFilterOptions } from "../utils/types";
import qs from "qs";
import { useNavigate } from "react-router-dom";

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

function initalFilterOptions() {
  let baseOptions: TFilterOptions = {
    category: [],
    brand: [],
    price: [0, Infinity],
    stock: [0, Infinity],
  };
  if (window.location.search) {
    return { ...baseOptions, ...qs.parse(window.location.search.substr(1)) };
  }
  return baseOptions;
}

function FilterProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [filterOptions, setFilterOptions] = useState<TFilterOptions>(
    initalFilterOptions()
  );
  useEffect(() => {
    const queryString = qs.stringify(filterOptions);
    //console.log(queryString, "eto query string");
    navigate(`?${queryString}`);
  }, [filterOptions]);
  return (
    <FilterContext.Provider value={{ filterOptions, setFilterOptions }}>
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };
