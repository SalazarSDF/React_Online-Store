// import { useContext } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { ShopCartContext } from "../context/cart-contex";
// import { TProductItem } from "./types";

// const loadingProduct = {
//   title: "Loading..",
//   description: "Loading...",
//   price: 0,
//   discountPercentage: 0.0,
//   rating: 0.0,
//   stock: 0,
//   brand: "Loading...",
//   category: "Loading...",
//   thumbnail: "",
//   images: ["", "", ""],
// };

// const loadingProducts = Array.from({ length: 10 }, (v, index) => ({
//   id: index,
//   ...loadingProduct,
// }));

// function useCartProducts() {
//   const { shopCartProducts } = useContext(ShopCartContext);
//   const result = useQuery({
//     queryKey: ["cartProducts"],
//     queryFn: () => {
//       return Promise.resolve(shopCartProducts);
//     },
//   });
//   return {
//     products: result.data ? result.data : loadingProducts,
//   };
// }

// function useUpdateCartProducts(product: TProductItem) {
//   const { shopCartProducts, setShopCartProducts } = useContext(ShopCartContext);
//   return useMutation({
//     mutationFn: (product: TProductItem) => {
//       setShopCartProducts([...shopCartProducts, product]);
//       return Promise.resolve();
//     },
//   });
// }

function jopa() {}
export { jopa };
