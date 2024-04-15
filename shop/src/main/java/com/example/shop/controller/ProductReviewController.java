package com.example.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.shop.entity.Customer;
import com.example.shop.entity.Product;
import com.example.shop.entity.ProductReview;
import com.example.shop.repository.CustomerRepository;
import com.example.shop.repository.ProductRepository;
import com.example.shop.service.ProductReviewService;
import com.example.shop.dto.ProductReviewDto;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductReviewController {

    @Autowired
    private ProductReviewService productReviewService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/{productId}/reviews")
    public ProductReviewDto addReview(@PathVariable Long productId, @RequestBody ProductReviewDto reviewDTO) {
        Customer customer = customerRepository.findById(reviewDTO.getCustomerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        ProductReview review = new ProductReview();
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setCustomer(customer);
        review.setProduct(product);

        ProductReview savedReview = productReviewService.saveReview(review);
        return productReviewService.convertToDTO(savedReview);
    }

    @GetMapping("/{productId}/reviews")
    public List<ProductReviewDto> getReviews(@PathVariable Long productId) {
        return productReviewService.getReviewsByProductId(productId);
    }
}
