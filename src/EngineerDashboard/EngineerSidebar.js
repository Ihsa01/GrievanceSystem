// src/EngineerDashboard/EngineerSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './EngineerSidebar.css'; // Create a CSS file for the engineer sidebar

const EngineerSidebar = ({ openSidebarToggle }) => {
  return (
    <nav id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <h2>Engineer Dashboard</h2>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/engineer-dashboard" activeClassName="active">
            Engineer Dashboard
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/assigned-tasks" activeClassName="active">
            Assigned Tasks
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/task-status" activeClassName="active">
            Task Status
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default EngineerSidebar;
