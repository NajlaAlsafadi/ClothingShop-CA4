package com.example.shop.controller;

import com.example.shop.entity.Customer;
import com.example.shop.dto.CustomerDetailsDto;
import com.example.shop.dto.CustomerRegistrationDto;
import com.example.shop.entity.Address;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.service.CustomerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @GetMapping("/{customerId}/address")
    public ResponseEntity<?> getAddress(@PathVariable Long customerId) {
    try {
        Address address = customerService.getAddressByCustomerId(customerId);
        return ResponseEntity.ok(address);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Address not found: " + e.getMessage());
    }
}

    @GetMapping("/{customerId}/details")
    public ResponseEntity<CustomerDetailsDto> getCustomerDetails(@PathVariable Long customerId) {
        CustomerDetailsDto customerDetails = customerService.getCustomerDetails(customerId);
        if (customerDetails == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customerDetails);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        if (customers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(customers);
    }
   @DeleteMapping("/{customerId}")
public ResponseEntity<?> deleteCustomer(@PathVariable Long customerId) {
    try {
        customerService.deleteCustomer(customerId);
        return ResponseEntity.ok().build();
    } catch (IllegalArgumentException e) {
        return ResponseEntity.notFound().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting customer: " + e.getMessage());
    }
}
}



