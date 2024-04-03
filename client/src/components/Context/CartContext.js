import React, { createContext, useContext, useState } from 'react';
import '../Customer/Cart.css';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id);
        if (exist) {
            setCartItems(cartItems.map((item) =>
                item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item
            ));
        } else {
            //diplay the quantity of item purchased
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const exist = cartItems.find((item) => item.id === productId);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((item) => item.id !== productId));
        } else {
            setCartItems(cartItems.map((item) =>
                item.id === productId ? { ...exist, quantity: exist.quantity - 1 } : item
            ));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
