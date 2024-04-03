import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    const isLoggedIn = !!user;
    const isCustomer = user?.role === 'CUSTOMER';
    const isAdmin = user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ isLoggedIn, isCustomer, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
