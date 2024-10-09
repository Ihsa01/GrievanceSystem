import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';
const Feedback = () => {
    const [grievanceId, setGrievanceId] = useState(''); // State for Grievance ID
    const [comment, setComment] = useState(''); // State for Comment
    const [error, setError] = useState(''); // State for error handling
    const navigate = useNavigate(); // For navigation
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
  
      if (!username || !password) {
        setError('Missing authentication details. Please log in again.');
        return;
      }
  
      const authString = btoa(`${username}:${password}`); // Base64 encode username:password
  
      // Convert grievanceId to a number
      const grievanceIdNumber = Number(grievanceId);
      if (isNaN(grievanceIdNumber)) {
        setError('Invalid Grievance ID. Please enter a valid number.');
        return;
      }
  
      const grievanceData = {
        grievanceId: grievanceIdNumber,  // Sending Grievance ID as a number
        comment: comment,  // Sending comment
      };
  
      try {
        // Post the grievance assignment to the backend
        await axios.post('http://localhost:8080/api/v1/solve', grievanceData, {
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json',
          },
        });
  
        alert('Grievance solved successfully!');
        navigate('/EngineerDashboard');
      } catch (error) {
        console.error('Error submitting:', error);
        setError('Failed to solve grievance. Please try again later.');
      }
    };
  
    return (
      <div className="add-grievance-container">
        <h1>Submit Feedback</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="grievanceId">Grievance ID:</label>
            <input
              type="number"  // Input type number for Grievance ID
              id="grievanceId"
              value={grievanceId}
              onChange={(e) => setGrievanceId(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="comment">Feedback:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Feedback;
  