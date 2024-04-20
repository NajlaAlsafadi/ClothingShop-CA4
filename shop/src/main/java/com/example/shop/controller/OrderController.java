package com.example.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.shop.dto.OrderConfirmationDto;
import com.example.shop.entity.OrderStatus;
import com.example.shop.entity.PurchaseOrder;
import com.example.shop.service.OrderService;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @PostMapping("/confirm")
    public ResponseEntity<?> confirmOrder(@RequestBody OrderConfirmationDto orderDto) {
      
        if (orderDto.getCustomerId() == null) {
        
            return ResponseEntity.badRequest().body("Customer ID must not be null");
        }
        try {
            PurchaseOrder order = orderService.processOrder(orderDto);
          
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
          
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
    @PostMapping("/update-status/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> statusBody) {
        String action = statusBody.get("action");
        if (!"next".equals(action) && !"prev".equals(action)) {
            return ResponseEntity.badRequest().body(action);
        }

        try {
            PurchaseOrder order = orderService.updateOrderStatus(orderId, action);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid order status update request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order status: " + e.getMessage());
        }
    }
    
}
