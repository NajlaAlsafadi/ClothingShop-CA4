package com.example.shop.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderConfirmationDto {
    private Long customerId;
    private String CardNumber;
    private String cvv;
    private List<ItemDto> items;

   
    @Data
    public static class ItemDto {
        private Long productId;
        private Integer quantity;

       
    }


}


