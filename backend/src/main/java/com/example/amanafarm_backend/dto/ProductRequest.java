package com.example.amanafarm_backend.dto;
import lombok.Data;

@Data
public class ProductRequest {
    private String title;
    private String category;
    private String description;
    private Double price;
    private String unit;
    private String location;
    private String imageUrl;
    private String contactPhone;
    private Long userId;
}
