package com.example.amanafarm_backend.service;

import com.example.amanafarm_backend.dto.AnimalRequest;
import com.example.amanafarm_backend.dto.AnimalResponse;
import com.example.amanafarm_backend.model.Animal;
import com.example.amanafarm_backend.model.AnimalImage;
import com.example.amanafarm_backend.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    public AnimalResponse createAnimal(AnimalRequest request) {
        Animal animal = Animal.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .priceType(request.getPriceType())
                .wilaya(request.getWilaya())
                .zone(request.getZone())
                .age(request.getAge())
                .gender(request.getGender())
                .healthStatus(request.getHealthStatus())
                .phone(request.getPhone())
                .contactMethod(request.getContactMethod())
                .deliveryAvailable(Boolean.TRUE.equals(request.getDeliveryAvailable()))
                .vetCertificate(Boolean.TRUE.equals(request.getVetCertificate()))
                .featured(Boolean.TRUE.equals(request.getFeatured()))
                .trustedSeller(Boolean.TRUE.equals(request.getTrustedSeller()))
                .status("ACTIVE")
                .userId(request.getUserId())
                .build();

        if (request.getImages() != null) {
            for (int i = 0; i < request.getImages().size(); i++) {
                AnimalImage image = AnimalImage.builder()
                        .imageUrl(request.getImages().get(i))
                        .isMain(i == 0)
                        .animal(animal)
                        .build();

                animal.getImages().add(image);
            }
        }

        return mapToResponse(animalRepository.save(animal));
    }

    public List<AnimalResponse> getAllAnimals() {
        return animalRepository.findByStatusOrderByCreatedAtDesc("ACTIVE")
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AnimalResponse getAnimalById(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found"));
        return mapToResponse(animal);
    }

    public void deleteAnimal(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found"));
        animal.setStatus("DELETED");
        animalRepository.save(animal);
    }

    private AnimalResponse mapToResponse(Animal animal) {
        return AnimalResponse.builder()
                .id(animal.getId())
                .title(animal.getTitle())
                .description(animal.getDescription())
                .category(animal.getCategory())
                .price(animal.getPrice())
                .priceType(animal.getPriceType())
                .wilaya(animal.getWilaya())
                .zone(animal.getZone())
                .age(animal.getAge())
                .gender(animal.getGender())
                .healthStatus(animal.getHealthStatus())
                .phone(animal.getPhone())
                .contactMethod(animal.getContactMethod())
                .deliveryAvailable(animal.getDeliveryAvailable())
                .vetCertificate(animal.getVetCertificate())
                .featured(animal.getFeatured())
                .trustedSeller(animal.getTrustedSeller())
                .status(animal.getStatus())
                .userId(animal.getUserId())
                .createdAt(animal.getCreatedAt())
                .images(
                        animal.getImages()
                                .stream()
                                .map(AnimalImage::getImageUrl)
                                .toList()
                )
                .build();
    }
}
