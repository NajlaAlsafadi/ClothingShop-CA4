package com.example.shop.service;

import com.example.shop.dto.UserLoginDto;
import com.example.shop.repository.BaseUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private BaseUserRepository baseUserRepository;

    public Optional<UserLoginDto> authenticateUser(String email, String password) {
        return baseUserRepository.findByEmailAndPassword(email, password)
                .map(user -> {
                    UserLoginDto dto = new UserLoginDto();
                    dto.setId(user.getId());
                    dto.setUsername(user.getUsername());
                    dto.setEmail(user.getEmail());
                    dto.setRole(user.getRole());
                    return dto;
                });
    }
}


