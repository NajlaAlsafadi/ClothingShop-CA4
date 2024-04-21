package com.example.shop.DiscountDecorator;

public class BasicPricingService implements PricingService {
    @Override
    public double calculatePriceWithDiscount(double price, int points, String tier) {
        //no discounts
        return price;
    }
}
