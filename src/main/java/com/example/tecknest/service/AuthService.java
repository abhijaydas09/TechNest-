package com.example.tecknest.service;




import com.example.tecknest.dto.AuthResponse;
import com.example.tecknest.dto.LoginRequest;
import com.example.tecknest.dto.RegisterRequest;
import com.example.tecknest.entity.User;
import com.example.tecknest.repository.UserRepository;
import com.example.tecknest.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getUsername(), user.getRole());
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getUsername(), user.getRole());
    }
}
