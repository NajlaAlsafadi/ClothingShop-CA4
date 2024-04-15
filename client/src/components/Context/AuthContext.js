import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        console.log('Logging in user:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        
    };

    const isLoggedIn = !!user;
    const isCustomer = user?.role === 'CUSTOMER';
    const isAdmin = user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isCustomer, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
