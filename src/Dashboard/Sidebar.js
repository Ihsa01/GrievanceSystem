import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> TV GRIEVANCES
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Grievance Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/services">
            <BsPeopleFill className="icon" /> Service Helpline
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/profile">
            <BsMenuButtonWideFill className="icon" /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
