/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import { RangeSlider, Loader, MultiSelect } from "@mantine/core";
import { css } from "@emotion/react";
import { brandsData, categoryData } from "../utils/brands-category-data";
import { FilterContext } from "../context/filter-contex";
import { useProductsItems } from "../utils/useProductsItems";

function FilterByStock() {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const { isLoading, products, isInitialLoading } =
    useProductsItems(filterOptions);
  const [initialMinMax, setInitialMinMax] = useState([0, Infinity]);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, Infinity]);
  const setFilterStock = (newStock: [number, number]) => {
    setRangeValue(newStock);
    setFilterOptions({ ...filterOptions, stock: newStock });
  };

  useEffect(() => {
    const initialMin = products.reduce(
      (min, el) => (el.stock < min ? el.stock : min),
      Infinity
    );
    const initialMax = products.reduce(
      (max, el) => (el.stock > max ? el.stock : max),
      0
    );
    setInitialMinMax([initialMin, initialMax]);
    setRangeValue([initialMin, initialMax]);
  }, [isInitialLoading]);

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
        min={initialMinMax[0]}
        max={initialMinMax[1]}
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
  const { isLoading, products, isInitialLoading } =
    useProductsItems(filterOptions);
  const [initialMinMax, setInitialMinMax] = useState([0, Infinity]);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, Infinity]);
  const setFilterPrice = (newPrice: [number, number]) => {
    setRangeValue(newPrice);
    setFilterOptions({ ...filterOptions, price: newPrice });
  };

  useEffect(() => {
    const initialMin = products.reduce(
      (min, el) => (el.price < min ? el.price : min),
      Infinity
    );
    const initialMax = products.reduce(
      (max, el) => (el.price > max ? el.price : max),
      0
    );
    setInitialMinMax([initialMin, initialMax]);
    setRangeValue([initialMin, initialMax]);
  }, [isInitialLoading]);

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
        min={initialMinMax[0]}
        max={initialMinMax[1]}
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
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const setCategoryFilter = (newCategories: string[]) => {
    setFilterOptions({ ...filterOptions, category: newCategories });
  };
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Category:</span>
      <MultiSelect
        data={categoryData}
        onChange={(newCategories) => setCategoryFilter(newCategories)}
        placeholder="Pick category that you like"
      />
    </div>
  );
}

function FilterByBrand() {
  const { filterOptions, setFilterOptions } = useContext(FilterContext);
  const setBrandFilter = (newBrands: string[]) => {
    setFilterOptions({ ...filterOptions, brand: newBrands });
  };
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Brand:</span>
      <MultiSelect
        data={brandsData}
        onChange={(newBrands) => setBrandFilter(newBrands)}
        placeholder="Pick brands that you like"
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
