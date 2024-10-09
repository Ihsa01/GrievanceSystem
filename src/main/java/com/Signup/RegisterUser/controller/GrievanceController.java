package com.Signup.RegisterUser.controller;

import com.Signup.RegisterUser.dto.AssignGrievanceRequest;
import com.Signup.RegisterUser.dto.GrievanceDto;
import com.Signup.RegisterUser.dto.DeleteG;
import com.Signup.RegisterUser.dto.SolveGrievanceRequest;
import com.Signup.RegisterUser.entity.Grievance;
import com.Signup.RegisterUser.entity.Role;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")

public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    // Endpoint to submit a grievance
    @PostMapping("/grievances")
    public ResponseEntity<?> submitGrievance(@RequestBody GrievanceDto grievanceDto, Authentication authentication) {
        // Get username from the authentication object (current logged-in user)
        String username = authentication.getName();

        // Use the GrievanceService to submit the grievance
        GrievanceDto submittedGrievance = grievanceService.submitGrievance(grievanceDto, username);

        return ResponseEntity.ok(submittedGrievance); // Return the submitted grievance details
    }

    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceDto>> viewGrievances(Authentication authentication) {
         String username = authentication.getName();


        List<GrievanceDto> grievances = grievanceService.viewGrievances(username);

        return ResponseEntity.ok(grievances);
    }
    @GetMapping("/all")
    public List<GrievanceDto> getAllGrievances() {
        return grievanceService.getAllGrievances();
    }

    // Endpoint for assigning an assignee to grievances
    @PreAuthorize("hasRole('SUPERVISOR')")
    @PostMapping("/assign")
    public ResponseEntity<String> assignAssignee(@RequestBody AssignGrievanceRequest
                                                             assignGrievanceRequest, Authentication authentication) {
        // Ensure the logged-in user is a supervisor
        Users supervisor = grievanceService.findUserByUsername(authentication.getName());
        if (supervisor == null || !supervisor.getRole().equals(Role.SUPERVISOR)) {
            return new ResponseEntity<>("Access Denied: Only supervisors can assign grievances.", HttpStatus.FORBIDDEN);
        }

        try {
            grievanceService.assignGrievanceToAssignee(assignGrievanceRequest.getGrievanceId(), assignGrievanceRequest.getAssigneeUsername());
            return new ResponseEntity<>("Grievance assigned successfully.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/my-grievances")
    public ResponseEntity<List<Grievance>> getUserGrievances(Authentication authentication) {
        // Get the logged-in user
        Users user = grievanceService.findUserByUsername(authentication.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Grievance> grievances;

        if (user.getRole().equals(Role.ASSIGNEE)) {
            grievances = grievanceService.getGrievancesForAssignee(user.getUsername());


        } else if (user.getRole().equals(Role.CUSTOMER)) {
            grievances = grievanceService.getGrievancesForCustomer(user.getId()); // Now using userId

        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(grievances, HttpStatus.OK);
    }


    @PostMapping("/solve")
    public ResponseEntity<String> solveGrievance(@RequestBody SolveGrievanceRequest request,
                                                 Authentication authentication) {
        String assigneeUsername = authentication.getName();
        System.out.println(assigneeUsername);

        grievanceService.changeGrievanceStatusToSolved(request.getGrievanceId(), assigneeUsername, request.getComment());

        return new ResponseEntity<>("Grievance marked as solved with comment.", HttpStatus.OK);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteGrievance(@RequestBody DeleteG request, Authentication authentication) {
        // Check if the user has the SUPERVISOR role
        boolean isSupervisor = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_SUPERVISOR"));

        if (!isSupervisor) {
            return new ResponseEntity<>("Unauthorized. Only supervisors can delete grievances.", HttpStatus.FORBIDDEN);
        }

        // Perform the deletion if the user is a supervisor
        try {
            grievanceService.deleteGrievance(request.getGrievanceId());
            return new ResponseEntity<>("Grievance deleted successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
