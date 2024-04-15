
package com.example.shop.dto;
import lombok.Data;

@Data
public class ProductReviewDto {
    private Long id;
    private int rating;
    private String comment;
    private Long productId;
    private Long customerId;
    private String username;

}
