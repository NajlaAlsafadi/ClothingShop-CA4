package com.example.shop.service;

import com.example.shop.ProductCommand.Command;
import com.example.shop.ProductCommand.CommandFactory;
import com.example.shop.ProductCommand.CommandHandler;
import com.example.shop.SearchStrategy.ProductSearchContext;
import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSearchContext searchContext;
    @Autowired
    private CommandHandler commandHandler;

    @Autowired
    private CommandFactory commandFactory;


    public Page<Product> searchProducts(String type, String searchTerm, Pageable pageable) {
        return searchContext.search(type, searchTerm, pageable); 
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

    public ResponseEntity<?> createProduct(Product product) {
        Command addCommand = commandFactory.createAddProductCommand(product);
        return commandHandler.executeCommand(addCommand);
    }

    public ResponseEntity<?> updateProductDetails(Long id, Product productDetails) {
        Command updateCommand = commandFactory.createUpdateProductCommand(id, productDetails);
        return commandHandler.executeCommand(updateCommand);
    }

    public ResponseEntity<?> deleteProduct(Long id) {
        Command deleteCommand = commandFactory.createDeleteProductCommand(id);
        return commandHandler.executeCommand(deleteCommand);
    }
}

