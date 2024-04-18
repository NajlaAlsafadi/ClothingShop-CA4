import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CustomerProfile.css';  

function CustomerProfile() {
    const { customerId } = useParams();
    const [customerDetails, setCustomerDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`/api/customers/${customerId}/details`);
                if (!response.ok) throw new Error('Failed to fetch details');
                const data = await response.json();
                setCustomerDetails(data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                navigate('/');
            }
        };
        fetchCustomerDetails();
    }, [customerId, navigate]);

    if (!customerDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="customer-profile">
            <h1>Profile Details</h1>
            <div className="customer-info">
                <p><strong>Name:</strong> {customerDetails.username}</p>
                <p><strong>Email:</strong> {customerDetails.email}</p>
                <p><strong>Address:</strong> {`${customerDetails.address.street}, ${customerDetails.address.city}, ${customerDetails.address.zipCode}, ${customerDetails.address.country}`}</p>
            </div>
            <h2>Orders</h2>
            <div className="orders">
                {customerDetails.orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th>Total Amount</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerDetails.orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>€{order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <table className="nested-table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.quantities.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.product.title}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>€{item.product.price.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </div>
    );
}

export default CustomerProfile;
