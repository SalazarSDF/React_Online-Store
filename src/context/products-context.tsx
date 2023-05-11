import { createContext, useContext } from "react";
import { TProductItem } from "../utils/types";
import { useDataApi } from "../utils/useDataApi";

type TProductsContext = {
  allProducts: TProductItem[];
  isLoading: boolean;
  isError: boolean;
  doFetch: React.Dispatch<React.SetStateAction<string>>;
};

const ProductContext = createContext<TProductsContext | null>(null);
ProductContext.displayName = "PRODUCT CONTEXT";

function ProductContextProvider({ children }: { children: React.ReactNode }) {
  //const [query, setQuery]= useState<string | null>(null);
  const [{ isLoading, isError, data }, doFetch] = useDataApi(
    "https://dummyjson.com/products?limit=0",
    {
      products: [],
      limit: 0,
      skip: 0,
      total: 0,
    }
  );

  return (
    <ProductContext.Provider
      value={{
        allProducts: data.products,
        isLoading,
        isError,
        doFetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      `useProductsContext must be used within a ProductContextProvider`
    );
  }
  return context;
}

export { ProductContextProvider, useProductsContext };

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

// const loadingProducts: TProductItem[] = Array.from(
//   { length: 10 },
//   (v, index) => ({
//     id: index,
//     ...loadingProduct,
//   })
// );
