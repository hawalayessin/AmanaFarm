package com.example.amanafarm_backend.controller;

import com.example.amanafarm_backend.model.Worker;
import com.example.amanafarm_backend.repository.WorkerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin("*")
public class WorkerController {

    private final WorkerRepository workerRepository;

    public WorkerController(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    @GetMapping
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Worker getWorkerById(@PathVariable Long id) {
        return workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
    }

    @GetMapping("/search")
    public List<Worker> searchWorkers(@RequestParam String q) {
        return workerRepository.findByTitleContainingIgnoreCaseOrSkillsContainingIgnoreCase(q, q);
    }

    @GetMapping("/region")
    public List<Worker> getWorkersByRegion(@RequestParam String region) {
        return workerRepository.findByLocationContainingIgnoreCase(region);
    }

    @GetMapping("/available")
    public List<Worker> getAvailableWorkers() {
        return workerRepository.findByAvailableTrue();
    }

    @PostMapping
    public Worker createWorker(@RequestBody Worker worker) {
        return workerRepository.save(worker);
    }

    @PutMapping("/{id}")
    public Worker updateWorker(@PathVariable Long id, @RequestBody Worker data) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        worker.setName(data.getName());
        worker.setTitle(data.getTitle());
        worker.setLocation(data.getLocation());
        worker.setExperience(data.getExperience());
        worker.setRating(data.getRating());
        worker.setReviewCount(data.getReviewCount());
        worker.setCompletedJobs(data.getCompletedJobs());
        worker.setResponseTime(data.getResponseTime());
        worker.setPrice(data.getPrice());
        worker.setPriceUnit(data.getPriceUnit());
        worker.setAvailable(data.getAvailable());
        worker.setSkills(data.getSkills());
        worker.setAvatarUrl(data.getAvatarUrl());
        worker.setCoverUrl(data.getCoverUrl());
        worker.setDescription(data.getDescription());

        return workerRepository.save(worker);
    }

    @DeleteMapping("/{id}")
    public String deleteWorker(@PathVariable Long id) {
        workerRepository.deleteById(id);
        return "Worker deleted successfully";
    }
}
