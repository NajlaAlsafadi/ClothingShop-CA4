import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const CustomerActions = ({ products }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log('Added to cart:', product.title);
    };

    return (
        <>
            <button onClick={() => navigate('/cart')} style={{ margin: '10px' }}>View Cart</button>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CustomerActions;
