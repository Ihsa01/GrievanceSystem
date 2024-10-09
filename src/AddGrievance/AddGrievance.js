import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddGrievance.css';

const AddGrievance = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      setError('Missing authentication details. Please log in again.');
      return;
    }

    const authString = btoa(`${username}:${password}`); // Base64 encode username:password
    
    const grievanceData = {
      title: title,
      description: description,
      grievanceType: type,
    };

    try {
      // Post the grievance data to the backend
      await axios.post('http://localhost:8080/api/v1/grievances', grievanceData, {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
      });

      // Show success message and redirect to the dashboard
      alert('Grievance submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting grievance:', error);
      setError('Failed to submit grievance. Please try again later.');
    }
  };

  return (
    <div className="add-grievance-container">
      <h1>Add Grievance</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Billing Issue">Billing Issue</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddGrievance;
