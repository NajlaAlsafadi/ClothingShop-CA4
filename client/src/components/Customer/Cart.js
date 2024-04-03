import React from 'react';
import './Cart.css';
import { useCart } from '../Context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const handleCheckout = () => {
        clearCart();
        alert('Checkout successful');
    };

    return (
        <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length > 0 ? (
            cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <h3 className="cart-title">{item.title}</h3>
                    <p className="cart-price">Price: €{item.price}</p>
                    <p className="cart-quantity">Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="cart-btn">Remove</button>
                </div>
            ))
        ) : (
            <p className="empty-cart">Your cart is empty.</p>
        )}
        <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
      </div>
      
    );
};

export default Cart;
