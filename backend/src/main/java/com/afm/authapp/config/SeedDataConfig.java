package com.afm.authapp.config;

import com.afm.authapp.model.AppUser;
import com.afm.authapp.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SeedDataConfig {

  @Bean
  public CommandLineRunner loadDefaultUser(AppUserRepository appUserRepository,
      PasswordEncoder passwordEncoder) {
    return args -> appUserRepository.findByUsername("afm")
        .orElseGet(() -> {
          AppUser user = new AppUser();
          user.setUsername("afm");
          user.setPassword(passwordEncoder.encode("afm"));
          user.setFullName("AFM User");
          user.setEmail("afm@example.com");
          return appUserRepository.save(user);
        });
  }
}
