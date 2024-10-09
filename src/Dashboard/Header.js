import React from 'react';
import { BsSearch, BsJustify } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';

function Header({ OpenSidebar, handleLogout }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>

      </div>
      <div className='header-right'>
        {/* Logout Button */}
        <button className='btn btn-logout' onClick={handleLogout}>
          <FaSignOutAlt className='icon' />
        </button>
      </div>
    </header>
  );
}

export default Header;
