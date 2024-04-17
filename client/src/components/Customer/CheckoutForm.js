import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

const CheckoutForm = () => {
    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState({});
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id) {
            const url = `/api/customers/${user.id}/address`;
            console.log("Fetching address for user ID:", user.id);
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Address data received:", data);
                setAddress(data);
            })
            .catch(err => {
                setError(`Failed to fetch address: ${err.toString()}`);
                console.error('Error fetching address:', err);
            });
        }
    }, [user.id]);

    const handleAddressConfirm = () => {
        console.log("Address confirmed:", address);
        setStep(2);
    };

    const handlePaymentConfirm = async () => {
        if (!/^\d{3}$/.test(cvv)) {
            setError('CVV must be 3 digits');
            return;
        }

        console.log("Attempting to validate CVV and card number", { cardNumber, cvv }); 
        try {
            const formattedCardNumber = cardNumber.replace(/\s+/g, ''); 
            const response = await fetch(`/api/validate-cvv`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardNumber: formattedCardNumber, cvv, customerId: user.id })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'CVV validation failed');
            }

            console.log("CVV and card number validated successfully");
            setStep(3);
        } catch (error) {
            setError(`Payment confirmation failed: ${error.message}`);
            console.error('Payment confirmation failed:', error);
        }
    };

    const handleOrderConfirm = async () => {
        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        console.log("Confirming order with details:", { customerId: user.id, items: cartItems, cvv });
        try {
            const response = await fetch('/api/orders/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId: user.id, items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })), cvv })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to confirm order');
            }

            console.log("Order confirmed successfully"); 
            clearCart();
            navigate('/order-success');
        } catch (error) {
            setError(`Order confirmation failed: ${error.message}`);
            console.error('Order confirmation failed:', error);
        }
    };

    if (step === 1 && !address.street) {
        return <div>Loading your address...</div>;
    }

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {step === 1 && (
                <div>
                    <h2>Confirm Address</h2>
                    <p>Address: {address.street}, {address.city}, {address.zipCode}, {address.country}</p>
                    <button onClick={handleAddressConfirm}>Confirm Address</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Enter Payment Details</h2>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                    />
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                    />
                    <button onClick={handlePaymentConfirm}>Confirm Payment</button>
</div>
)}
{step === 3 && (
<div>
<h2>Confirm Order</h2>
<button onClick={handleOrderConfirm}>Confirm Order</button>
</div>
)}
</div>
);
};

export default CheckoutForm;
