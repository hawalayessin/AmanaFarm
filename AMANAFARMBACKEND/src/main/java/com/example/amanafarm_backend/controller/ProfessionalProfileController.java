package com.example.amanafarm_backend.controller;

import com.example.amanafarm_backend.model.ProfessionalProfile;
import com.example.amanafarm_backend.repository.ProfessionalProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin("*")
public class ProfessionalProfileController {

    private final ProfessionalProfileRepository repository;

    public ProfessionalProfileController(ProfessionalProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ProfessionalProfile> getAllProfiles() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ProfessionalProfile getProfileById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    @PostMapping
    public ProfessionalProfile createProfile(@RequestBody ProfessionalProfile profile) {
        profile.setStatus("PENDING_REVIEW");
        profile.setCreatedAt(LocalDateTime.now());
        return repository.save(profile);
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        repository.deleteById(id);
        return "Profile deleted successfully";
    }
}
