package com.example.shop.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.shop.entity.LoyaltyCard;
import com.example.shop.repository.LoyaltyCardRepository;
import com.example.shop.service.LoyaltyCardService;

@RestController
@RequestMapping("/api/loyalty")
public class LoyaltyCardController {

    @Autowired
    private LoyaltyCardRepository loyaltyCardRepository;

    @Autowired
    private LoyaltyCardService loyaltyCardService;

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getLoyaltyCardByCustomerId(@PathVariable Long customerId) {
        LoyaltyCard card = loyaltyCardRepository.findByCustomerId(customerId);
        if (card != null) {
            return ResponseEntity.ok(card);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{customerId}/use-points")
public ResponseEntity<?> useLoyaltyPoints(@PathVariable Long customerId, @RequestBody Map<String, Integer> pointsDetails) {
    try {
        loyaltyCardService.usePoints(customerId, pointsDetails.get("points"));
        return ResponseEntity.ok().build();
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

}
