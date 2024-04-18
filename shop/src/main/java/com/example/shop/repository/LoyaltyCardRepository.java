package com.example.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.shop.entity.LoyaltyCard;

@Repository
public interface LoyaltyCardRepository extends JpaRepository<LoyaltyCard, Long> {
    LoyaltyCard findByCustomerId(Long customerId);
}

