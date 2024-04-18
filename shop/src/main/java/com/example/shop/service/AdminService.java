package com.example.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.entity.Admin;
import com.example.shop.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

 

    public Admin registerNewAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
