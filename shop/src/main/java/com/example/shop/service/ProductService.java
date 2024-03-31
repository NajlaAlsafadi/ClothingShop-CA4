package com.example.shop.service;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> searchProducts(String searchTerm) {
        return productRepository.findByTitleContainingIgnoreCase(searchTerm);

    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
    
}

