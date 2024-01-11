import React from 'react'
import { FaBalanceScale } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { MdPriorityHigh } from 'react-icons/md';
import { MdEvent } from 'react-icons/md';
import { FaGlobe } from 'react-icons/fa';
import { MdSubject } from 'react-icons/md';
import { FaMap } from 'react-icons/fa';
import { FaCity } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import {FaChartLine} from 'react-icons/fa'


const SideBar = ({ openSideToggle, OpenSidebar}) => {
  return (
    <aside id='sidebar' className={openSideToggle ? 'sidebar-responsive' : ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <FaChartLine  className='icon_header'/> Energy Trends Explorer
            </div>
            <span className='icon close_icon'
            onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <FaBalanceScale className='icon'/>PESTLE
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/intensity">
                    <FaFire className='icon'/>INTENSITY
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/likelihood">
                    <MdTrendingUp className='icon'/>LIKELIHOOD
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/relevance">
                    <MdPriorityHigh className='icon'/>RELEVANCE
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/year">
                    <MdEvent className='icon'/>YEAR
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/country">
                    <FaGlobe className='icon'/>COUNTRY
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/topics">
                    <MdSubject className='icon'/>TOPICS
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/region">
                    <FaMap className='icon'/>REGION
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default SideBar