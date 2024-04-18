package com.example.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.dto.OrderConfirmationDto;
import com.example.shop.dto.OrderConfirmationDto.ItemDto;
import com.example.shop.entity.Customer;
import com.example.shop.entity.OrderStatus;
import com.example.shop.entity.PaymentMethod;
import com.example.shop.entity.PaymentStatus;
import com.example.shop.entity.Product;
import com.example.shop.entity.PurchaseItem;
import com.example.shop.entity.PurchaseOrder;
import com.example.shop.repository.CustomerRepository;
import com.example.shop.repository.ProductRepository;
import com.example.shop.repository.PurchaseOrderRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private LoyaltyCardService loyaltyCardService; 

    @Transactional
public PurchaseOrder processOrder(OrderConfirmationDto orderDto) {
    Customer customer = customerRepository.findById(orderDto.getCustomerId())
        .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    
    PaymentMethod paymentMethod = customer.getPaymentMethods().stream()
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("No payment method available"));
    
    if (!paymentMethod.matchesCVV(orderDto.getCvv())) {
        throw new IllegalArgumentException("Invalid CVV");
    }
    if (!paymentMethod.isNotExpired()) {
        throw new IllegalArgumentException("Card has expired");
    }
    double totalAmount = 0;
    for (OrderConfirmationDto.ItemDto item : orderDto.getItems()) {
        Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        totalAmount += item.getQuantity() * product.getPrice(); 
    }
    PurchaseOrder order = new PurchaseOrder();
    order.setCustomer(customer);
    order.setOrderStatus(OrderStatus.PENDING);
    order.setPaymentStatus(PaymentStatus.NOT_PAID);
    order.setOrderDate(new Date());
    order.setTotalAmount(orderDto.getTotalAmount()); 


    loyaltyCardService.updatePoints(customer.getId(), orderDto.getTotalAmount());
    fillOrderItems(order, orderDto.getItems());
    order.setPaymentStatus(PaymentStatus.PAID);
    purchaseOrderRepository.save(order); 
    return order;
}

    

    private void fillOrderItems(PurchaseOrder order, List<ItemDto> items) {
        for (ItemDto itemDto : items) {
            Product product = productRepository.findById(itemDto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            if (product.getQuantity() < itemDto.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product: " + product.getTitle());
            }
            
            product.setQuantity(product.getQuantity() - itemDto.getQuantity());
            productRepository.save(product);
    
            PurchaseItem purchaseItem = new PurchaseItem();
            purchaseItem.setProduct(product);
            purchaseItem.setOrder(order);
            purchaseItem.setQuantity(itemDto.getQuantity());
            order.getQuantities().add(purchaseItem);
    
           
            purchaseItem.setOrder(order);
        }
     
        purchaseOrderRepository.save(order);
    }
   
public PurchaseOrder updateOrderStatus(Long orderId, OrderStatus newStatus) {
    PurchaseOrder order = purchaseOrderRepository.findById(orderId)
        .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    order.setOrderStatus(newStatus);
    return purchaseOrderRepository.save(order);
}

}


