/** @jsxImportSource @emotion/react */
//import { useContext } from "react";
//import { ProductsContext } from "../context/products-contex";
import { useProductsItems } from "../utils/useProductsItems";

import { ProductCard } from "./ProductCard";


function ProductsList() {
  //const { data, isLoading, isSuccess } = useContext(ProductsContext);
  const { isSuccess, products } = useProductsItems();
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      )
    </div>
  );
}

export { ProductsList };
