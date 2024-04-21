package com.example.shop.DiscountDecorator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.shop.entity.Customer;
import com.example.shop.entity.LoyaltyCard;
import com.example.shop.repository.LoyaltyCardRepository;

@Service
public class CheckoutService {

    @Autowired
    private LoyaltyCardRepository loyaltyCardRepository;
    
    public double checkout(Customer customer, double price, int pointsUsed) {
        LoyaltyCard card = loyaltyCardRepository.findByCustomerId(customer.getId());
        if (card != null) {
            //subtract the points used as direct euro discounts
            double priceAfterPoints = price - pointsUsed;

            //price does not go negative
            priceAfterPoints = Math.max(0, priceAfterPoints);

            //additional discounts based on the loyalty tier applied
            PricingService pricingService = new BasicPricingService();
            if ("Silver".equals(card.getTier())) {
                pricingService = new SilverTierPricingDecorator(pricingService);
            } else if ("Gold".equals(card.getTier())) {
                pricingService = new GoldTierPricingDecorator(pricingService);
            }

            return pricingService.calculatePriceWithDiscount(priceAfterPoints, card.getPoints(), card.getTier());
        }
        return price;
    }
}
