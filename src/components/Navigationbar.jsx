import React from 'react';
import "../components/styles/Sidebar.css";
import companyLogo from '../assets/image/logo.png'
import userIcon from '../assets/image/user-img.png'
import Sidebar from './Sidebar';
import {Link} from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <div class="sidebar-header">
          <a><img src={companyLogo} alt="Logo Image" /></a>
        </div>
      <div class= "navigationBar">
      <Link to={"/"}> <div class="userLogoContainer">
          <img src={userIcon} alt="user-img"/>
          <p>John Wick<br/> <span>Client</span></p>
        </div></Link>
        <div className='sidebarContainer'>
         <Sidebar/>
         </div>
      </div>
      
    </>
  )
}

export default NavigationBar