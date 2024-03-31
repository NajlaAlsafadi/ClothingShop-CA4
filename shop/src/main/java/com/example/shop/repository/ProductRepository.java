package com.example.shop.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.shop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT p FROM Product p WHERE " +
       "LOWER(p.title) LIKE LOWER(CONCAT('%',:searchTerm,'%')) OR " +
       "LOWER(p.category) LIKE LOWER(CONCAT('%',:searchTerm,'%')) OR " +
       "LOWER(p.manufacturer) LIKE LOWER(CONCAT('%',:searchTerm,'%'))")
    Page<Product> searchByTitleCategoryManufacturer(@Param("searchTerm") String searchTerm, Pageable pageable);
}
