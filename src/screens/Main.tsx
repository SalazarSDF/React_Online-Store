/** @jsxImportSource @emotion/react */
import { SortOptions } from "../components/SortOptions";
import { ProductsList } from "../components/ProductsList";
import { ProductsProvider } from "../context/products-contex";
function Main() {
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <ProductsProvider>
        <SortOptions />
        <ProductsList />
      </ProductsProvider>
    </main>
  );
}

export { Main };
