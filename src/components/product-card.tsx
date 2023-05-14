/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from "react-router-dom";

import { useShopCartContext } from "../context/cart-contex";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { TProductItem } from "../utils/types";

export default function ProductCard({ product }: { product: TProductItem }) {
  const { id, title, description, price, thumbnail, discountPercentage } =
    product;
  const { shopCartProducts, addProductToCart, removeProductFromCart } =
    useShopCartContext();

  const [inCart, setInCart] = useState(() => {
    return shopCartProducts.some((el) => el.id === product.id);
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
      <Link css={{ textDecoration: "none" }} to={`/product/${id}`}>
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
        onClick={() => addRemoveProduct()}
      >
        {inCart ? "Remove From Cart" : "Add to Cart"}
      </Button>
    </Card>
  );
}
