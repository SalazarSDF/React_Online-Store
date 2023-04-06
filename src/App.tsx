import { Routes, Route } from "react-router-dom";
import { Main } from "./screens/main/main-screen";
import { Header } from "./components/header";
import { ProductScreen } from "./screens/product/product-screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="shopcart" element={<h1>SHOPACART</h1>} />
        <Route path="product/:productId" element={<ProductScreen />} />
      </Route>
    </Routes>
  );
}

//       <Route path="/book/:bookId" element={<BookScreen />} />
//       <Route path="*" element={<NotFoundScreen />} />

export default App;
