import React, { useState } from 'react';
import './HomeDashboard.css';
function HomeDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState('title');
    const [sortDir, setSortDir] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        fetchProducts(currentPage, pageSize, sortField, sortDir, searchTerm);
    };

    const fetchProducts = async (page, size, sort, direction, term) => {
        try {
            const response = await fetch(`/api/products/search?searchTerm=${encodeURIComponent(term)}&page=${page}&size=${size}&sort=${sort},${direction}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setProducts(data.content); 
        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchProducts(newPage, pageSize, sortField, sortDir, searchTerm);
    };

    return (
        <div>
            <h1>Welcome to Najla's Clothes Shop</h1>
            <form onSubmit={handleSearchSubmit} className="form-inline">
            <input
                type="text"
                placeholder="Search by title, category, or manufacturer..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
            <button onClick={() => console.log('Navigating to create account')}>Create Account</button>
            <button onClick={() => console.log('Navigating to cart')}>Cart</button>
        </form>
            <select value={sortField} onChange={e => setSortField(e.target.value)}>
                <option value="title">Title</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="price">Price</option>
            </select>
            <select value={sortDir} onChange={e => setSortDir(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                <p>Manufacturer: {product.manufacturer}</p>
                                <p>{product.description}</p>
                                <p>Price: €{product.price}</p>
                                <p>Category: {product.category}</p>
                                <p>Current Stock: {product.quantity}</p>
                                <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found</p>
                )}
            </div>

            <div>
                <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
                <p>Page: {currentPage + 1}</p>
            </div>
        </div>
    );
}

export default HomeDashboard;
