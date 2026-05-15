package com.example.amanafarm_backend.service;

import com.example.amanafarm_backend.auth.AuthResponse;
import com.example.amanafarm_backend.auth.LoginRequest;
import com.example.amanafarm_backend.auth.RegisterRequest;
import com.example.amanafarm_backend.model.User;
import com.example.amanafarm_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("CLIENT");
        user.setAvatar(request.getAvatar());
        user.setProfilePhoto(request.getProfilePhoto());
        user.setCoverPhoto(request.getCoverPhoto());

        userRepository.save(user);

        return toResponse(user, "Compte créé avec succès");
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        return toResponse(user, "Connexion réussie");
    }

    private AuthResponse toResponse(User user, String message) {
        String token = jwtService.generateToken(user);
        return new AuthResponse(
                user.getId(),
                user.getFirstName() + " " + user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getAvatar(),
                user.getProfilePhoto(),
                user.getCoverPhoto(),
            message,
            token
        );
    }
}
