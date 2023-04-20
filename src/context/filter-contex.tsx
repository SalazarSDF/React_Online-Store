import React, { useContext, useState } from "react";
import { createContext } from "react";
import { TFilterOptions } from "../utils/types";
import qs from "qs";
import { useNavigate } from "react-router-dom";
//import { filterProducts } from "../utils/filters";

export type TFilterContextType = {
  filterOptions: TFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<TFilterOptions>>;
  isFilterOptionsExist: boolean;
  setFiltersInUrl: () => void;
};

const FilterContext = createContext<TFilterContextType | null>(null);
FilterContext.displayName = "FILTERCONTEXT";

function parseUrl() {
  if (!window.location.search) return {};
  const parsedObject = qs.parse(window.location.search.substr(1));
  let paresedFilterOptions = {};
  if (parsedObject.price && Array.isArray(parsedObject.price)) {
    const [minPrice, maxPrice] = parsedObject.price;
    paresedFilterOptions = {
      ...paresedFilterOptions,
      price: [Number(minPrice), Number(maxPrice)],
    };
  }
  if (parsedObject.stock && Array.isArray(parsedObject.stock)) {
    const [minStock, maxStock] = parsedObject.stock;
    paresedFilterOptions = {
      ...paresedFilterOptions,
      price: [Number(minStock), Number(maxStock)],
    };
  }
  console.log("paresedFilterOptions", paresedFilterOptions);
  return paresedFilterOptions;
}

function checkIsFilterOptions(filterOptions: TFilterOptions): boolean {
  const { category, brand, price, stock } = filterOptions;
  if (category || brand || price || stock) {
    return true;
  }
  return false;
}

function FilterContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [filterOptions, setFilterOptions] = useState<TFilterOptions>(() =>
    parseUrl()
  );
  const [isFilterOptionsExist, setIsFilterOptionsExist] = useState(
    checkIsFilterOptions(filterOptions)
  );

  //TODO: move this function to place where i should change url 
  function setFiltersInUrl() {
    setIsFilterOptionsExist(checkIsFilterOptions(filterOptions));
    if (isFilterOptionsExist) {
      const queryString = qs.stringify(filterOptions);
      navigate(`?${queryString}`);
    }
    if (!isFilterOptionsExist) {
      navigate("");
    }
  }

  return (
    <FilterContext.Provider
      value={{
        filterOptions,
        setFilterOptions,
        isFilterOptionsExist,
        setFiltersInUrl,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(`useFilterContext must be used within a FilterProvider`);
  }
  return context;
}

export { FilterContextProvider, useFilterContext };
