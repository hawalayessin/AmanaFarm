package com.example.amanafarm_backend.controller;

import com.example.amanafarm_backend.model.ServiceRequest;
import com.example.amanafarm_backend.repository.ServiceRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin("*")
public class ServiceRequestController {

    private final ServiceRequestRepository repository;

    public ServiceRequestController(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ServiceRequest> getAllRequests() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ServiceRequest getRequestById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    @PostMapping
    public ServiceRequest createRequest(@RequestBody ServiceRequest request) {
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        return repository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id) {
        repository.deleteById(id);
        return "Request deleted successfully";
    }
}
