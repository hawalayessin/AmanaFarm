package com.example.amanafarm_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Product() {}

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getUnit() { return unit; }
    public String getLocation() { return location; }
    public String getImageUrl() { return imageUrl; }
    public String getContactPhone() { return contactPhone; }
    public Long getUserId() { return userId; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(Double price) { this.price = price; }
    public void setUnit(String unit) { this.unit = unit; }
    public void setLocation(String location) { this.location = location; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    public void prePersist() { createdAt = LocalDateTime.now(); }
}
