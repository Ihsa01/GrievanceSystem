package com.Signup.RegisterUser.dto;



public class SolveGrievanceRequest {

    private Long grievanceId;

    private String comment;

    // Getters and Setters
    public Long getGrievanceId() {
        return grievanceId;
    }

    public void setGrievanceId(Long grievanceId) {
        this.grievanceId = grievanceId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
