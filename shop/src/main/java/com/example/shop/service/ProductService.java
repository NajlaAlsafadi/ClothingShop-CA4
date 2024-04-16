package com.example.shop.service;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;

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
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }
    public Optional<Product> updateProductQuantity(Long id, Integer newQuantity) {
        return productRepository.findById(id).map(product -> {
            product.setQuantity(newQuantity);
            return productRepository.save(product);
        });
    }
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> updateProductDetails(Long id, Product productDetails) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setTitle(productDetails.getTitle());
            existingProduct.setManufacturer(productDetails.getManufacturer());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setImageUrl(productDetails.getImageUrl());
            existingProduct.setQuantity(productDetails.getQuantity());
            return productRepository.save(existingProduct);
        });
    }
}

