package com.Signup.RegisterUser.controller;

import com.Signup.RegisterUser.dto.GrievanceDto;
import com.Signup.RegisterUser.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
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

    // Endpoint to view all grievances for the logged-in user
    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceDto>> viewGrievances(Authentication authentication) {
        // Get username from the authentication object (current logged-in user)
        String username = authentication.getName();

        // Use the GrievanceService to fetch the user's grievances
        List<GrievanceDto> grievances = grievanceService.viewGrievances(username);

        return ResponseEntity.ok(grievances); // Return the list of grievances
    }
}
