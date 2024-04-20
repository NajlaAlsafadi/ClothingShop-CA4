package com.example.shop.SearchStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.shop.entity.Product;

@Service
public class ProductSearchContext {

    @Autowired
    @Qualifier("titleSearchStrategy")
    private ProductSearchStrategy titleSearchStrategy;

    @Autowired
    @Qualifier("categorySearchStrategy")
    private ProductSearchStrategy categorySearchStrategy;

    @Autowired
    @Qualifier("manufacturerSearchStrategy")
    private ProductSearchStrategy manufacturerSearchStrategy;

    public Page<Product> search(String type, String searchTerm, Pageable pageable) {
        switch (type.toLowerCase()) {
            case "title":
                return titleSearchStrategy.searchProducts(searchTerm, pageable);
            case "category":
                return categorySearchStrategy.searchProducts(searchTerm, pageable);
            case "manufacturer":
                return manufacturerSearchStrategy.searchProducts(searchTerm, pageable);
            default:
                throw new IllegalArgumentException("Invalid search type: " + type);
        }
    }
}
