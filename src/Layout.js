import React from 'react';
import Header from './Dashboard/Header';
import UserSidebar from './Dashboard/Sidebar';
import AdminSidebar from './Dashboard/AdminSidebar';
import EngineerSidebar from './Dashboard/EngineerSidebar'; // Import EngineerSidebar
import './Layout.css';

const Layout = ({ children, OpenSidebar, openSidebarToggle, handleLogout, userRole }) => {
  return (
    <div className="grid-container">
      {/* Header section */}
      <Header OpenSidebar={OpenSidebar} handleLogout={handleLogout} />

      {/* Main layout: Sidebar + Content */}
      <div className="main-layout">
        {/* Conditional rendering of sidebar based on user role */}
        {userRole === 'admin' ? (
          <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="sidebar" />
        ) : userRole === 'engineer' ? (
          <EngineerSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="sidebar" />
        ) : (
          <UserSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} className="sidebar" />
        )}

        {/* Main content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
