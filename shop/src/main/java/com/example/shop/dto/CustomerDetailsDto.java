package com.example.shop.dto;

import com.example.shop.entity.Address;
import com.example.shop.entity.Customer;
import com.example.shop.entity.PurchaseOrder;
import lombok.Value;

import java.util.List;

@Value
public class CustomerDetailsDto {
    Long id;
    String username;
    String email;
    Address address;
    List<PurchaseOrder> orders;

    public CustomerDetailsDto(Customer customer, Address address, List<PurchaseOrder> orders) {
        this.id = customer.getId();
        this.username = customer.getUsername();
        this.email = customer.getEmail();
        this.address = address;  
        this.orders = orders;
    }
}
