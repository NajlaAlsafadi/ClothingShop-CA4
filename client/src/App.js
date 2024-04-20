import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeDashboard from './components/Home/HomeDashboard';
import { AuthProvider } from './components/Context/AuthContext';
import { CartProvider } from './components/Context/CartContext';
import AuthForm from './components/SignUp/AuthForm'; 
import CheckoutForm from './components/Customer/CheckoutForm';
import Cart from './components/Customer/Cart';
import AddProductPage from './components/Product/AddProductPage';
import CustomerDetailsPage from './components/Admin/CustomerDetailsPage';
import ProductDetail from './components/Product/ProductDetail';
import CustomersPage from './components/Admin/CustomersPage';
import OrderSuccessPage from './components/Customer/OrderSuccessPage';
import CustomerProfile from './components/Customer/CustomerProfile';
import DeleteProductPage from './components/Product/DeleteProductPage';
import EditProductPage from './components/Product/EditProductPage';
import CustomerLoyaltyCard from './components/Product/CustomerLoyaltyCard';


function App() {
  return (
    <Router>
    <AuthProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/Admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/Admin/customers/:customerId" element={<CustomerDetailsPage />} />
        <Route path="/order-success" element={<OrderSuccessPage/>} />
        <Route path="/profile/:customerId" element={<CustomerProfile/>} />
        <Route path="/loyalty/:customerId" element={<CustomerLoyaltyCard/>} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
        <Route path="/delete-product/:productId" element={<DeleteProductPage />} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
