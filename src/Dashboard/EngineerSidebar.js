// src/Dashboard/EngineerSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsPeopleFill, BsFilePlus } from 'react-icons/bs';
import './EngineerSidebar.css'; // Ensure to include your CSS file for styles

function EngineerSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="engineer-sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsGrid1X2Fill className="icon_header" /> ENGINEER PANEL
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/EngineerDashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>



        <li className="sidebar-list-item">
          <Link to="/EngineerProfile">
            <BsPeopleFill className="icon" /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default EngineerSidebar;
