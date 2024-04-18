package com.example.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
  
    
    List<Address> findByCustomerId(Long customerId);
}

