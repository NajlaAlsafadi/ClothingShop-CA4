import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'; 

function CustomerDetailsPage() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        async function fetchCustomerDetails() {
            const response = await fetch(`/api/customers/${customerId}/details`);
            if (response.ok) {
                const data = await response.json();
                setCustomer(data);
            } else {
                console.log("Failed to fetch customer details");
            }
        }
        fetchCustomerDetails();
    }, [customerId]);

    if (!customer) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="customer-details">
            <h1>Customer Details</h1>
            <div className="customer-info">
                <p><strong>Name:</strong> {customer.username}</p>
                <p><strong>Email:</strong> {customer.email}</p>
            </div>
            <h2>Purchase History</h2>
            {customer.orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Total Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.quantities.length}</td>
                                <td><button>Update Status</button></td>
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
