package com.Signup.RegisterUser.service;

import com.Signup.RegisterUser.dto.GrievanceDto;
import com.Signup.RegisterUser.entity.Grievance;
import com.Signup.RegisterUser.entity.Role;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.repo.GrievanceRepository;
import com.Signup.RegisterUser.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to submit a grievance (role-specific)
    public GrievanceDto submitGrievance(GrievanceDto grievanceDto, String username) {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found with username: " + username);
        }
        // Assume you have a method to get the user by their username
        user = userRepository.findByUsername(username); // Corrected this call

        // Check if the user has the 'CUSTOMER' role
        if (!user.getRole().equals(Role.CUSTOMER)) {
            throw new AccessDeniedException("Only customers can submit grievances");
        }

        Grievance grievance = convertToEntity(grievanceDto);
        grievance.setUserId(user.getId()); // Automatically assign the user ID
        grievance.setDateSubmitted(LocalDate.now());
        grievance.setStatus("Pending"); // Set default status

        Grievance savedGrievance = grievanceRepository.save(grievance);
        return convertToDto(savedGrievance);
    }

    // Method to view grievances
    public List<GrievanceDto> viewGrievances(String username) {
        Users user = userRepository.findByUsername(username); // Corrected this call

        // Check if the user has the 'CUSTOMER' role
        if (!user.getRole().equals(Role.CUSTOMER)) {
            throw new AccessDeniedException("Only customers can view grievances");
        }

        List<Grievance> grievances = grievanceRepository.findByUserId(user.getId());
        return grievances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // Convert GrievanceDto to Grievance entity
    private Grievance convertToEntity(GrievanceDto grievanceDto) {
        Grievance grievance = new Grievance();
        grievance.setId(grievanceDto.getId());
        grievance.setTitle(grievanceDto.getTitle());
        grievance.setDescription(grievanceDto.getDescription());
        grievance.setDateSubmitted(grievanceDto.getDateSubmitted());
        grievance.setStatus(grievanceDto.getStatus());
        grievance.setUserId(grievanceDto.getUserId());
        grievance.setGrievanceType(grievanceDto.getGrievanceType()); // Map the new field if it's present
        return grievance;
    }

    // Convert Grievance entity to GrievanceDto
    private GrievanceDto convertToDto(Grievance grievance) {
        GrievanceDto grievanceDto = new GrievanceDto();
        grievanceDto.setId(grievance.getId());
        grievanceDto.setTitle(grievance.getTitle());
        grievanceDto.setDescription(grievance.getDescription());
        grievanceDto.setDateSubmitted(grievance.getDateSubmitted());
        grievanceDto.setStatus(grievance.getStatus());
        grievanceDto.setUserId(grievance.getUserId());
        grievanceDto.setGrievanceType(grievance.getGrievanceType()); // Map the new field if it's present
        return grievanceDto;
    }
}
