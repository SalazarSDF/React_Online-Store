/** @jsxImportSource @emotion/react */
import { useProductsContext } from "../../context/products-context";
import { TProductItem } from "../../utils/types";
import { Loader, NativeSelect } from "@mantine/core";
import ProductCard from "../../components/product-card";
import SearchProductsInput from "../product/search-products-input";
import { useFilterContext } from "../../context/filter-contex";

function SortOptionsSelect() {
  const label = <label css={{ color: "white" }}>Sort Products Options:</label>;
  const { filterOptions, setFilterOptions } = useFilterContext();
  function handleOnChange(e: string) {
    setFilterOptions({ ...filterOptions, sortBy: e });
  }

  return (
    <NativeSelect
      label={label}
      data={["MIN price", "MAX price", "MIN stock", "MAX stock"]}
      onChange={(event) => handleOnChange(event.currentTarget.value)}
    />
  );
}

export default function ProductsList({
  products,
}: {
  products: TProductItem[];
}) {
  const { isLoading } = useProductsContext();

  const styleGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    rowGap: 40,
    columnGap: 20,
  };

  return (
    <div css={{ padding: 20 }}>
      <div
        css={{
          display: "flex",
          marginBottom: 20,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchProductsInput />
        <span>Found: {products.length}</span>
        <SortOptionsSelect />
      </div>
      {isLoading ? (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : products.length === 0 ? (
        <h1>Products Not Found =(</h1>
      ) : (
        <div css={styleGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
