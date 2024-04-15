import React, { useState, useEffect } from 'react';
import { useAuth } from './Context/AuthContext';
import { useCart } from './Context/CartContext';
import ReviewForm from './Customer/ReviewForm'; 

const Product = ({ product }) => {
    const { isCustomer } = useAuth();
    const { addToCart } = useCart();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/products/${product.id}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data); 
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchReviews();
    }, [product.id]);

    const handleReviewSubmit = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    return (
        <div>
            <h3>{product.title}</h3>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Description: {product.description}</p>
            <p>Price: €{product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.quantity}</p>
            <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            {isCustomer && (
                <>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                    <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
                </>
            )}
            <div>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <strong>{review.username}: </strong>
                        <span>{'⭐'.repeat(review.rating)}</span>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
