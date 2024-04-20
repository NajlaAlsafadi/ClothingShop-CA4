package com.example.shop.ProductCommand;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class CommandHandler {
    public ResponseEntity<?> executeCommand(Command command) {
        return command.execute();
    }
}