/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
//import { useFilterContext } from "../../context/filter-contex";
//import { useProductsItems } from "../../utils/useProductsItems";
import { useProductsContext } from "../../context/products-context";
import { Link } from "react-router-dom";
import { TProductItem } from "../../utils/types";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Loader,
  TextInput,
} from "@mantine/core";
import { FaSistrix } from "react-icons/fa";
import { useDebouncedState } from "@mantine/hooks";
import { useShopCartContext } from "../../context/cart-contex";

function ProductCard({ product }: { product: TProductItem }) {
  const { title, description, price, thumbnail, discountPercentage } = product;
  const { shopCartProducts, addProductToCart, removeProductFromCart } =
    useShopCartContext();

  const [inCart, setInCart] = useState(() => {
    return shopCartProducts.some(
      (cartProduct) => cartProduct.id === product.id
    );
  });

  function addRemoveProduct() {
    if (inCart) {
      setInCart(false);
      removeProductFromCart(product);
    }
    if (!inCart) {
      setInCart(true);
      addProductToCart(product);
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="xs">
      <Link css={{ textDecoration: "none" }} to={`/product/${product.id}`}>
        <Card.Section>
          <Image src={thumbnail} withPlaceholder height={160} alt={title} />
        </Card.Section>

        <Group position="apart" grow mt="md" mb="xs">
          <Badge fullWidth size="xl" color="orange" variant="dot">
            {`${price} $`}
          </Badge>
          <Badge color="pink" variant="light">
            Sale {`${discountPercentage} %`}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>

        <Text weight={500}>{title}</Text>
      </Link>
      <Button
        variant={inCart ? "filled" : "outline"}
        color="blue"
        mt="md"
        fullWidth
        radius="md"
        onClick={addRemoveProduct}
      >
        {inCart ? "Remove From Cart" : "Add to Cart"}
      </Button>
    </Card>
  );
}
function SearchProductsInput() {
  const [queryValue, setQueryValue] = useDebouncedState("", 300);
  //const [queryValue, setQueryValue] = useState("");
  //const { filterOptions } = useFilterContext();
  // const { refetch, isFetching } = useProductsItems(filterOptions, queryValue);

  // useEffect(() => {
  //   refetch();
  // }, [queryValue]);

  function setValueOne(e: string) {
    setQueryValue(e);
  }
  return (
    <>
      <TextInput
        placeholder="Search"
        icon={<FaSistrix />}
        // rightSection={isFetching ? <Loader size="xs" /> : false}
        onChange={(e) => setValueOne(e.target.value)}
      />

      <Text>Debounced value: {queryValue}</Text>
    </>
  );
}

function ProductsList({ products }: { products: TProductItem[] }) {
  const { isLoading } = useProductsContext();
  return (
    <div css={{ padding: 20 }}>
      <SearchProductsInput />
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
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            rowGap: 40,
            columnGap: 20,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export { ProductsList };
