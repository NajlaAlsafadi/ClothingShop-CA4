package com.example.shop.ProductCommand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;

@Component
public class CommandFactory {

    private ProductRepository repository;

    @Autowired
    public CommandFactory(ProductRepository repository) {
        this.repository = repository;
    }

    public Command createAddProductCommand(Product product) {
        return new AddProductCommand(product, repository);
    }

    public Command createUpdateProductCommand(Long productId, Product productDetails) {
        return new UpdateProductCommand(productId, productDetails, repository);
    }

    public Command createDeleteProductCommand(Long productId) {
        return new DeleteProductCommand(productId, repository);
    }
}
