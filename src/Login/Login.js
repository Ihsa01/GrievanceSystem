import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import './login.css'; // Ensure this path is correct


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (userType && username && password) {
      try {
        localStorage.clear();

        const response = await axios.put('http://localhost:8080/api/v1/user/login',
          {
            username,
            password,
          });

        if (response.status === 200) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);

          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            onLogin(userType); // Pass userType to onLogin

            // Redirect based on user type
            if (userType === 'admin') {
              navigate('/AdminDashboard'); // Corrected path
            } else if (userType === 'engineer') {
              navigate('/EngineerDashboard'); // Corrected path
            } else if (userType === 'customer') {
              navigate('/dashboard'); // Corrected path for customer
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('Invalid credentials')
      }

    }
    else {
      alert('Please enter your email and password ');
    }
  };

  const handleUserSelection = (type) => {
    setUserType(type.toLowerCase());
  };

  return (
    <div className="addUser">
      {!userType ? (
        <div className="userSelection">
          <h3>Select User Type</h3>
          <div className="userRoles">
            <button className="btn btn-admin" onClick={() => handleUserSelection('ADMIN')}>Admin</button>
            <button className="btn btn-engineer" onClick={() => handleUserSelection('ENGINEER')}>Engineer</button>
            <button className="btn btn-customer" onClick={() => handleUserSelection('CUSTOMER')}>Customer</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{userType.charAt(0).toUpperCase() + userType.slice(1)} Sign In</h3>
          <form className="addUserForm" onSubmit={handleLogin}>
            <div className="inputGroup">
              <label htmlFor="username">Username:</label>
              <input type="text"
                id="username"
                name="username"
                autoComplete="off"
                placeholder={`Enter your ${userType} username`}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter your password"
                required
              />
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          {/* Show the Sign Up option only for customers */}
          {userType === 'customer' && (
            <div className="signupOption">
              <p>Don't have an account? </p>
              <Link to="/signup" className="btn btn-success">Sign Up</Link>
            </div>
          )}
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <p>{userType.charAt(0).toUpperCase() + userType.slice(1)} Sign In successful!</p>
        </div>
      )}
    </div>
  );
};

export default Login;
