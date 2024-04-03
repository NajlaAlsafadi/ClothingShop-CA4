import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeDashboard from './components/Home/HomeDashboard';
import { AuthProvider } from './components/Context/AuthContext';
import { CartProvider } from './components/Context/CartContext';
import AuthForm from './components/SignUp/AuthForm'; 
import Cart from './components/Customer/Cart';

function App() {
  return (
    <Router>
    <AuthProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/cart" element={<Cart />} />

        </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
