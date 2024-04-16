package com.example.shop.controller;

import com.example.shop.dto.CVVValidationDto;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @PostMapping("/validate-cvv")
    public ResponseEntity<?> validateCVV(@RequestBody CVVValidationDto validationDto) {
        PaymentMethod paymentMethod = paymentMethodRepository.findByCardNumber(validationDto.getCardNumber().replaceAll("\\s", ""))
                .orElseThrow(() -> new IllegalArgumentException("Card number not found"));

        if (!paymentMethod.matchesCVV(validationDto.getCvv())) {
            return ResponseEntity.badRequest().body("Invalid CVV");
        }
        if (!paymentMethod.isNotExpired()) {
            return ResponseEntity.badRequest().body("Card has expired");
        }
        return ResponseEntity.ok("CVV and card are valid");
    }
}