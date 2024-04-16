package com.example.shop.repository;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shop.entity.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    
    List<PurchaseOrder> findByCustomerId(Long customerId);
    void deleteAll(Set<PurchaseOrder> purchaseOrders);
}
