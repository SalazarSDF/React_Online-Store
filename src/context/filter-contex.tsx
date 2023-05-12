import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { TFilterOptions } from "../utils/types";
import qs from "qs";
import { useNavigate } from "react-router-dom";

export type TFilterContextType = {
  filterOptions: TFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<TFilterOptions>>;
  isFilterOptionsExist: boolean;
};

const FilterContext = createContext<TFilterContextType | null>(null);
FilterContext.displayName = "FILTERCONTEXT";

function parseUrl(): TFilterOptions {
  //no filter options
  if (!window.location.search) return {};
  const parsedObject = qs.parse(window.location.search.substr(1));
  let paresedFilterOptions = {};
  console.log(parsedObject, "parsedObject");
  if (parsedObject.price) {
    if (!Array.isArray(parsedObject.price))
      throw new Error("parsed filter opton PRICE should be array");
    const [minPrice, maxPrice] = parsedObject.price;
    paresedFilterOptions = {
      ...paresedFilterOptions,
      price: [Number(minPrice), Number(maxPrice)],
    };
  }
  if (parsedObject.stock) {
    if (!Array.isArray(parsedObject.stock))
      throw new Error("parsed filter options STOCK should be array");
    const [minStock, maxStock] = parsedObject.stock;
    paresedFilterOptions = {
      ...paresedFilterOptions,
      stock: [Number(minStock), Number(maxStock)],
    };
  }
  if (parsedObject.category) {
    paresedFilterOptions = {
      ...paresedFilterOptions,
      category: parsedObject.category,
    };
  }
  if (parsedObject.brand) {
    paresedFilterOptions = {
      ...paresedFilterOptions,
      brand: parsedObject.brand,
    };
  }
  if (parsedObject.query) {
    paresedFilterOptions = {
      ...paresedFilterOptions,
      query: parsedObject.query,
    };
  }
  return paresedFilterOptions;
}

function checkIsFilterOptions(filterOptions: TFilterOptions): boolean {
  const { category, brand, price, stock, query } = filterOptions;
  if (category || brand || price || stock || query) {
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
  useEffect(() => {
    setFiltersInUrl();
  }, [
    filterOptions.category,
    filterOptions.brand,
    filterOptions.price,
    filterOptions.stock,
    filterOptions.query,
    isFilterOptionsExist,
  ]);

  return (
    <FilterContext.Provider
      value={{
        filterOptions,
        setFilterOptions,
        isFilterOptionsExist,
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
