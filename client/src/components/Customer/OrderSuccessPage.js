import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Order Successfully Placed!</h1>
            <p>Your order has been successfully placed and is being processed.</p>
            <button onClick={handleGoHome} style={{ marginTop: '20px' }}>Go to Dashboard</button>
        </div>
    );
};

export default OrderSuccessPage;
