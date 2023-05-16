import { Routes, Route } from "react-router-dom";
import { Main } from "./screens/main/main-screen";
import { Header } from "./components/header";
import { Cart } from "./screens/cart/cart-screen";
import ProductScreen from "./screens/product/product-screen";

function App() {
  //<Route path="product/:productId" element={<ProductScreen />} />
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="shopcart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductScreen />} />
      </Route>
    </Routes>
  );
}

//       <Route path="*" element={<NotFoundScreen />} />

export default App;
