package com.example.shop.dto;


import lombok.Data;

@Data
public class CVVValidationDto {
    private String cardNumber;
    private String cvv;
    private Long customerId; 
}
