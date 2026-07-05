import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletePage from "./pages/OrderCompletePage";

function App() {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1 bg-neutral-50">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-complete" element={<OrderCompletePage />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
