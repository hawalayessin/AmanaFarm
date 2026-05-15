package com.example.amanafarm_backend.controller;

import com.example.amanafarm_backend.model.JobOffer;
import com.example.amanafarm_backend.repository.JobOfferRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobOfferController {

    private final JobOfferRepository jobOfferRepository;

    public JobOfferController(JobOfferRepository jobOfferRepository) {
        this.jobOfferRepository = jobOfferRepository;
    }

    @GetMapping
    public List<JobOffer> getAllJobs() {
        return jobOfferRepository.findAll();
    }

    @GetMapping("/{id}")
    public JobOffer getJobById(@PathVariable Long id) {
        return jobOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    @GetMapping("/search")
    public List<JobOffer> searchJobs(@RequestParam String q) {
        return jobOfferRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
    }

    @GetMapping("/region")
    public List<JobOffer> getJobsByRegion(@RequestParam String region) {
        return jobOfferRepository.findByLocationContainingIgnoreCase(region);
    }

    @PostMapping
    public JobOffer createJob(@RequestBody JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobOfferRepository.deleteById(id);
        return "Job deleted successfully";
    }
}
