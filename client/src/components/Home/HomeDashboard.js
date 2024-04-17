import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeDashboard.css';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import CustomerActions from '../Customer/CustomerActions';
import Product from '../Product';
import UpdateProductModal from '../Admin/UpdateProductModal';
function HomeDashboard() {
    const { addToCart } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const { isCustomer, isAdmin } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState('title');
    const [sortDir, setSortDir] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(3); 
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(0, pageSize, sortField, sortDir, '');
    }, [pageSize, sortField, sortDir]);  

    const handleLogout = () => {
        logout();
        navigate('/');
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        fetchProducts(currentPage, pageSize, sortField, sortDir, searchTerm);
    };
    
    const handleUpdateStock = (product) => {
        setSelectedProduct(product);
        setShowUpdateModal(true);
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
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome to Najla's Clothes Shop</h1>
            <form onSubmit={handleSearchSubmit} className="form-inline search-sort-section">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by title, category, or manufacturer..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-button" type="submit">Search</button>
                {isAdmin && (
    <div className="admin-buttons">
        <button className="admin-button" onClick={() => navigate('/admin/add-product')}>Add New Product</button>
        <button className="admin-button" onClick={() => navigate('/admin/customers')}>View Customers</button>
    </div>
)}
                
                <div className="account-actions">
                    <button className="account-button" onClick={() => setShowDropdown(!showDropdown)}>Account</button>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            {isLoggedIn ? (
                                <>
                                    <button onClick={handleLogout}>Sign Out</button>
                                </>
                            ) : (
                                <button onClick={() => navigate('/auth')}>Sign In</button>
                            )}
                        </div>
                    )}
                    {isCustomer && (
                        <button className="cart-button" onClick={() => navigate('/cart')}>View Cart</button>
                    )}
                </div>
            </form>
            <select className="select-dropdown" value={sortField} onChange={e => setSortField(e.target.value)}>
                <option value="title">Title</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="price">Price</option>
            </select>
            <select className="select-dropdown" value={sortDir} onChange={e => setSortDir(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <div>
                {products.length > 0 ? (
                     <ul className="product-listing">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                          <Product key={product.id} product={product} onAddToCart={addToCart} onUpdateStock={handleUpdateStock} />
                      

                    </li>
                ))}
            </ul>
                ) : (
                    <p>No products found</p>
                )}
            </div>
            {showUpdateModal && (
                <UpdateProductModal
                    product={selectedProduct}
                    onClose={() => setShowUpdateModal(false)}
                    onSave={(updatedProduct) => {
                        const updatedProducts = products.map(p => 
                            p.id === updatedProduct.id ? updatedProduct : p
                        );
                        setProducts(updatedProducts);
                        setShowUpdateModal(false);
                    }}
                />
            )}
            <div className="pagination">
                <button className="page-button" disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
                <button className="page-button" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
                <p className="page-info">Page: {currentPage + 1}</p>
            </div>
           
        </div>
    );
}

export default HomeDashboard;
