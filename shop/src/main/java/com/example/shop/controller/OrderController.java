package com.example.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.shop.dto.OrderConfirmationDto;
import com.example.shop.entity.PurchaseOrder;
import com.example.shop.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

       @PostMapping("/confirm")
    public ResponseEntity<?> confirmOrder(@RequestBody OrderConfirmationDto orderDto) {
        try {
            PurchaseOrder order = orderService.processOrder(orderDto);
            return ResponseEntity.ok("Order confirmed and processed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
