/** @jsxImportSource @emotion/react */
import { Loader, TextInput } from "@mantine/core";
import { FaSistrix } from "react-icons/fa";
import { useDebouncedState } from "@react-hookz/web";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../context/filter-contex";
import { useProductsContext } from "../../context/products-context";
import debounce from "lodash.debounce";

export default function SearchProductsInput() {
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
    const setDebouncedfilterOptions = () => {
      setFilterOptions({ ...filterOptions, query: e });
    };
    debounce(setDebouncedfilterOptions, 1000)();
  }
  const label = <label css={{ color: "white" }}>Search Products:</label>;
  return (
    <TextInput
      placeholder="Search"
      label={label}
      icon={<FaSistrix />}
      rightSection={isLoading ? <Loader size="xs" /> : false}
      value={value}
      onChange={(e) => {
        setValueOne(e.target.value);
      }}
    />
  );
}
