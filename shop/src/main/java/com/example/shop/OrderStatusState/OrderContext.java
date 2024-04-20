package com.example.shop.OrderStatusState;


public class OrderContext {
    private OrderState state;

    public OrderState getState() {
        return state;
    }

    public OrderContext() {
        state = new PendingState(); 
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void next() {
        state.next(this);
    }

    public void prev() {
        state.prev(this);
    }

    public void printStatus() {
        state.printStatus();
    }
}

