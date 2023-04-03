/** @jsxImportSource @emotion/react */
import { SortOptions } from "../components/SortOptions";
import { ProductsList } from "../components/ProductsList";
import { FilterProvider } from "../context/filter-contex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
function Main() {
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <SortOptions />
          <ProductsList />
        </FilterProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </main>
  );

  // <ProductsProvider></ProductsProvider>
}

export { Main };
