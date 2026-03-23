package com.example.tecknest.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user ;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private Double totalAmount;

    private String status = "PENDING";         // PENDING / SHIPPED / DELIVERED

    private String paymentId;

    private String paymentStatus = "UNPAID";   // UNPAID / PAID / FAILED

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}