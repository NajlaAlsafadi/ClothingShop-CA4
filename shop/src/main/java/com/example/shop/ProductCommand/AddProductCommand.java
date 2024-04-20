package com.example.shop.ProductCommand;

import org.springframework.http.ResponseEntity;
import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;

public class AddProductCommand implements Command {
    
    private Product product;
    private ProductRepository repository;

    public AddProductCommand(Product product, ProductRepository repository) {
        this.product = product;
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> execute() {
        Product savedProduct = repository.save(product);
        return ResponseEntity.ok(savedProduct);
    }
}
