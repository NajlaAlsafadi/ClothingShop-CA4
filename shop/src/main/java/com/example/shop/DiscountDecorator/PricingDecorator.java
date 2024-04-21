package com.example.shop.DiscountDecorator;

public abstract class PricingDecorator implements PricingService {
    protected PricingService decoratedService;

    public PricingDecorator(PricingService decoratedService) {
        this.decoratedService = decoratedService;
    }

    public double calculatePriceWithDiscount(double price, int points, String tier) {
        return decoratedService.calculatePriceWithDiscount(price, points, tier);
    }
}

