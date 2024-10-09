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
    public List<GrievanceDto> getAllGrievances() {
        List<Grievance> grievances = grievanceRepository.findAll();
        return grievances.stream()
                .map(GrievanceDto::new)
                .collect(Collectors.toList());
    }

    public void assignGrievanceToAssignee(Long grievanceId, String assigneeUsername) {
        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found with id: " + grievanceId));

        // Ensure the grievance is pending
        if (!"Pending".equals(grievance.getStatus())) {
            throw new IllegalStateException("Grievance is not pending");
        }

        // Find the assignee by username
        Users assignee = userRepository.findByUsername(assigneeUsername);
        if (assignee == null) {
            throw new RuntimeException("Assignee not found or invalid role: " + assigneeUsername);
        } else if (!assignee.getRole().equals(Role.ASSIGNEE)) {
            throw new RuntimeException("invalid role:");
        }

        // Assign the grievance to the assignee and update the status
        grievance.setAssignee(assigneeUsername);
        grievance.setStatus("Assigned");
        grievanceRepository.save(grievance);
    }

    public Users findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<Grievance> getGrievancesForAssignee(String assigneeUsername) {
        return grievanceRepository.findByAssigneeUsernameAndStatusNot(assigneeUsername, "Solved");
    }

    public List<Grievance> getGrievancesForCustomer(Long userId) {
        return grievanceRepository.findByUserId(userId);
    }

    public void changeGrievanceStatusToSolved(Long grievanceId, String assigneeUsername, String comment) {
        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found with id: " + grievanceId));

        if (!grievance.getAssignee().equals(assigneeUsername)) {
            throw new RuntimeException("You are not authorized to update this grievance");
        }

        grievance.setStatus("Solved");
        grievance.setComment(comment);  // Add the comment provided by the assignee
        grievanceRepository.save(grievance);
    }
    public void deleteGrievance(Long grievanceId) {
        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found with id: " + grievanceId));

        // Perform the deletion
        grievanceRepository.delete(grievance);
    }

}
