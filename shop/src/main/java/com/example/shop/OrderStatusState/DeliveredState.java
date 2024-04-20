package com.example.shop.OrderStatusState;

public class DeliveredState implements OrderState {
    public void next(OrderContext context) {
        System.out.println("The order is already in its final state.");
    }

    public void prev(OrderContext context) {
        context.setState(new ShippedState());
    }

    public void printStatus() {
        System.out.println("Order has been delivered.");
    }

    @Override
    public String toString() {
        return "DELIVERED";
    }
}