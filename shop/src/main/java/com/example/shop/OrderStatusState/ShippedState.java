package com.example.shop.OrderStatusState;

public class ShippedState implements OrderState {
    public void next(OrderContext context) {
        context.setState(new DeliveredState());
    }

    public void prev(OrderContext context) {
        context.setState(new PendingState());
    }

    public void printStatus() {
        System.out.println("Order has been shipped.");
    }
    @Override
    public String toString() {
        return "SHIPPED";
    }
}
