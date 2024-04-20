import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProductPage.css'; 

function EditProductPage() {
    const [product, setProduct] = useState({
        title: '',
        manufacturer: '',
        description: '',
        category: '',
        imageUrl: '',
        price: ''
    });
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/products/update/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (response.ok) {
            alert('Product updated successfully!');
            navigate('/');
        } else {
            alert('Failed to update product. Please try again.');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="edit-product-container">
            <h1 className="edit-product-title">Edit Product</h1>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <label>
                    Title:
                    <input 
                        name="title" 
                        value={product.title} 
                        onChange={handleChange} 
                        required
                    />
                </label>
                <label>
                    Manufacturer:
                    <input 
                        name="manufacturer" 
                        value={product.manufacturer} 
                        onChange={handleChange} 
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Category:
                    <input 
                        name="category" 
                        value={product.category} 
                        onChange={handleChange} 
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input 
                        name="imageUrl" 
                        value={product.imageUrl} 
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price (€):
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        required
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProductPage;
