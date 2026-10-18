package com.example.amanafarm_backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import java.util.Objects;

public final class CurrentUser {
    private CurrentUser() {}
    private static Authentication authentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof Long)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return auth;
    }
    public static Long id() { return (Long) authentication().getPrincipal(); }
    public static void requireOwner(Long ownerId) {
        Authentication auth = authentication();
        boolean admin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!admin && !Objects.equals(ownerId, auth.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not own this resource");
        }
    }
}
