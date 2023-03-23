import { useState, useEffect } from "react";
import { client } from "../utils/api-client";
import { ProductItems } from "../utils/types";

import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

function ProductsList() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<ProductItems>();
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  useEffect(() => {
    setStatus("loading");
    client(`products`).then((responseData) => {
      setData(responseData);
      setStatus("success");
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <h2>Loading</h2>
      ) : isSuccess && data ? (
        data.products.map((product, id) => (
          <Card
            key={product.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image src={product.thumbnail} height={160} alt={product.title} />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{product.title}</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {product.description}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        ))
      ) : (
        <h2>Fuck</h2>
      )}
    </div>
  );
}

export { ProductsList };
