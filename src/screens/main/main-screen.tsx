/** @jsxImportSource @emotion/react */
import ProductsList from "./products-list";
import { useFilterContext } from "../../context/filter-contex";
import { FilterOptions } from "./filter-options";
import { useProductsContext } from "../../context/products-context";
import { filterProducts } from "../../utils/filters";

function Main() {
  const { allProducts } = useProductsContext();
  const { filterOptions } = useFilterContext();

  console.time("filter array");
  const filteredAndSortProducts = filterProducts(allProducts, filterOptions);
  console.timeEnd("filter array");
  //filteredAndSortProducts = [...allProducts.sort((a, b) => a.price - b.price)];

  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <FilterOptions />
      <ProductsList products={filteredAndSortProducts} />
    </main>
  );
}
export { Main };
