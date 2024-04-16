package com.example.shop.entity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cardNumber; 
    private String expiryDate;
    private String cvv; 
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public boolean matchesCVV(String cvv) {
        return this.cvv.equals(cvv);
    }
    
    public boolean matchesCardNumber(String cardNumber) {
        return this.cardNumber.replaceAll("\\s", "").equals(cardNumber.replaceAll("\\s", ""));
    }
    
    public boolean isNotExpired() {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/yy");
        sdf.setLenient(false);
        try {
            Date expDate = sdf.parse(this.expiryDate);
            return expDate.after(new Date());
        } catch (ParseException e) {
            return false;
        }
    }
    
}
