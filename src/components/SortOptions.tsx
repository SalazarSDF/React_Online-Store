/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import { RangeSlider } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { css } from "@emotion/react";
import { ProductsContext } from "../context/products-contex";
import { brandsData, categoryData } from "../utils/brands-category-data";

function FilterByStock() {
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
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
        label={(value) => `${value}`}
        value={rangeValue}
        onChange={setRangeValue}
      />
    </div>
  );
}

function FilterByPrice() {
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
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
        Filter by Price:
      </span>
      <RangeSlider
        label={(value) => `${value} $`}
        value={rangeValue}
        onChange={setRangeValue}
      />
    </div>
  );
}

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
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Category:</span>
      <MultiSelect
        data={categoryData}
        placeholder="Pick category that you like"
      />
    </div>
  );
}

function FilterByBrand() {
  return (
    <div css={categoryAndBrandCss}>
      <span>Filter by Brand:</span>
      <MultiSelect data={brandsData} placeholder="Pick brands that you like" />
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

function SortOptions() {
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

export { SortOptions };

