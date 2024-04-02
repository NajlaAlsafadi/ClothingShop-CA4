package com.example.shop.service;

import com.example.shop.entity.Customer;
import com.example.shop.entity.Address;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.entity.Role;
import com.example.shop.repository.CustomerRepository;
import com.example.shop.repository.AddressRepository;
import com.example.shop.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public Customer registerNewCustomer(Customer customer, Address address, PaymentMethod paymentMethod) {
        //Save customer details
        customer.setRole(Role.CUSTOMER);
        Customer savedCustomer = customerRepository.save(customer);

        address.setCustomer(savedCustomer);
        addressRepository.save(address);

        paymentMethod.setCustomer(savedCustomer);
        paymentMethodRepository.save(paymentMethod);
        
        return savedCustomer;
    }
}
