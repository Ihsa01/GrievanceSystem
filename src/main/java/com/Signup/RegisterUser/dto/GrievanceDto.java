package com.Signup.RegisterUser.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.Signup.RegisterUser.entity.Grievance;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrievanceDto {

    private Long id;
    private String title;
    private String description;
    private LocalDate dateSubmitted;
    private String status;
    private Long userId;
    private String grievanceType;
    private String comment;
    private String assignee;

    public GrievanceDto(Grievance grievance) {
        this.id = grievance.getId();
        this.title = grievance.getTitle();
        this.description = grievance.getDescription();
        this.dateSubmitted = grievance.getDateSubmitted();
        this.status = grievance.getStatus();
        this.userId = grievance.getUserId();
        this.grievanceType = grievance.getGrievanceType();
        this.comment = grievance.getComment();
        this.assignee = grievance.getAssignee();
    }

}
