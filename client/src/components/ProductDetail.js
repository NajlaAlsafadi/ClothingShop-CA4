import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { useCart } from './Context/CartContext';
import ReviewForm from './Customer/ReviewForm';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const { isCustomer } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/products/${productId}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (productId) {
            fetchProductDetails();
            fetchReviews();
        }
    }, [productId]);

    const handleReviewSubmit = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail-container">
            <h2 className="product-title">{product.title}</h2>
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <p className="product-manufacturer">Manufacturer: {product.manufacturer}</p>
            <p className="product-description">Description: {product.description}</p>
            <p className="product-price">Price: €{product.price}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-stock">Stock: {product.quantity}</p>
            {isCustomer && (
                <>
                    <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
                    <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
                </>
            )}
            <div className="review-container">
                {reviews.length ? reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <strong className="review-username">{review.username}: </strong>
                        <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                )) : <p>No reviews yet.</p>}
            </div>
        </div>
    );
};

export default ProductDetail;
