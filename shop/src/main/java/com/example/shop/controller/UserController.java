package com.example.shop.controller;

import com.example.shop.dto.UserLoginDto;
import com.example.shop.entity.BaseUser;
import com.example.shop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserLoginDto> login(@RequestBody BaseUser loginRequest) {
        return userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())
                .map(dto -> ResponseEntity.ok().body(dto))
                .orElseGet(() -> ResponseEntity.status(401).build());
    }
}

