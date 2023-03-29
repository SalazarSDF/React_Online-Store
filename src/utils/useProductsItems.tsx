import { client } from "./api-client.js";
import { useQuery } from "@tanstack/react-query";

const loadingProduct = {
  title: "Loading..",
  description: "Loading...",
  price: 0,
  discountPercentage: 0.0,
  rating: 0.0,
  stock: 0,
  brand: "Loading...",
  category: "Loading...",
  thumbnail: "",
  images: ["", "", ""],
};

const loadingProducts = Array.from({ length: 10 }, (v, index) => ({
  id: index,
  ...loadingProduct,
}));

function useProductsItems() {
  //const { data } = client(`products`).then((data: ProductItems) => data);
  const { data, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: () => client("products").then((data) => data.products),
  });

  return { products: data ?? loadingProducts, isSuccess: isSuccess };
}

export { useProductsItems };
