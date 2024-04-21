package com.example.shop.DiscountDecorator;

public class SilverTierPricingDecorator extends PricingDecorator {
    public SilverTierPricingDecorator(PricingService decoratedService) {
        super(decoratedService);
    }

    @Override
    public double calculatePriceWithDiscount(double price, int points, String tier) {
        price = super.calculatePriceWithDiscount(price, points, tier);
        if ("Silver".equals(tier)) {
            //5%
            price *= 0.95; 
        }
        return price;
    }
}
