import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import SideBar from '../SideBar';


const City = () => {

    const [openSideToggle, setOpenSideToggle] = useState(false);
    const [insights, setInsights] = useState([]);
    const OpenSidebar = () => {
      setOpenSideToggle(!openSideToggle)
    }

  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <SideBar openSideToggle={openSideToggle} OpenSidebar={OpenSidebar} />
    </div>
  )
}

export default City