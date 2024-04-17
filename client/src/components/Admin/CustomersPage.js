import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCustomers() {
            const response = await fetch('/api/customers/all');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
                console.log(data); 
            } else {
                console.log("Failed to fetch customers");
            }
        }
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>{customer.shippingAddress ? `${customer.shippingAddress.street}, ${customer.shippingAddress.city}` : 'No address'}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/customers/${customer.id}`)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomersPage;
