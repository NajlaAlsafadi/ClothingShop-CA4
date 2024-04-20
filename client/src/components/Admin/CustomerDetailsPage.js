import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'; 

function CustomerDetailsPage() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loyaltyCard, setLoyaltyCard] = useState(null);

    useEffect(() => {
        async function fetchCustomerDetails() {
            const customerResponse = await fetch(`/api/customers/${customerId}/details`);
            if (customerResponse.ok) {
                const customerData = await customerResponse.json();
                setCustomer(customerData);
            } else {
                console.log("Failed to fetch customer details");
            }

            const loyaltyResponse = await fetch(`/api/loyalty/${customerId}`);
            if (loyaltyResponse.ok) {
                const loyaltyData = await loyaltyResponse.json();
                setLoyaltyCard(loyaltyData);
            } else {
                console.log("Failed to fetch loyalty card details");
            }
        }
        fetchCustomerDetails();
    }, [customerId]);

    if (!customer) {
        return <div className="loading">Loading...</div>;
    }

    const calculateTotalItems = (items) => items.reduce((acc, item) => acc + item.quantity, 0);

    const updateOrderStatus = async (orderId, currentStatus, action) => {
        try {
            const response = await fetch(`/api/orders/update-status/${orderId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: action })  
            });
            if (response.ok) {
                const updatedOrder = await response.json();
                setCustomer(prev => ({
                    ...prev,
                    orders: prev.orders.map(order => 
                        order.id === updatedOrder.id ? updatedOrder : order
                    )
                }));
                alert('Order status updated successfully!');
            } else {
                const errorText = await response.text();
                alert('Failed to update order status: ' + errorText);
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Failed to update order status: ' + error.message);
        }
    };

    return (
        <div className="customer-details">
            <h1>Customer Details</h1>
            <div className="customer-info">
                <p><strong>Name:</strong> {customer.username}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                {loyaltyCard && (
                    <>
                        <h2>Loyalty Card</h2>
                        <p>Points: {loyaltyCard.points}</p>
                        <p>Tier: {loyaltyCard.tier}</p>
                    </>
                )}
            </div>
            <h2>Purchase History</h2>
            {customer.orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total Items</th>
                            <th>Total Price (€)</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.orderStatus}</td>
                                <td>{calculateTotalItems(order.quantities)}</td>
                                <td>€{order.totalAmount}</td>
                                <td>
                                    <table className="inner-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price per Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.quantities.map(item => (
                                                <tr key={item.product.id}>
                                                    <td>{item.product.title}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>€{item.product.price.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <button onClick={() => updateOrderStatus(order.id, order.orderStatus, 'next')}>Move to Next State</button>
                                    <button onClick={() => updateOrderStatus(order.id, order.orderStatus, 'prev')} disabled={order.orderStatus === 'PENDING'}>Move to Previous State</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No purchase history available.</p>
            )}
        </div>
    );
}

export default CustomerDetailsPage;
