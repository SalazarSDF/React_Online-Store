/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { client } from "../utils/api-client";
import { ProductItems } from "../utils/types";

import { ProductCard } from "./ProductCard";

function ProductsList() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<ProductItems>();
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  useEffect(() => {
    setStatus("loading");
    client(`products`).then((responseData) => {
      setData(responseData);
      setStatus("success");
    });
  }, []);
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
