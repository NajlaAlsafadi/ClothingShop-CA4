package com.example.shop.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.entity.Customer;
import com.example.shop.entity.LoyaltyCard;
import com.example.shop.repository.CustomerRepository;
import com.example.shop.repository.LoyaltyCardRepository;

@Service
public class LoyaltyCardService {

    @Autowired
    private LoyaltyCardRepository loyaltyCardRepository;
    @Autowired
    private CustomerRepository customerRepository;


  public void updatePoints(Long customerId, Double amountSpent) {
    LoyaltyCard card = loyaltyCardRepository.findByCustomerId(customerId);
    if (card == null) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        card = new LoyaltyCard();
        card.setCustomer(customer);
        card.setPoints(0);
        card.setTier("Bronze");
        loyaltyCardRepository.save(card);
    }
    int pointsToAdd = calculatePoints(amountSpent, card.getTier());
    card.addPoints(pointsToAdd);
    loyaltyCardRepository.save(card);
}


    private int calculatePoints(Double amount, String tier) {
        //1 point per 1 euro spent
        int basePoint = (int)(amount / 1); 
        switch (tier) { 

            //10% more points for silver
            case "Silver": return (int)(basePoint * 1.1);
            
            //25% more points for gold
            case "Gold": return (int)(basePoint * 1.25); 
            default: return basePoint;
        }
    }

    public void usePoints(Long customerId, int pointsUsed) {
        LoyaltyCard card = loyaltyCardRepository.findByCustomerId(customerId);
        if (card != null && card.getPoints() >= pointsUsed) {
            card.setPoints(card.getPoints() - pointsUsed);
            loyaltyCardRepository.save(card);
        } else {
            throw new IllegalArgumentException("Not enough loyalty points");
        }
    }
    
}
