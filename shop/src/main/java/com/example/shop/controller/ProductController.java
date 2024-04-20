package com.example.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.example.shop.ProductCommand.Command;
import com.example.shop.ProductCommand.CommandFactory;
import com.example.shop.ProductCommand.CommandHandler;



@RestController
@RequestMapping("/api/products")
public class ProductController {


    @Autowired
    private ProductService productService;

    @Autowired
    private CommandHandler commandHandler;

    @Autowired
    private CommandFactory commandFactory;


    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String type, @RequestParam String searchTerm,
                                        @PageableDefault(sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
        return productService.searchProducts(type, searchTerm, pageable);
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
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        Command addCommand = commandFactory.createAddProductCommand(product);
        return commandHandler.executeCommand(addCommand);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Command updateCommand = commandFactory.createUpdateProductCommand(id, productDetails);
        return commandHandler.executeCommand(updateCommand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Command deleteCommand = commandFactory.createDeleteProductCommand(id);
        return commandHandler.executeCommand(deleteCommand);
    }
}