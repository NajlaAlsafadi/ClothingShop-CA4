import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

function AddProductPage() {
    const [product, setProduct] = useState({
        title: '',
        price: 0,
        quantity: 0,
        manufacturer: '',
        description: '',
        category: '',
        imageUrl: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            alert('Product added successfully!');
            navigate('/');
        } else {
            alert('Failed to add product.');
        }
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" value={product.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleChange} placeholder="Manufacturer" required />
                <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
                <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
                <input type="decimal" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input type="decimal" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;
