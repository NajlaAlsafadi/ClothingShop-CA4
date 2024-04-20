import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import './Product.css'; 

const Product = ({ product, onUpdateStock  }) => {
    const { isCustomer, isAdmin } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const goToProductDetail = () => {
        navigate(`/product/${product.id}`);
    };

    const handleProductAction = (action, productId) => {

        if (action === 'edit') {
            navigate(`/edit-product/${productId}`);
        } else if (action === 'delete') {
            navigate(`/delete-product/${productId}`);
        } else if (action === 'Update Stock') {
            onUpdateStock(product);
        }
    };

    return (
        <div className="product-container">
            <div className="product-header" onClick={goToProductDetail}>
                <h3>{product.title}</h3>
                <img src={product.imageUrl} alt={product.title} className="product-image" />
                <p className="product-price">Price: €{product.price}</p>
            </div>
            <p className="product-info">Manufacturer: {product.manufacturer}</p>
            <p className="product-info">Description: {product.description}</p>
            <p className="product-info">Category: {product.category}</p>
            <p className="product-info">Stock: {product.quantity}</p>
            {isCustomer && (
                <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
            )}
            {isAdmin && (

                <>
                    <select onChange={(e) => handleProductAction(e.target.value, product.id)} className="product-action-dropdown">
                        <option value="">Select Action</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                        <option value="Update Stock">Update Stock</option>
                    </select>
                </>
            )}
        </div>
    );
};

export default Product;
