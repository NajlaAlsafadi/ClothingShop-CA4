import React from 'react';
import './Cart.css';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const navigate = useNavigate(); 

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/checkout');
        } else {
            alert("Add items to your cart before checkout.");
        }
    };
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <h3 className="cart-title">{item.title}</h3>
                            <p className="cart-category">Category: {item.category}</p>
                            <p className="cart-price">Price: €{item.price}</p>
                            <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            <p className="cart-quantity">Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)} className="cart-btn">Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h4>Total: €{calculateTotal()}</h4>
                    </div>
                </>
            ) : (
                <p className="empty-cart">Your cart is empty.</p>
            )}
            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
        </div>
    );
};
export default Cart;
