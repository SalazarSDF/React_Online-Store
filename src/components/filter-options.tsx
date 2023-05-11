/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import { RangeSlider, Loader, MultiSelect } from "@mantine/core";
import { css } from "@emotion/react";
import { brandsData, categoryData } from "../utils/brands-category-data";
import { useFilterContext } from "../context/filter-contex";
import { useProductsContext } from "../context/products-context";

function FilterByPrice() {
  const { filterOptions, setFilterOptions } = useFilterContext();
  const { isLoading } = useProductsContext();
  const [rangeValue, setRangeValue] = useState<[number, number]>(() => {
    return filterOptions.price ? filterOptions.price : [10, 1749];
  });

  const setFilterPrice = (newPrice: [number, number]) => {
    if (newPrice[0] && newPrice[1]) {
      setFilterOptions({ ...filterOptions, price: newPrice });
    }
  };

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
        min={10}
        max={1749}
        label={(value) => `${value} $`}
        value={rangeValue}
        onChange={setRangeValue}
        onChangeEnd={(newPrice) => setFilterPrice(newPrice)}
      />
    </div>
  );
}

function FilterByStock() {
  const { filterOptions, setFilterOptions } = useFilterContext();
  const [rangeValue, setRangeValue] = useState<[number, number]>(() => {
    return filterOptions.stock ? filterOptions.stock : [2, 150];
  });
  const setFilterStock = (newStock: [number, number]) => {
    if (newStock[0] && newStock[1]) {
      setRangeValue(newStock);
      setFilterOptions({ ...filterOptions, stock: newStock });
    }
  };

  return (
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
        min={2}
        max={150}
        label={(value) => `${value}`}
        value={rangeValue}
        onChange={setRangeValue}
        onChangeEnd={(newStock) => setFilterStock(newStock)}
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
  const { filterOptions, setFilterOptions } = useFilterContext();

  const [value, setValue] = useState(() => {
    return filterOptions.category ? filterOptions.category : [""];
  });
  const setCategoryFilter = (newCategories: string[]) => {
    setFilterOptions({ ...filterOptions, category: newCategories });
  };

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
  const { filterOptions, setFilterOptions } = useFilterContext();

  const [value, setValue] = useState(() => {
    return filterOptions.brand ? filterOptions.brand : [""];
  });
  const setBrandFilter = (newBrands: string[]) => {
    setFilterOptions({ ...filterOptions, brand: newBrands });
  };

  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Brand:</span>
      <MultiSelect
        data={brandsData}
        onChange={(newBrands) => {
          setBrandFilter(newBrands);
          setValue(newBrands);
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
