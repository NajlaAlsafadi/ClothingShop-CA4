package com.example.shop.DiscountDecorator;

public interface PricingService {
    double calculatePriceWithDiscount(double price, int points, String tier);
}
