import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EngineerInfo.css';

const EngineerInfo = () => {
  const [assignees, setAssignees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignees = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Authentication details are missing. Please log in again.');
        return;
      }

      const authString = btoa(`${username}:${password}`); // Base64 encode for basic auth

      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/assignees', {
          headers: {
            'Authorization': `Basic ${authString}`,
          },
        });
        setAssignees(response.data); // Assuming the API response contains the assignees array
      } catch (error) {
        setError('Failed to fetch assignee data.');
        console.error(error);
      }
    };

    fetchAssignees();
  }, []);

  return (
    <div className="engineer-info">
      <h1>Assignee Profiles</h1>
      {error && <div className="error">{error}</div>}
      <div className="engineer-list">
        {assignees.map(assignee => (
          <div key={assignee.id} className="engineer-card">
            
            <div className="engineer-details">
              <h2>{assignee.name}</h2>
              <p><strong>Address:</strong> {assignee.address}</p>
              <p><strong>Phone:</strong> {assignee.phone}</p>
              <p><strong>Email:</strong> {assignee.email}</p>
              <p><strong>Username:</strong> {assignee.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineerInfo;
