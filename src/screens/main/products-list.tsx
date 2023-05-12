/** @jsxImportSource @emotion/react */
import { useProductsContext } from "../../context/products-context";
import { TProductItem } from "../../utils/types";
import { Text, Loader, TextInput } from "@mantine/core";
import { FaSistrix } from "react-icons/fa";
//import { useDebouncedState } from "@mantine/hooks";
import { useDebouncedState } from "@react-hookz/web";
import ProductCard from "../../components/productCard";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../context/filter-contex";

function SearchProductsInput() {
  // TODO : add Value in filterOptions
  // setfilteroption, setQueryVlaue,
  const { filterOptions, setFilterOptions } = useFilterContext();
  function checkQuery() {
    if (filterOptions.query) {
      return filterOptions.query;
    }
    return "";
  }
  const [queryValue, setQueryValue] = useDebouncedState(checkQuery, 500);
  const { doFetch, isLoading } = useProductsContext();
  const [value, setValue] = useState(checkQuery);

  useEffect(() => {
    if (queryValue) {
      doFetch(`https://dummyjson.com/products/search?q=${queryValue}`);
    } else {
      doFetch("https://dummyjson.com/products?limit=0");
    }
  }, [queryValue]);

  function setValueOne(e: string) {
    setQueryValue(e);
    setValue(e);
    setFilterOptions({ ...filterOptions, query: e });
  }
  return (
    <>
      <TextInput
        placeholder="Search"
        icon={<FaSistrix />}
        rightSection={isLoading ? <Loader size="xs" /> : false}
        value={value}
        onChange={(e) => {
          setValueOne(e.target.value);
        }}
      />

      <Text>Debounced value: {queryValue}</Text>
    </>
  );
}

export default function ProductsList({
  products,
}: {
  products: TProductItem[];
}) {
  const { isLoading } = useProductsContext();
  return (
    <div css={{ padding: 20 }}>
      <SearchProductsInput />
      {isLoading ? (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : products.length === 0 ? (
        <h1>Products Not Found =(</h1>
      ) : (
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            rowGap: 40,
            columnGap: 20,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
