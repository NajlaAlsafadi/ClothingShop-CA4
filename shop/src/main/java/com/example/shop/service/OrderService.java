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

@Service
public class OrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public PurchaseOrder processOrder(OrderConfirmationDto orderDto) {
        Customer customer = customerRepository.findById(orderDto.getCustomerId())
            .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        PaymentMethod paymentMethod = customer.getPaymentMethods().stream()
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("No payment method available"));

        // Check payment validity
        if (!paymentMethod.matchesCVV(orderDto.getCvv())) {
            throw new IllegalArgumentException("Invalid CVV");
        }
        if (!paymentMethod.matchesCardNumber(orderDto.getCardNumber())) {
            throw new IllegalArgumentException("Invalid card number");
        }
        if (!paymentMethod.isNotExpired()) {
            throw new IllegalArgumentException("Card has expired");
        }

        PurchaseOrder order = createAndFillOrder(customer, orderDto);
        purchaseOrderRepository.save(order);
        return order;
    }

    private PurchaseOrder createAndFillOrder(Customer customer, OrderConfirmationDto orderDto) {
        PurchaseOrder order = new PurchaseOrder();
        order.setCustomer(customer);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.NOT_PAID);
        order.setOrderDate(new Date());

        fillOrderItems(order, orderDto.getItems());
        order.setPaymentStatus(PaymentStatus.PAID);
        return order;
    }

    private void fillOrderItems(PurchaseOrder order, List<ItemDto> items) {
        items.forEach(itemDto -> {
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
        });
    }
}


