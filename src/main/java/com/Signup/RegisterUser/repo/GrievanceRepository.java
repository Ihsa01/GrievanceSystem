package com.Signup.RegisterUser.repo;


import com.Signup.RegisterUser.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    List<Grievance> findByUserId(Long userId);
    List<Grievance> findByStatus(String status);
    @Query("SELECT g FROM Grievance g WHERE g.assignee = :username AND g.status != :status")
    List<Grievance> findByAssigneeUsernameAndStatusNot(@Param("username") String username, @Param("status") String status);


}
