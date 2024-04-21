import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

const CheckoutForm = () => {
    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState({});
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [pointsToUse, setPointsToUse] = useState(0);
    const [total, setTotal] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);

    useEffect(() => {
        if (user?.id) {
            Promise.all([
                fetch(`/api/customers/${user.id}/address`).then(res => res.json()),
                fetch(`/api/loyalty/${user.id}`).then(res => res.json()),
            ]).then(([addressData, loyaltyData]) => {
                setAddress(addressData);
                setLoyaltyPoints(loyaltyData.points);
                const initialTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                setTotal(initialTotal);
                setDiscountedTotal(initialTotal); //initial discounted total based on cart items
            }).catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch user data');
            });
        }
    }, [user?.id, cartItems]);

    const handleApplyPoints = async () => {
        const pointsToApply = Math.min(pointsToUse, loyaltyPoints, total);
        const response = await fetch(`/api/loyalty/${user.id}/use-points`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points: pointsToApply })
        });

        if (!response.ok) {
            const errMsg = await response.text();
            setError(`Failed to apply points: ${errMsg}`);
            return;
        }

        const newDiscountedTotal = total - pointsToApply;
        setLoyaltyPoints(prev => prev - pointsToApply);
        setDiscountedTotal(newDiscountedTotal);
        alert(`Successfully applied ${pointsToApply} points to reduce the total cost to €${newDiscountedTotal.toFixed(2)}`);
    };

    const handlePaymentConfirm = async () => {
        if (!/^\d{3}$/.test(cvv)) {
            setError('CVV must be 3 digits.');
            return;
        }

        try {
            const formattedCardNumber = cardNumber.replace(/\s+/g, '');
            const response = await fetch(`/api/loyalty/checkout/${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    price: discountedTotal  
                })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const { discountedPrice } = await response.json();
            setDiscountedTotal(discountedPrice);
            setStep(3);  
        } catch (error) {
            setError(`Payment confirmation failed: ${error.message}`);
        }
    };

    const handleOrderConfirm = async () => {
        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        try {
            const response = await fetch('/api/orders/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: user.id, 
                    items: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    cvv,
                    totalAmount: discountedTotal
                })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const orderData = await response.json();
            console.log("Order confirmed:", orderData);
            clearCart();
            navigate('/order-success');
        } catch (error) {
            setError(`Order confirmation failed: ${error.message}`);
        }
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {step === 1 && (
                <div>
                    <h2>Confirm Address</h2>
                    <p>Address: {address.street}, {address.city}, {address.zipCode}, {address.country}</p>
                    <button onClick={() => setStep(2)}>Confirm Address</button>
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
                    <p>Loyalty Points Available: {loyaltyPoints}</p>
                    <input
                        type="number"
                        value={pointsToUse}
                        onChange={(e) => setPointsToUse(Number(e.target.value))}
                        placeholder="Points to use"
                    />
                    <button onClick={handleApplyPoints}>Apply Points</button>
                    <h3>Total Cost after Discount: €{discountedTotal.toFixed(2)}</h3>
                    <button onClick={handleOrderConfirm}>Confirm Order</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;
