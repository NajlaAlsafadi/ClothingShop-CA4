package com.example.shop.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.web.PageableDefault;
import com.example.shop.entity.Product;
import com.example.shop.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String searchTerm,
                                        @PageableDefault(sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
        return productService.searchProducts(searchTerm, pageable);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.findAllProducts();
    }
}