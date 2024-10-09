import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/dashboard';
import SignUp from './SignUp';
import AdminDashboard from './Dashboard/AdminDashboard';
import EngineerDashboard from './Dashboard/EngineerDashboard';
import Services from './Services/Services';
import AddGrievance from './AddGrievance/AddGrievance';
import Profile from './Profile/Profile';
import Layout from './Layout';
import EngineerInfo from './Dashboard/EngineerInfo';
import AdminProfile from './Profile/AdminProfile';
import EngineerProfile from './Profile/EngineerProfile';
import Feedback from './Dashboard/Feedback';
import './App.css';

const App = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // User role state

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <Routes>
        {/* Public routes (Unauthenticated) */}
        <Route
          path="/"
          element={!isLoggedIn ? <Login onLogin={(role) => { setIsLoggedIn(true); setUserRole(role); }} /> : <Navigate to="/dashboard" />}
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes (Authenticated) */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/services"
          element={
            isLoggedIn ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <Services />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add-grievance"
          element={
            isLoggedIn ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <AddGrievance />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Admin-specific routes */}
        <Route
          path="/AdminDashboard"
          element={
            isLoggedIn && userRole === 'admin' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/AdminProfile"
          element={
            isLoggedIn && userRole === 'admin' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <AdminProfile />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Engineer-specific routes */}
        <Route
          path="/EngineerDashboard"
          element={
            isLoggedIn && userRole === 'engineer' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <EngineerDashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Feedback"
          element={
            isLoggedIn && userRole === 'engineer' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <Feedback /> {/* Render the Comment component */}
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/EngineerProfile"
          element={
            isLoggedIn && userRole === 'engineer' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <EngineerProfile />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/EngineerInfo"
          element={
            isLoggedIn && userRole === 'admin' ? (
              <Layout OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} handleLogout={handleLogout} userRole={userRole}>
                <EngineerInfo />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
