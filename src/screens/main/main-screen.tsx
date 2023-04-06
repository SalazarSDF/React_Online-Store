/** @jsxImportSource @emotion/react */
import { FilterOptions } from "../../components/filter-options";
import { ProductsList } from "./products-list";
import { FilterProvider } from "../../context/filter-contex";

function Main() {
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <FilterProvider>
          <FilterOptions />
          <ProductsList />
        </FilterProvider>
    </main>
  );
}

export { Main };
