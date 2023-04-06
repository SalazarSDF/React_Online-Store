import { client } from "./api-client.js";
import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "./filters.js";
import { TFilterOptions, TProductItems, TProductItem } from "./types.js";

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

//function useSearchProductsItems(filterOptions: TFilterOptions, q: string) {
//  const result = useQuery({
//    queryKey: ["products"],
//    queryFn: () =>
//      client(`products/search?q=${q}`).then((data) => {
//        return filterProducts(data.products, filterOptions);
//        //return data.products;
//      }),
//  });

//  return {
//    ...result,
//    products: result.data ? result.data : loadingProducts,
//  };
//}

function useProductItem(query: string) {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      client<TProductItem>(`products/${query}`).then((data) => {
        return data;
      }),
  });
  return {
    ...result,
    product: result.data ? result.data : loadingProduct,
  };
}

function useProductsItems(filterOptions: TFilterOptions, query?: string) {
  const serachOptions = query
    ? `products/search?q=${query}`
    : "products?limit=0";

  const result = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      client<TProductItems>(serachOptions).then((data) => {
        return filterProducts(data.products, filterOptions);
        //return data.products;
      }),
  });

  return {
    ...result,
    products: result.data ? result.data : loadingProducts,
  };
}

export { useProductsItems, useProductItem };
