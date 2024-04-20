package com.example.shop.OrderStatusState;


public class PendingState implements OrderState {
    public void next(OrderContext context) {
        context.setState(new ShippedState());
    }

    public void prev(OrderContext context) {
        System.out.println("The order is in its root state.");
    }

    public void printStatus() {
        System.out.println("Order is pending.");
    }

    @Override
    public String toString() {
        return "PENDING";
    }
}
