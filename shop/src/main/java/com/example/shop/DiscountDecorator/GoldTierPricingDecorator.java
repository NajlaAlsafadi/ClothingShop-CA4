package com.example.shop.DiscountDecorator;

public class GoldTierPricingDecorator extends PricingDecorator {
    public GoldTierPricingDecorator(PricingService decoratedService) {
        super(decoratedService);
    }

    @Override
    public double calculatePriceWithDiscount(double price, int points, String tier) {
        price = super.calculatePriceWithDiscount(price, points, tier);
        if ("Gold".equals(tier)) {
            //10%
            price *= 0.90;
        }
        return price;
    }
}