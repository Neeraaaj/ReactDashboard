import React from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({OpenSidebar}) => {

  const [isLogoutVisible, setLogoutVisible] = useState(false);

  const handleIconClick = () => {
    setLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
  }

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon'
            onClick={OpenSidebar}
            />
        </div>
        <div className='header-left'>
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon' onClick={handleIconClick}/>
            {isLogoutVisible && (
        <div className='logout-container' style={{background: "white", width: "fit-content", padding: "10px", borderRadius: "20px", display: 'flex', flexDirection: "column", marginTop: "35px"}}>
          <p>Are you sure you want to log out?</p>
          <Link to="/logout" onClick={() => handleLogout} style={{background: "red", color: "white", borderRadius: "12px", padding: "12px"}}>Logout</Link>
        </div>
      )}
        </div>
    </header>
  )
}

export default Header