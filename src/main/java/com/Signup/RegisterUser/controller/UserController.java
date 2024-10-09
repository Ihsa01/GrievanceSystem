package com.Signup.RegisterUser.controller;


import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.entity.Role;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.payload.response.LoginResponse;
import com.Signup.RegisterUser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;


import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")

public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping(path = "/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserDto userDto) {
        LoginResponse signupResponse = userService.signupUser(userDto);
        return ResponseEntity.ok(signupResponse);
    }
    @GetMapping("/profile")
    public ResponseEntity<Users> getProfile(Authentication authentication) {
        String username = authentication.getName();

        Users user = userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/assignees")
    public ResponseEntity<?> getAssigneeDetails(Authentication authentication) {
        // Check if the authenticated user has the role of SUPERVISOR
        boolean isSupervisor = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_SUPERVISOR"));

        if (!isSupervisor) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        // Fetch all assignees
        List<Users> assignees = userService.getAllAssignees();
        return new ResponseEntity<>(assignees, HttpStatus.OK);
    }


}
