package com.example.amanafarm_backend.dto;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data @Builder
public class ProductResponse {
    private Long id;
    private String title;
    private String category;
    private String description;
    private Double price;
    private String unit;
    private String location;
    private String imageUrl;
    private String contactPhone;
    private Long userId;
    private LocalDateTime createdAt;
}
