import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillShieldFill, BsGrid1X2Fill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillShieldFill className="icon_header" /> ADMIN PANEL {/* Changed icon here */}
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/AdminDashboard">
            <BsGrid1X2Fill className="icon" /> Admin Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/EngineerInfo">
            <BsPeopleFill className="icon" /> Engineer Info
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/AdminProfile">
            <BsMenuButtonWideFill className="icon" /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
