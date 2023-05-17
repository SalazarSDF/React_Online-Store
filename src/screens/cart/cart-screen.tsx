/** @jsxImportSource @emotion/react */
import { useShopCartContext } from "../../context/cart-contex";
//import { TProductItem } from "../../utils/types";
import { Image, Button } from "@mantine/core";
import { TShopCartProductItem } from "../../utils/types";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "15px 300px repeat(5, 80px)",
  borderBottom: "1px solid darkgrey",
  padding: "15px 0",
  columnGap: 20,
};

function ShopCartProduct({
  product,
  position,
}: {
  product: TShopCartProductItem;
  position: number;
}) {
  const { title, price, stock, brand, thumbnail, quantity } = product;
  const { increaseProductQuatity, decreseProductQuatity } =
    useShopCartContext();
  return (
    <div css={gridStyle}>
      <span>{position}</span>

      <Image
        src={thumbnail}
        withPlaceholder
        height={160}
        width={300}
        alt={title}
      />
      <span>{title}</span>
      <span>{brand}</span>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => decreseProductQuatity(product)}
          radius="xl"
          size="xs"
          compact
          color="cyan"
        >
          -
        </Button>
        <span>{quantity}</span>
        <Button
          onClick={() => increaseProductQuatity(product)}
          radius="xl"
          size="xs"
          compact
          color="cyan"
        >
          +
        </Button>
      </div>
      <span>{stock}</span>
      <span>{price}</span>
    </div>
  );
}

function Summary() {
  const { countPrice, countProducts } = useShopCartContext();
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: "20px 0",
        border: "1px solid",
        height: 204,
        position: "fixed",
        right: 0,
        width: 450,
      }}
    >
      <span css={{ borderBottom: "1px solid" }}>SUMMARY</span>
      <span>Products: {countProducts()}</span>
      <span>Total: {countPrice()} $</span>
      <input type="text" placeholder="Enter promo code" />
      <Button>BUY NOW</Button>
    </div>
  );
}

function Cart() {
  const { shopCartProducts } = useShopCartContext();
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "2fr 500px",
        padding: "0 30px",
      }}
    >
      {shopCartProducts.length ? (
        <div css={{ display: "flex", flexDirection: "column" }}>
          <div css={gridStyle}>
            <span>#</span>
            <span css={{ justifySelf: "center" }}>product</span>
            <span>title</span>
            <span>brand</span>
            <span>quantity</span>
            <span>stock</span>
            <span>price</span>
          </div>
          {shopCartProducts.map((product, id) => (
            <ShopCartProduct key={product.id} product={product} position={id} />
          ))}
        </div>
      ) : (
        <h1>NOTHING IN CART</h1>
      )}
      <Summary></Summary>
    </div>
  );
}

export { Cart };
