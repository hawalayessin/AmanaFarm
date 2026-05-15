package com.example.amanafarm_backend.controller;

import com.example.amanafarm_backend.dto.AnimalRequest;
import com.example.amanafarm_backend.dto.AnimalResponse;
import com.example.amanafarm_backend.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnimalController {

    private final AnimalService animalService;

    @PostMapping
    public AnimalResponse createAnimal(@RequestBody AnimalRequest request) {
        return animalService.createAnimal(request);
    }

    @GetMapping
    public List<AnimalResponse> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/{id}")
    public AnimalResponse getAnimalById(@PathVariable Long id) {
        return animalService.getAnimalById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return "Animal deleted successfully";
    }
}
