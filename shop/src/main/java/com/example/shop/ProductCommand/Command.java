package com.example.shop.ProductCommand;

import org.springframework.http.ResponseEntity;

public interface Command {
    ResponseEntity<?> execute();
}
