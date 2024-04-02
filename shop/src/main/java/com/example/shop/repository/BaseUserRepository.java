package com.example.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.BaseUser;
import java.util.Optional;


public interface BaseUserRepository extends JpaRepository<BaseUser, Long> {
    Optional<BaseUser> findByEmailAndPassword(String email, String password);
}
