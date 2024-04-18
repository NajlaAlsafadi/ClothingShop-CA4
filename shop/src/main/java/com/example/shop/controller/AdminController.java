package com.example.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.shop.entity.Admin;
import com.example.shop.repository.AdminRepository;
import com.example.shop.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
      @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/create")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.registerNewAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @GetMapping("/{adminId}")
    public ResponseEntity<?> getAdminById(@PathVariable Long adminId) {
        return adminRepository.findById(adminId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
