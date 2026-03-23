package com.example.tecknest.dto;



import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String brand;
    private String category;
    private Double price;
    private String description;
    private String imageUrl;
    private Integer stock;
    private Double rating;
}