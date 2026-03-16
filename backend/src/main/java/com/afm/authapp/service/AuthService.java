package com.afm.authapp.service;

import com.afm.authapp.dto.LoginRequest;
import com.afm.authapp.dto.LoginResponse;
import com.afm.authapp.model.AppUser;
import com.afm.authapp.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final AppUserRepository appUserRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
    this.appUserRepository = appUserRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public LoginResponse authenticate(LoginRequest request) {
    AppUser user = appUserRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

    boolean isPasswordValid = passwordEncoder.matches(request.getPassword(), user.getPassword());
    if (!isPasswordValid) {
      throw new IllegalArgumentException("Invalid username or password");
    }

    return new LoginResponse(user.getId(), user.getUsername(), user.getFullName(), user.getEmail());
  }
}
