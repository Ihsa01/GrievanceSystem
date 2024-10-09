import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Ensure this CSS file includes styles for the dashboard and button

const engineers = [
  { id: 1, name: 'asssignee1' },
  { id: 2, name: 'assignee2' },
  { id: 3, name: 'assignee3' },
  { id: 4, name: 'assignee4' },
];

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null); // Use grievanceId to track which dropdown is visible
  const [selectedEngineer, setSelectedEngineer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grievancesResponse = await axios.get('http://localhost:8080/api/v1/all', {
          auth: {
            username: localStorage.getItem('username'), // Replace with actual auth if needed
            password: localStorage.getItem('password'), // Replace with actual auth if needed
          },
        });
        setGrievances(grievancesResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAssignClick = (grievanceId) => {
    // Toggle dropdown visibility for the specific grievance
    setShowDropdown(showDropdown === grievanceId ? null : grievanceId);
  };

  const handleEngineerSelect = async (grievanceId, engineer) => {
    setSelectedEngineer(engineer);
    setShowDropdown(null); // Close the dropdown after selection
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/assign',
        {
          grievanceId: grievanceId,
          assigneeUsername: engineer.name,
        },
        {
          auth: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
          },
        }
      );

      alert(`Grievance ${grievanceId} assigned to ${engineer.name}`);
    } catch (error) {
      console.error('Error assigning grievance: ', error);
      alert('Failed to assign grievance');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="grievances">
        <h2>Received Grievances</h2>
        <table className="grievance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Assignee</th>
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
                  <td>
                    {grievance.status !== 'Pending' ? (
                      grievance.assignee
                    ) : (
                      <>
                        <button className="btn btn-assign" onClick={() => handleAssignClick(grievance.id)}>
                          Assign
                        </button>
                        {showDropdown === grievance.id && (
                          <div className="dropdown">
                            <ul>
                              {engineers.map((engineer) => (
                                <li key={engineer.id} onClick={() => handleEngineerSelect(grievance.id, engineer)}>
                                  {engineer.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td>{grievance.title}</td>
                  <td>{grievance.description}</td>
                  <td>{new Date(grievance.dateSubmitted).toLocaleDateString()}</td>
                  <td>{grievance.status}</td>
                  <td>{grievance.grievanceType}</td>
                  <td>{(grievance.status === 'Solved') ? grievance.comment : 'No comments'}</td>
                </tr>
                
              ))
            ) : (
              <tr>
                <td colSpan="8">No grievances found</td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default Dashboard;
