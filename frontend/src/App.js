import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={(
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  )}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/orders"
                  element={(
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  )}
                />
              </Routes>
            </div>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;