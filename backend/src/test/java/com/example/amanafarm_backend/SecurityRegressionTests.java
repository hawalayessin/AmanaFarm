package com.example.amanafarm_backend;

import com.example.amanafarm_backend.config.*;
import com.example.amanafarm_backend.controller.*;
import com.example.amanafarm_backend.repository.JobOfferRepository;
import com.example.amanafarm_backend.service.*;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({AnimalController.class, AuthController.class, JobOfferController.class})
@Import({SecurityConfig.class, CorsConfig.class})
class SecurityRegressionTests {
    @Autowired MockMvc mvc;
    @MockBean JwtService jwtService;
    @MockBean AnimalService animalService;
    @MockBean AuthService authService;
    @MockBean JobOfferRepository jobOfferRepository;

    @Test void publicCatalogRemainsReadable() throws Exception {
        mvc.perform(get("/api/animals")).andExpect(status().isOk());
    }
    @Test void anonymousWriteIsRejected() throws Exception {
        mvc.perform(post("/api/animals").contentType("application/json").content("{}"))
            .andExpect(status().isUnauthorized());
        verifyNoInteractions(animalService);
    }
    @Test void invalidTokenIsRejected() throws Exception {
        mvc.perform(post("/api/animals").header("Authorization", "Bearer invalid")
            .contentType("application/json").content("{}"))
            .andExpect(status().isUnauthorized());
    }
    @Test void clientCanCreateAnOwnedListing() throws Exception {
        var claims = Jwts.claims(); claims.put("uid", 7); claims.put("role", "CLIENT");
        when(jwtService.parseToken("valid")).thenReturn(claims);
        mvc.perform(post("/api/animals").header("Authorization", "Bearer valid")
            .contentType("application/json").content("{}"))
            .andExpect(status().isOk());
        verify(animalService).createAnimal(any());
    }
    @Test void clientCannotEditUnownedCatalogs() throws Exception {
        var claims = Jwts.claims(); claims.put("uid", 7); claims.put("role", "CLIENT");
        when(jwtService.parseToken("valid")).thenReturn(claims);
        mvc.perform(delete("/api/jobs/1").header("Authorization", "Bearer valid"))
            .andExpect(status().isForbidden());
        verifyNoInteractions(jobOfferRepository);
    }
    @Test void loginRemainsPublic() throws Exception {
        mvc.perform(post("/api/auth/login").contentType("application/json")
            .content("{\"email\":\"test@example.com\",\"password\":\"example\"}"))
            .andExpect(status().isOk());
    }
}
