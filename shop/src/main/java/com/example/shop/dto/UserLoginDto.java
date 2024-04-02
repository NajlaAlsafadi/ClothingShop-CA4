package com.example.shop.dto;

import com.example.shop.entity.Role;

import lombok.Data;

@Data
public class UserLoginDto {
    private Long id;
    private String username;
    private String email;
    private Role role;

    
}
