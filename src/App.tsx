/** @jsxImportSource @emotion/react */
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { SortOptions } from "./components/SortOptions";
import { ProductsList } from "./components/ProductsList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/shopcart" element={<h1>SHOPACART</h1>}></Route>
    </Routes>
  );
}
// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/list" element={<ReadingListScreen />} />
//       <Route path="/finished" element={<FinishedScreen />} />
//       <Route path="/discover" element={<DiscoverBooksScreen />} />
//       <Route path="/book/:bookId" element={<BookScreen />} />
//       <Route path="*" element={<NotFoundScreen />} />
//     </Routes>
//   )
// }
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

function TrashBag() {
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

function App() {
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
        <TrashBag />
      </nav>
      <main css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <SortOptions />
        <ProductsList />
      </main>
      <AppRoutes />
    </>
  );
}



export default App;
