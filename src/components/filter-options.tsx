/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import { RangeSlider, Loader, MultiSelect } from "@mantine/core";
import { css } from "@emotion/react";
import { brandsData, categoryData } from "../utils/brands-category-data";
import { FilterContext } from "../context/filter-contex";
import { useProductsItems } from "../utils/useProductsItems";

function FilterByStock() {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const { isLoading, totalMinMaxStock } = useProductsItems(filterOptions);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, Infinity]);
  const [totalMinStock, totalMaxStock] = totalMinMaxStock;
  const setFilterStock = (newStock: [number, number]) => {
    setRangeValue(newStock);
    setFilterOptions({ ...filterOptions, stock: newStock });
  };

  useEffect(() => {
    setRangeValue(filterOptions.stock);
  }, [isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <div
      css={{
        border: "2px solid orange",
        borderRadius: 10,
        background: "darkblue",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span
        css={{
          borderBottom: "1px solid black",
        }}
      >
        Filter by Stock:
      </span>
      <RangeSlider
        min={totalMinStock}
        max={totalMaxStock}
        label={(value) => `${value}`}
        value={rangeValue}
        onChange={setRangeValue}
        onChangeEnd={(newStock) => setFilterStock(newStock)}
      />
    </div>
  );
}

function FilterByPrice() {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const { isLoading, totalMinMaxPrice } = useProductsItems(filterOptions);
  const [totalMinPrice, totalMaxPrice] = totalMinMaxPrice;
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, Infinity]);
  const setFilterPrice = (newPrice: [number, number]) => {
    setRangeValue(newPrice);
    setFilterOptions({ ...filterOptions, price: newPrice });
  };
  useEffect(() => {
    setRangeValue(filterOptions.price);
  }, [isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <div
      css={{
        border: "2px solid orange",
        borderRadius: 10,
        background: "darkblue",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span
        css={{
          borderBottom: "1px solid black",
        }}
      >
        Filter by Price:
      </span>
      <RangeSlider
        min={totalMinPrice}
        max={totalMaxPrice}
        label={(value) => `${value} $`}
        value={rangeValue}
        onChange={setRangeValue}
        onChangeEnd={(newPrice) => setFilterPrice(newPrice)}
      />
    </div>
  );
}

// marks={[
//   { value: minPrice, label: `${minPrice}$` },
//   { value: maxPrice, label: `${maxPrice}$` },
// ]}

const categoryAndBrandCss = css({
  border: "2px solid orange",
  borderRadius: 10,
  background: "darkblue",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

function FilterByCategory() {
  const [value, setValue] = useState([""]);
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const { isLoading } = useProductsItems(filterOptions);
  const setCategoryFilter = (newCategories: string[]) => {
    setFilterOptions({ ...filterOptions, category: newCategories });
  };
  useEffect(() => {
    setValue(filterOptions.category);
  }, [isLoading]);
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Category:</span>
      <MultiSelect
        data={categoryData}
        onChange={(newCategories) => {
          setCategoryFilter(newCategories);
          setValue(newCategories);
        }}
        placeholder="Pick category that you like"
        value={value}
      />
    </div>
  );
}

function FilterByBrand() {
  const [value, setValue] = useState([""]);
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const { isLoading } = useProductsItems(filterOptions);
  const setBrandFilter = (newBrands: string[]) => {
    setFilterOptions({ ...filterOptions, brand: newBrands });
  };

  useEffect(() => {
    setValue(filterOptions.brand);
  }, [isLoading]);
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Brand:</span>
      <MultiSelect
        data={brandsData}
        onChange={(newBrands) => {
          setValue(newBrands);
          setBrandFilter(newBrands);
        }}
        placeholder="Pick brands that you like"
        value={value}
      />
    </div>
  );
}
/*
{
  "toppings": [
    "pepperoni",
    "bell-peppers",
    "olives"
  ],
  "crust": "thin",
  "extraSauce": false
}

*/

function FilterOptions() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        background: "yellow",
      }}
    >
      <FilterByPrice />
      <FilterByCategory />
      <FilterByBrand />
      <FilterByStock />
    </div>
  );
}

export { FilterOptions };
