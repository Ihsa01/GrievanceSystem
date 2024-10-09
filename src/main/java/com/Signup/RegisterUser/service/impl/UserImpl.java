package com.Signup.RegisterUser.service.impl;

import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.entity.Role;
import com.Signup.RegisterUser.entity.Users;

import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.payload.response.LoginResponse;
import com.Signup.RegisterUser.repo.UserRepository;
import com.Signup.RegisterUser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public  String addUser(UserDto userDto) {

        if(userRepository.findByUsername(userDto.getUsername()) != null){
            return "Username already exists";
        }
        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()


        );

        userRepository.save(user);

        return user.getName();

    }


    @Override
    public Users findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        String msg = "";
        Users user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null) {
            String password = loginDto.getPassword();
            String encodedPassword = user.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Login Failed: Incorrect Password", false);
            }
        } else {
            return new LoginResponse("Login Failed: Username does not exist", false);
        }
    }

    @Override
    public LoginResponse signupUser(UserDto userDto) {
        // Check if the username already exists
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            return new LoginResponse("Username already exists", false);
        }

        // Encode the password and save the user
        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()),  // Encode password
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()
        );
        userRepository.save(user);
        return new LoginResponse("User registered successfully", true);
    }
    public List<Users> getAllAssignees() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.ASSIGNEE) // Directly compare with Role enum
                .collect(Collectors.toList());
    }

}
