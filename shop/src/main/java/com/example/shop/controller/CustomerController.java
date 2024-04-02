package com.example.shop.controller;

import com.example.shop.entity.Customer;
import com.example.shop.dto.CustomerRegistrationDto;
import com.example.shop.entity.Address;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<Customer> registerCustomer(@RequestBody CustomerRegistrationDto registrationDto) {
        //set fields fields from DTO
        Customer customer = new Customer();
        customer.setUsername(registrationDto.getUsername());
        customer.setPassword(registrationDto.getPassword());
        customer.setEmail(registrationDto.getEmail());
        
        Address address = new Address();
        address.setStreet(registrationDto.getStreet());
        address.setCity(registrationDto.getCity());
        address.setZipCode(registrationDto.getZipCode());
        address.setCountry(registrationDto.getCountry());

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setCardNumber(registrationDto.getCardNumber());
        paymentMethod.setExpiryDate(registrationDto.getExpiryDate());
        paymentMethod.setCvv(registrationDto.getCvv());
        
        Customer savedCustomer = customerService.registerNewCustomer(customer, address, paymentMethod);
        return ResponseEntity.ok(savedCustomer);
    }
}
