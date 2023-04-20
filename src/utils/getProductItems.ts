import { client } from "./api-client.js";
import { TProductItem, TClient } from "./types.js";
import { useAsync } from "./useAsync.js";

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

const loadingProducts: TProductItem[] = Array.from(
  { length: 10 },
  (v, index) => ({
    id: index,
    ...loadingProduct,
  })
);

const loadingClient = {
  products: loadingProducts,
  limit: 0,
  skip: 0,
  total: 0,
};

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

// function useProductItem(query: string) {
//   const result = useQuery({
//     queryKey: ["product"],
//     queryFn: () =>
//       client<TProductItem>(`products/${query}`).then((data) => {
//         return data;
//       }),
//   });
//   return {
//     ...result,
//     product: result.data ? result.data : loadingProduct,
//   };
// }

function getProductsItems(query?: string) {
  const serachOptions = query
    ? `products/search?q=${query}`
    : "products?limit=0";

  const [state, actions] = useAsync(
    () => client<TClient>(serachOptions),
    loadingClient
  );
  const jopa = {
    ...state,
    ...actions,
    isLoading: state.status === "loading" || state.status === "not-executed",
    isSuccess: state.status === "success",
    products: state.result.products,
    isError: state.status === "error",
  };
  //console.log(jopa, "jopa");
  return jopa;
}
export { getProductsItems };
