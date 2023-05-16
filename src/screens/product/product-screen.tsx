/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../context/products-context";
//import { Card, Group, Text, Image, SimpleGrid } from "@mantine/core";
import { Image, Button } from "@mantine/core";
import { useState } from "react";
import { useShopCartContext } from "../../context/cart-contex";

export default function ProductScreen() {
  let { productId } = useParams();
  if (!productId) {
    productId = "0";
  }
  const { allProducts, isLoading } = useProductsContext();
  const [currentImg, setCurrentImg] = useState("");
  const { addProductToCart, removeProductFromCart } = useShopCartContext();
  const [inCart, setInCart] = useState(() =>
    allProducts.some((el) => el.id === Number(productId))
  );
  console.log(isLoading, "allProducts");
  if (!productId || isLoading || allProducts.length === 0)
    return <h1>Loading...</h1>;
  const product = allProducts.filter((el) => el.id === Number(productId))[0];
  const {
    brand,
    category,
    description,
    images,
    discountPercentage,
    price,
    rating,
    stock,
    title,
  } = product;
  function addRemoveProduct() {
    if (inCart) {
      setInCart(!inCart);
      removeProductFromCart(product);
    } else {
      setInCart(!inCart);
      addProductToCart(product);
    }
  }

  //if (!product) return <h1>Loading...</h1>;

  return (
    <>
      <div
        css={{
          display: "grid",
          justifyItems: "center",

          background: "rgb(0 0 0 / 15%)",
        }}
      >
        <h1 css={{ borderBottom: "1px solid white" }}>{title}</h1>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            padding: 20,
            gap: 20,
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 35,
              borderLeft: "1px solid white",
              borderRight: "1px solid white",
              padding: 20,
            }}
          >
            <Image
              width={350}
              height={250}
              src={currentImg === "" ? images[0] : currentImg}
              css={{
                outline: "1px solid white",
                outlineOffset: 5,
              }}
            ></Image>
            <div
              css={{
                display: "flex",
                gap: 15,
              }}
            >
              {images.map((el) => (
                <Image
                  width={100}
                  height={50}
                  onClick={() => setCurrentImg(el)}
                  css={{
                    outlineOffset: 5,
                    ":hover": {
                      cursor: " pointer",
                      outline: "1px solid white",
                      transform: "scale(1.05) translateY(-5px)",
                    },
                  }}
                  key={el}
                  src={el}
                ></Image>
              ))}
            </div>
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Description: {description}</p>
            <p>Discount Percentage: {discountPercentage}</p>
            <p>Rating: {rating}</p>
            <p>Stock: {stock}</p>
            <p>Brand: {brand}</p>
            <p>Category: {category}</p>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              flexDirection: "column",

              borderLeft: "1px solid white",
              borderRight: "1px solid white",
            }}
          >
            <span css={{ fontSize: 30 }}>Price: {price} $</span>
            <Button onClick={() => addRemoveProduct()}>
              {inCart ? "Remove From Cart" : "Add To Cart"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
