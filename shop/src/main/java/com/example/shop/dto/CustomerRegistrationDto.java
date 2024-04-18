package com.example.shop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CustomerRegistrationDto {
    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$", message = "Password must contain at least 6 characters, including letters and numbers")
    private String password;

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Zip Code is required")
    @Pattern(regexp = "^[a-zA-Z0-9]{6,8}$", message = "Zip code must be 6-8 letters/numbers")
    private String zipCode;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Card number is required")
    @Pattern(regexp = "^\\d{16}$", message = "Card number must be 16 digits")
    private String cardNumber;

    @NotBlank(message = "Expiry date is required")
    private String expiryDate; 

    @NotBlank(message = "CVV is required")
    @Pattern(regexp = "^\\d{3}$", message = "CVV must be 3 digits")
    private String cvv;
}
