/** @jsxImportSource @emotion/react */
//import { useContext } from "react";
//import { ProductsContext } from "../context/products-contex";
import { useContext, useEffect } from "react";
import { FilterContext } from "../context/filter-contex";
import { useProductsItems } from "../utils/useProductsItems";

import { Loader } from "@mantine/core";
import { ProductCard } from "./ProductCard";

function ProductsList() {
  const { filterOptions } = useContext(FilterContext);
  const { products, refetch, isFetching } = useProductsItems(filterOptions);

  useEffect(() => {
    refetch();
  }, [filterOptions]);
  return isFetching ? (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  ) : (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        rowGap: 40,
        columnGap: 20,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export { ProductsList };
