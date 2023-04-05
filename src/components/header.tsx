/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
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
  return (
    <Link
      css={{
        color: "white",
        textDecoration: "none",
      }}
      to="/shopcart"
    >
      <FaShoppingCart />
      Cart
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
