import { Routes, Route } from "react-router-dom";
import { Main } from "./screens/main/main";
import { Header } from "./components/header";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="shopcart" element={<h1>SHOPACART</h1>} />
        <Route path="product/:productId" element={<h1>JOAP</h1>} />
      </Route>
    </Routes>
  );
}

//       <Route path="/book/:bookId" element={<BookScreen />} />
//       <Route path="*" element={<NotFoundScreen />} />

export default App;
