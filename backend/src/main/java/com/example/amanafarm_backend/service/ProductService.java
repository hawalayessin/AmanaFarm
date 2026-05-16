package com.example.amanafarm_backend.service;
import com.example.amanafarm_backend.dto.ProductRequest;
import com.example.amanafarm_backend.dto.ProductResponse;
import com.example.amanafarm_backend.model.Product;
import com.example.amanafarm_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest req) {
        Product p = new Product();
        p.setTitle(req.getTitle());
        p.setCategory(req.getCategory());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        p.setUnit(req.getUnit());
        p.setLocation(req.getLocation());
        p.setImageUrl(req.getImageUrl());
        p.setContactPhone(req.getContactPhone());
        p.setUserId(req.getUserId());
        return mapToResponse(productRepository.save(p));
    }

    public ProductResponse updateProduct(Long id, ProductRequest req) {
        Product p = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        p.setTitle(req.getTitle());
        p.setCategory(req.getCategory());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        p.setUnit(req.getUnit());
        p.setLocation(req.getLocation());
        p.setImageUrl(req.getImageUrl());
        p.setContactPhone(req.getContactPhone());
        return mapToResponse(productRepository.save(p));
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public ProductResponse getProductById(Long id) {
        return mapToResponse(productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found")));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ProductResponse mapToResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId()).title(p.getTitle()).category(p.getCategory())
                .description(p.getDescription()).price(p.getPrice()).unit(p.getUnit())
                .location(p.getLocation()).imageUrl(p.getImageUrl())
                .contactPhone(p.getContactPhone()).userId(p.getUserId())
                .createdAt(p.getCreatedAt()).build();
    }
}
