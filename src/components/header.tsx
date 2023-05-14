/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useShopCartContext } from "../context/cart-contex";
function Logo() {
  return (
    <Link
      css={{
        color: "#242424",
        textDecoration: "none",
      }}
      to="/"
    >
      Online-Shop
    </Link>
  );
}

function ShopCart() {
  const { shopCartProducts } = useShopCartContext();
  return (
    <Link
      css={{
        color: "white",
        textDecoration: "none",
      }}
      to="/shopcart"
    >
      <div
        css={{
          width: 45,
          height: 45,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <CiShoppingCart css={{ width: 34, height: 34, fill: "#242424" }} />
        <span
          css={{
            position: "absolute",
            fontSize: 10,
            fontWeight: "bold",
            right: 13,
            color: "#242424",
          }}
        >
          {shopCartProducts.length}
        </span>
      </div>
    </Link>
  );
}

function ShopCartTotal() {
  const { shopCartProducts } = useShopCartContext();
  const cartTotalPrice = shopCartProducts.reduce(
    (sum, scp) => (sum = sum + scp.price),
    0
  );
  return (
    <div css={{ borderRadius: 20, boreder: "2px solid orangered" }}>
      <span css={{ color: "#242424", fontWeight: "bold" }}>
        Cart total: {cartTotalPrice}$
      </span>
    </div>
  );
}

function Header() {
  return (
    <>
      <nav
        css={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          margin: "0 auto",
          height: "80px",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <Logo />
        <ShopCartTotal />
        <ShopCart />
      </nav>
      <Outlet />
    </>
  );
}

export { Header };
