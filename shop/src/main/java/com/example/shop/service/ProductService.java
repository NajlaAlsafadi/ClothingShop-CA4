package com.example.shop.service;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> searchProducts(String searchTerm, Pageable pageable) {
        return productRepository.searchByTitleCategoryManufacturer(searchTerm, pageable);
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
    
}

