package com.example.amanafarm_backend;

import com.example.amanafarm_backend.dto.ProductRequest;
import com.example.amanafarm_backend.model.Product;
import com.example.amanafarm_backend.repository.ProductRepository;
import com.example.amanafarm_backend.service.ProductService;
import org.junit.jupiter.api.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OwnershipTests {
    ProductRepository repository;
    ProductService service;
    @BeforeEach void setup() {
        repository=mock(ProductRepository.class);service=new ProductService(repository);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
            7L,null,List.of(new SimpleGrantedAuthority("ROLE_CLIENT"))));
    }
    @AfterEach void cleanup() { SecurityContextHolder.clearContext(); }
    @Test void creationUsesAuthenticatedOwner() {
        var request=new ProductRequest();request.setUserId(999L);
        when(repository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        assertEquals(7L,service.createProduct(request).getUserId());
    }
    @Test void updateOfAnotherUsersProductIsForbidden() {
        var product=new Product();product.setUserId(8L);
        when(repository.findById(1L)).thenReturn(Optional.of(product));
        var error=assertThrows(ResponseStatusException.class,()->service.updateProduct(1L,new ProductRequest()));
        assertEquals(403,error.getStatusCode().value());verify(repository,never()).save(any());
    }
    @Test void deletionOfAnotherUsersProductIsForbidden() {
        var product=new Product();product.setUserId(8L);
        when(repository.findById(1L)).thenReturn(Optional.of(product));
        assertThrows(ResponseStatusException.class,()->service.deleteProduct(1L));
        verify(repository,never()).delete(any());
    }
    @Test void ownerCanDeleteTheirProduct() {
        var product=new Product();product.setUserId(7L);
        when(repository.findById(1L)).thenReturn(Optional.of(product));
        service.deleteProduct(1L);verify(repository).delete(product);
    }
}
