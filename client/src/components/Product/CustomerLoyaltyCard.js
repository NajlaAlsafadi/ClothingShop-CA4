import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CustomerLoyaltyCard = () => {
    const { customerId } = useParams();
    const [loyaltyCard, setLoyaltyCard] = useState(null);

    useEffect(() => {
        const fetchLoyaltyCard = async () => {
            try {
                const response = await fetch(`/api/loyalty/${customerId}`);
                if (!response.ok) throw new Error('Failed to fetch loyalty details');
                const data = await response.json();
                setLoyaltyCard(data);
            } catch (error) {
                console.error('Error fetching loyalty card:', error);
            }
        };

        fetchLoyaltyCard();
    }, [customerId]);

    if (!loyaltyCard) return <p>Loading loyalty card details...</p>;

    return (
        <div>
            <h3>Loyalty Card Details</h3>
            <p>Points: {loyaltyCard.points}</p>
            <p>Tier: {loyaltyCard.tier}</p>
        </div>
    );
};

export default CustomerLoyaltyCard;
