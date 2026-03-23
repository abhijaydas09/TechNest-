package com.example.tecknest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    private String category;

    @Column(nullable = false)
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private Integer stock = 0;

    private Double rating = 0.0;
}

