package com.Signup.RegisterUser.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssignGrievanceRequest {
    private Long grievanceId;
    private String assigneeUsername;

}
