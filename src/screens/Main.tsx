/** @jsxImportSource @emotion/react */
import { SortOptions } from "../components/SortOptions";
import { ProductsList } from "../components/ProductsList";
//import { ProductsProvider } from "../context/products-contex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function Main() {
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <QueryClientProvider client={queryClient}>
        <SortOptions />
        <ProductsList />
      </QueryClientProvider>
    </main>
  );

  // <ProductsProvider></ProductsProvider>
}

export { Main };
