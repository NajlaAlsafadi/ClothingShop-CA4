package com.example.shop.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;

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

    @GetMapping("/{id}")
public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    return productService.findById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
}

@PostMapping("/updateQuantity/{id}")
public ResponseEntity<Product> updateProductStock(@PathVariable Long id, @RequestBody Integer newQuantity) {
    return productService.updateProductQuantity(id, newQuantity)
        .map(updatedProduct -> ResponseEntity.ok(updatedProduct))
        .orElseGet(() -> ResponseEntity.notFound().build());
}
@PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }
@PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProductDetails(@PathVariable Long id, @RequestBody Product productDetails) {
        return productService.updateProductDetails(id, productDetails)
            .map(updatedProduct -> ResponseEntity.ok(updatedProduct))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}