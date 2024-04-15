import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmit }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const reviewDTO = {
            rating: rating,
            comment: comment,
            productId: productId, 
            customerId: user.id   
        };

        console.log("Review DTO being sent:", JSON.stringify(reviewDTO));

        try {
            const response = await fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewDTO)
            });

            if (response.ok) {
                const responseData = await response.json();
                onReviewSubmit(responseData); 
                setRating(5);
                setComment('');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* Star rating input */}
                <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <textarea
                    placeholder="Leave a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
