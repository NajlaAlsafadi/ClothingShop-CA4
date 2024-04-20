import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        navigate('/');
    };

    return (
        <div>
            <h1>Are you sure you want to delete this product?</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
}

export default DeleteProductPage;
