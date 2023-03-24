/** @jsxImportSource @emotion/react */
import { SortOptions } from "../components/SortOptions";
import { ProductsList } from "../components/ProductsList";
function Main() {
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <SortOptions />
      <ProductsList />
    </main>
  );
}

export {Main}
