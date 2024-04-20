import React, { createContext, useContext, useState } from 'react';

const OrderStateContext = createContext();

export const useOrderState = () => useContext(OrderStateContext);

export const OrderStateProvider = ({ children }) => {
    const [orderState, setOrderState] = useState('PENDING');

    const moveToNextState = () => {
        if (orderState === 'PENDING') {
            setOrderState('SHIPPED');
        } else if (orderState === 'SHIPPED') {
            setOrderState('DELIVERED');
        }
    };

    const moveToPrevState = () => {
        if (orderState === 'DELIVERED') {
            setOrderState('SHIPPED');
        } else if (orderState === 'SHIPPED') {
            setOrderState('PENDING');
        }
    };

    return (
        <OrderStateContext.Provider value={{ orderState, moveToNextState, moveToPrevState }}>
            {children}
        </OrderStateContext.Provider>
    );
};
