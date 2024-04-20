package com.example.shop.ProductCommand;

import org.springframework.http.ResponseEntity;
import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;

public class UpdateProductCommand implements Command {
    private Long productId;
    private Product productDetails;
    private ProductRepository repository;

    public UpdateProductCommand(Long productId, Product productDetails, ProductRepository repository) {
        this.productId = productId;
        this.productDetails = productDetails;
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> execute() {
        return repository.findById(productId)
                .map(existingProduct -> {
                    existingProduct.setTitle(productDetails.getTitle());
                    existingProduct.setManufacturer(productDetails.getManufacturer());
                    existingProduct.setPrice(productDetails.getPrice());
                    existingProduct.setDescription(productDetails.getDescription());
                    existingProduct.setCategory(productDetails.getCategory());
                    existingProduct.setImageUrl(productDetails.getImageUrl());
                    existingProduct.setQuantity(productDetails.getQuantity());
                    repository.save(existingProduct);
                    return ResponseEntity.ok(existingProduct);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
