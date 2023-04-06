import { client } from "./api-client.js";
import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "./filters.js";
import { TFilterOptions } from "./types.js";

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

function useProductsItems(filterOptions: TFilterOptions, query?: string) {
  const serachOptions = query
    ? `products/search?q=${query}`
    : "products?limit=0";

  const result = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      client(serachOptions).then((data) => {
        return filterProducts(data.products, filterOptions);
        //return data.products;
      }),
  });

  return {
    ...result,
    products: result.data ? result.data : loadingProducts,
  };
}

export { useProductsItems };

// const filterByCategory = async (category: string[], allData: ProductItems) => {
//   if (allData && category.length === 0) {
//     Promise.resolve({ ...allData });
//   }
//   const filteredProducts = allData?.products.filter((el) =>
//     category.includes(el.category)
//   );

//   if (filteredProducts && allData && category.length > 0) {
//     return Promise.resolve({
//       ...allData,
//       products: filteredProducts,
//       total: filteredProducts.length,
//     });
//   } else {
//     return Promise.reject("no productsData");
//   }
// };
