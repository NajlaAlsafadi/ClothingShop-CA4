import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeDashboard.css';
import { useAuth  } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import CustomerActions from '../Customer/CustomerActions';


function HomeDashboard() {
    const { addToCart } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const { isCustomer, isAdmin } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState('title');
    const [sortDir, setSortDir] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(5);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };
    const handleAddToCart = (product) => {
        addToCart(product);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        fetchProducts(currentPage, pageSize, sortField, sortDir, searchTerm);
    };

    useEffect(() => {
        fetchProducts(0, pageSize, sortField, sortDir, '');
    }, []);
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
    if (isAdmin) {
       //update with admin logic
    }

    if (isCustomer) {
        //update with customer logic
    }
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
            <div className="account-actions">
          <button onClick={() => setShowDropdown(!showDropdown)}>Account</button>
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
                                        <button onClick={() => navigate('/cart')}>View Cart</button>
                                    )}
      </div>

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
                                {isCustomer && (
                                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                                )}
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
            {/* {isCustomer && <CustomerActions products={products} />} */}
        </div>
    );
}

export default HomeDashboard;
