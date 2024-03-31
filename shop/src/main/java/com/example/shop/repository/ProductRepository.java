package com.example.shop.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainingIgnoreCase(String title);
}
