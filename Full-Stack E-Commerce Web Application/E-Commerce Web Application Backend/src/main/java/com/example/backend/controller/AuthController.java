package com.example.backend.controller;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.exception.ApiException;
import com.example.backend.model.User;
import com.example.backend.security.AuthInterceptor;
import com.example.backend.store.DataStore;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final DataStore dataStore;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest req) {
        String email = req.getEmail().trim().toLowerCase();

        if (dataStore.userIdByEmail.containsKey(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "Email already registered");
        }

        String userId = UUID.randomUUID().toString();
        String hash = passwordEncoder.encode(req.getPassword());
        User user = new User(userId, req.getName().trim(), email, hash);

        dataStore.usersById.put(userId, user);
        dataStore.userIdByEmail.put(email, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(new UserResponse(user.getName(), user.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        String email = req.getEmail().trim().toLowerCase();
        String userId = dataStore.userIdByEmail.get(email);
        User user = userId != null ? dataStore.usersById.get(userId) : null;

        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = UUID.randomUUID().toString();
        dataStore.sessions.put(token, user.getId());

        return ResponseEntity.ok(new AuthResponse(token, new UserResponse(user.getName(), user.getEmail())));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            dataStore.sessions.remove(header.substring(7));
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(HttpServletRequest request) {
        String userId = (String) request.getAttribute(AuthInterceptor.USER_ID_ATTRIBUTE);
        User user = dataStore.usersById.get(userId);
        if (user == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "User not found");
        }
        return ResponseEntity.ok(new UserResponse(user.getName(), user.getEmail()));
    }
}
