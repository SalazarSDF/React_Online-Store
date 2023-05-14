/** @jsxImportSource @emotion/react */
import { useShopCartContext } from "../../context/cart-contex";
import { TProductItem } from "../../utils/types";
import { Image } from "@mantine/core";

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
  product: TProductItem;
  position: number;
}) {
  const { title, price, stock, brand, thumbnail, images } = product;
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
      <div>
        <button>remove - </button>
        <span>0</span>
        <button>add + </button>
      </div>
      <span>{stock}</span>
      <span>{price}</span>
    </div>
  );
}

function Cart() {
  const { shopCartProducts } = useShopCartContext();
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      {shopCartProducts.length ? (
        <div css={{ display: "flex", flexDirection: "column" }}>
          <div css={gridStyle}>
            <span>#</span>
            <span>product</span>
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
    </div>
  );
}

export { Cart };
