// src/Dashboard/EngineerDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EngineerSidebar from './EngineerSidebar'; 
import axios from 'axios';
import './EngineerDashboard.css'; 

const EngineerDashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [grievances, setGrievances] = useState([]); // State to hold grievances data

  // Example grievance data, replace with your actual fetching logic
  useEffect(() => {
    const fetchGrievances = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Missing authentication details.');
        return;
      }
      const authString = btoa(`${username}:${password}`);

      try {
        const response = await axios.get('http://localhost:8080/api/v1/my-grievances', {
          headers: {
            'Authorization': `Basic ${authString}`,
          },
        });
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances', error);
        setError('Failed to fetch grievances');
      }

    };

    fetchGrievances();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  



  const handleSolveGrievance = () => {
    navigate('/Feedback'); 
  };

  return (
    <div className="dashboard-container">
      <EngineerSidebar /> {/* Include the sidebar here */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Engineer Dashboard</h1>

        <div className="grievances">
          <h2>Assigned Grievances</h2>
          
          <table className="grievance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date Submitted</th>
                <th>Grievance Type</th>
              </tr>
            </thead>
            <tbody>
            {grievances.length > 0 ? (
                grievances.map(grievance => (
                  <tr key={grievance.id}>
                    <td>{grievance.id}</td>
                    <td>{grievance.title}</td>
                    <td>{grievance.description}</td>
                    <td>{new Date(grievance.dateSubmitted).toLocaleDateString()}</td>
                    <td>{grievance.grievanceType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No grievances assigned</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='add-grievance'>
        <button className="add-grievance-button" onClick={handleSolveGrievance}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;
