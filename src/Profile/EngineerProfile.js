import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Add styles for the component

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Missing authentication details. Please log in again.');
        return;
      }

      const authString = btoa(`${username}:${password}`); // Base64 encode username:password

      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/profile', {
          headers: {
            'Authorization': `Basic ${authString}`,
          },
        });
        setProfileData(response.data); // Handle response data
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profileData) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <div className="profile-info-header">

          <span className="role">{profileData.role}</span>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-field">
          <strong>Name:</strong> {profileData.name}
        </div>
        <div className="profile-field">
          <strong>Email:</strong> {profileData.email}
        </div>
        <div className="profile-field">
          <strong>Address:</strong> {profileData.address}
        </div>
        <div className="profile-field">
          <strong>Phone:</strong> {profileData.phone}
        </div>
      </div>
    </div>
  );
};

export default Profile;
