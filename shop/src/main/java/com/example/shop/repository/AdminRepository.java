package com.example.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}