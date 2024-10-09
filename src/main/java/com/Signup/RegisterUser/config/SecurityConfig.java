package com.Signup.RegisterUser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(withDefaults()) // Enable CORS
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/v1/user/signup", "/api/v1/user/login", "/api/v1/all", "/error").permitAll() // Public routes
                        .requestMatchers(HttpMethod.GET, "/api/v1/user/profile").authenticated()
                        .requestMatchers("/api/v1/user/assignees").hasRole("SUPERVISOR")// Profile route for authenticated users
                        .requestMatchers("/api/v1/grievances/**").hasRole("CUSTOMER")
                        .requestMatchers("/api/v1/assign").hasRole("SUPERVISOR")
                        .requestMatchers("/api/v1/solve/**").hasRole("ASSIGNEE")
                        .requestMatchers("/api/v1/my-grievances").hasAnyRole("ASSIGNEE", "CUSTOMER")
                        .requestMatchers("/api/v1/delete").hasRole("SUPERVISOR")
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .formLogin(withDefaults())
                .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Allow credentials (for authentication)
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Allow the origin of your React app
        config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow specific HTTP methods

        source.registerCorsConfiguration("/**", config); // Apply this configuration to all endpoints
        return new CorsFilter(source);
    }
}
