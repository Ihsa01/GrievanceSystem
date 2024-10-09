// src/EngineerDashboard/EngineerDashboard.js
import React from 'react';
import EngineerSidebar from './EngineerSidebar';
import './EngineerDashboard.css';

const EngineerDashboard = () => {
  return (
    <div className="grid-container">
      <EngineerSidebar />
      <div className="main-container">
        <h1>Engineer Dashboard</h1>
        <div className="task-container">
          {/* Your engineer dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;
