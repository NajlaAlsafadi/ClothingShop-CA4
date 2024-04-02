package com.example.shop.dto;

import lombok.Data;

@Data
public class CustomerRegistrationDto {
    private String username;
    private String email;
    private String password;
    private String street;
    private String city;
    private String zipCode;
    private String country;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
}
