package com.example.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.shop.entity.ProductReview;
import com.example.shop.repository.ProductReviewRepository;
import com.example.shop.dto.ProductReviewDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductReviewService {

    @Autowired
    private ProductReviewRepository productReviewRepository;

    public ProductReview saveReview(ProductReview review) {
        return productReviewRepository.save(review);
    }

    public List<ProductReviewDto> getReviewsByProductId(Long productId) {
        return productReviewRepository.findByProductId(productId)
                                      .stream()
                                      .map(this::convertToDTO)
                                      .collect(Collectors.toList());
    }

    public ProductReviewDto convertToDTO(ProductReview review) {
        ProductReviewDto dto = new ProductReviewDto();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setProductId(review.getProduct().getId());
        dto.setCustomerId(review.getCustomer().getId());
        dto.setUsername(review.getCustomer().getUsername());
        return dto;
    }
}
