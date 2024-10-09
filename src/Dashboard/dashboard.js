// src/Dashboard/dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'; // Ensure this CSS file includes styles for the dashboard and button

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievances = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Missing authentication details. Please log in again.');
        return;
      }

      const authString = btoa(`${username}:${password}`); // Base64 encode username:password

      try {
        const response = await axios.get('http://localhost:8080/api/v1/my-grievances', {
          headers: {
            'Authorization': `Basic ${authString}`,
          },
        });
        setGrievances(response.data); // Assuming response is an array of grievances
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setError('Failed to fetch grievances. Please try again later.');
      }
    };

    fetchGrievances();
  }, []);

  const handleAddGrievance = () => {
    navigate('/add-grievance'); // Navigate to the add grievance page
  };

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="grievances">
        <h2>Submitted Grievances</h2>
        <table className="grievance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Grievance Type</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
          {grievances.length > 0 ? (
              grievances.map((grievance) => (
                <tr key={grievance.id}>
                  <td>{grievance.id}</td>
                  <td>{grievance.title}</td>
                  <td>{grievance.description}</td>
                  <td>{new Date(grievance.dateSubmitted).toLocaleDateString()}</td>
                  <td>{grievance.status}</td>
                  <td>{grievance.grievanceType}</td>
                  <td>{grievance.comments || 'No comments'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No grievances found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="add-grievance">
        <button className="btn-primary" onClick={handleAddGrievance}>
          Add Grievance
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
