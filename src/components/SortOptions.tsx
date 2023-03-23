/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { RangeSlider } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { css } from "@emotion/react";

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
  const categoriesData = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];
  return (
    <>
      <div css={categoryAndBrandCss}>
        <span>Filter by Category:</span>
        <MultiSelect
          data={categoriesData}
          placeholder="Pick category that you like"
        />
      </div>
    </>
  );
}

function FilterByBrand() {
  const brandsData = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];
  return (
    <>
      <div css={categoryAndBrandCss}>
        <span>Filter by Brand:</span>
        <MultiSelect
          data={brandsData}
          placeholder="Pick brands that you like"
        />
      </div>
    </>
  );
}

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
    </div>
  );
}

export { SortOptions };
