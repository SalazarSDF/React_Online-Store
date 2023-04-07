import { useParams } from "react-router-dom";
import { useProductItem } from "../../utils/useProductsItems";
import { Card, Group, Text, Image, SimpleGrid } from "@mantine/core";

function ProductScreen() {
  const { productId } = useParams();
  if (!productId) {
    return <h1>Loading...</h1>;
  }
  const { product, isFetching } = useProductItem(productId);
  const {
    title,
    images,
    thumbnail: image,
    description,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
  } = product;
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{title}</Text>
        </Group>
      </Card.Section>

      <Group position="apart">
        <Text mt="sm" color="dimmed" size="sm">
          Description: {description}
        </Text>

        <Text mt="sm" color="dimmed" size="sm">Discount: {discountPercentage}%</Text>

        <Text mt="sm" color="dimmed" size="sm">
          Rating: {rating}
        </Text>

        <Text mt="sm" color="dimmed" size="sm">
          Stock: {stock}
        </Text>

        <Text mt="sm" color="dimmed" size="sm">
          Brand: {brand}
        </Text>

        <Text mt="sm" color="dimmed" size="sm">
          Category: {category}
        </Text>
      </Group>

      <Card.Section mt="sm">
        <Image src={image} />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image, index) => (
            <Image src={image} key={`${image}${index}`} radius="sm" />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}

export { ProductScreen };
