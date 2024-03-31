import React, { useState } from 'react';

function HomeDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]); 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
          
            const response = await fetch(`/api/products/search?searchTerm=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setProducts(data); 
        } catch (error) {
            console.error(error.message);
        }
    };
    
    return (
        <div>
            <h1>Welcome to Najla's Clothes Shop</h1>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
           
            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category}</p>
                               
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found</p>
                )}
            </div>
            <button onClick={() => console.log('Navigating to create account')}>Create Account</button>
            <button onClick={() => console.log('Navigating to cart')}>Cart</button>
        </div>
    );
}

export default HomeDashboard;
