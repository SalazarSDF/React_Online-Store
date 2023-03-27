/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { ProductsContext } from "../context/products-contex";

import { ProductCard } from "./ProductCard";

function ProductsList() {
  const { data, isLoading, isSuccess } = useContext(ProductsContext);
  console.log("sef");
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        rowGap: 40,
        columnGap: 20,
      }}
    >
      {isLoading && <h2>Loading...</h2>}
      {isSuccess &&
        data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export { ProductsList };
