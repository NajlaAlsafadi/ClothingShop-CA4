package com.example.shop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;


@Entity
@Data
public class LoyaltyCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    private Integer points;
    private String tier;

    public void addPoints(int pointsToAdd) {
        this.points += pointsToAdd;
        updateTier();
    }

    private void updateTier() {
        if (this.points >= 300) {
            this.tier = "Gold";
        } else if (this.points >= 150) {
            this.tier = "Silver";
        } else {
            this.tier = "Bronze";
        }
    }

}
