package com.example.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.BaseUser;

public interface BaseUserRepository extends JpaRepository<BaseUser, Long> {
}
