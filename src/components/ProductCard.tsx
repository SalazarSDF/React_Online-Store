import { useState } from "react";
import { ProductItem } from "../utils/types";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
function ProductCard({ product }: { product: ProductItem }) {
  const { title, description, price, thumbnail, discountPercentage } = product;

  const [inCart, setInCart] = useState(false);
  function addProductToCart() {
    inCart ? setInCart(false) : setInCart(true);
  }
  return (
    <Card shadow="sm" padding="lg" radius="xs">
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
      <Button
        variant={inCart ? "filled" : "outline"}
        color="blue"
        mt="md"
        fullWidth
        radius="md"
        onClick={addProductToCart}
      >
        {inCart ? "Remove From Cart" : "Add to Cart"}
      </Button>
    </Card>
  );
}
export { ProductCard };
