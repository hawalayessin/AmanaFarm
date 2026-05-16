package com.example.amanafarm_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ProfessionalProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String region;
    private String serviceType;

    @Column(length = 2000)
    private String experienceDescription;

    private Integer price;
    private String period;
    private String availability;
    private String plan;
    private String status;
    private LocalDateTime createdAt;

    public ProfessionalProfile() {
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getRegion() { return region; }
    public String getServiceType() { return serviceType; }
    public String getExperienceDescription() { return experienceDescription; }
    public Integer getPrice() { return price; }
    public String getPeriod() { return period; }
    public String getAvailability() { return availability; }
    public String getPlan() { return plan; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setRegion(String region) { this.region = region; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public void setExperienceDescription(String experienceDescription) { this.experienceDescription = experienceDescription; }
    public void setPrice(Integer price) { this.price = price; }
    public void setPeriod(String period) { this.period = period; }
    public void setAvailability(String availability) { this.availability = availability; }
    public void setPlan(String plan) { this.plan = plan; }
    public void setStatus(String status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
