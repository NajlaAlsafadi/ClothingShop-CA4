package com.example.shop.ProductCommand;

import org.springframework.http.ResponseEntity;
import com.example.shop.repository.ProductRepository;

public class DeleteProductCommand implements Command {
    private Long productId;
    private ProductRepository repository;

    public DeleteProductCommand(Long productId, ProductRepository repository) {
        this.productId = productId;
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> execute() {
        return repository.findById(productId).map(product -> {
            repository.delete(product);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
