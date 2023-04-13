/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useShopCartContext } from "../context/cart-contex";
function Logo() {
  return (
    <Link
      css={{
        color: "white",
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
        <CiShoppingCart css={{ width: 34, height: 34 }} />
        <span
          css={{
            position: "absolute",
            fontSize: 10,
            fontWeight: "bold",
            right: 13,
          }}
        >
          {shopCartProducts.length}
        </span>
      </div>
    </Link>
  );
}

function Header() {
  return (
    <>
      <nav
        css={{
          position: "sticky",
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "100%",
          height: "80px",
          alignItems: "center",
        }}
      >
        <Logo />
        <ShopCart />
      </nav>
      <Outlet />
    </>
  );
}

export { Header };
