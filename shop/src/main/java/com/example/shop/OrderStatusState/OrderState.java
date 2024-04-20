package com.example.shop.OrderStatusState;

public interface OrderState {
    void next(OrderContext context);
    void prev(OrderContext context);
    void printStatus();
}