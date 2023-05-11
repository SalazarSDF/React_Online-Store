/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import ProductsList from "./products-list";
import { useFilterContext } from "../../context/filter-contex";
import { FilterOptions } from "../../components/filter-options";
import { useProductsContext } from "../../context/products-context";
import { filterProducts } from "../../utils/filters";

function Main() {
  const { allProducts } = useProductsContext();
  const { filterOptions } = useFilterContext();

  console.time("filter array");
  const filteredProducts = useMemo(
    () => filterProducts(allProducts, filterOptions),
    [allProducts, filterOptions]
  );
  console.timeEnd("filter array");

  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <FilterOptions />
      <ProductsList products={filteredProducts} />
    </main>
  );
}
export { Main };
