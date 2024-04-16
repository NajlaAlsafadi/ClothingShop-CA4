package com.example.shop.service;

import com.example.shop.entity.Customer;
import com.example.shop.dto.CustomerDetailsDto;
import com.example.shop.entity.Address;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.entity.PurchaseOrder;
import com.example.shop.entity.Role;
import com.example.shop.repository.CustomerRepository;
import com.example.shop.repository.AddressRepository;
import com.example.shop.repository.PaymentMethodRepository;
import com.example.shop.repository.PurchaseOrderRepository;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {
    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public Customer registerNewCustomer(Customer customer, Address shippingAddress, PaymentMethod paymentMethod) {
        //Save customer details
        customer.setRole(Role.CUSTOMER);
        Customer savedCustomer = customerRepository.save(customer);

        shippingAddress.setCustomer(savedCustomer);
        addressRepository.save(shippingAddress);

        paymentMethod.setCustomer(savedCustomer);
        paymentMethodRepository.save(paymentMethod);
        
        return savedCustomer;
    }

     public Address getAddressByCustomerId(Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent() && customer.get().getShippingAddress() != null) {
            return customer.get().getShippingAddress();
        } else {
            throw new IllegalArgumentException("No address found for customer id: " + customerId);
        }
    }
     public CustomerDetailsDto getCustomerDetails(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return null;
        }
        Address address = customer.getShippingAddress();
        List<PurchaseOrder> orders = purchaseOrderRepository.findByCustomerId(customerId);
        return new CustomerDetailsDto(customer, address, orders);
    }
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    @Transactional
    public void deleteCustomer(Long customerId) {
        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        if (!customerOpt.isPresent()) {
            throw new IllegalArgumentException("Customer not found with ID: " + customerId);
        }
        Customer customer = customerOpt.get();

        purchaseOrderRepository.deleteAll(customer.getPurchaseOrders());

        customerRepository.delete(customer);
    }
}
