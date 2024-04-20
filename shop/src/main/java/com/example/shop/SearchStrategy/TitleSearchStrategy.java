package com.example.shop.SearchStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;

@Component("titleSearchStrategy")
public class TitleSearchStrategy implements ProductSearchStrategy {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<Product> searchProducts(String searchTerm, Pageable pageable) {
        return productRepository.findByTitleContainingIgnoreCase(searchTerm, pageable);
    }
}
