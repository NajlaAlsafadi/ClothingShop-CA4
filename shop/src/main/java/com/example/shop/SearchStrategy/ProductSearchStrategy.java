package com.example.shop.SearchStrategy;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.shop.entity.Product;

public interface ProductSearchStrategy {
    Page<Product> searchProducts(String searchTerm, Pageable pageable);
}