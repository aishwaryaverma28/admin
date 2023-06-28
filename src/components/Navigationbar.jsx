import React, { useState, useEffect } from 'react';
import "../components/styles/Sidebar.css";
import companyLogo from '../assets/image/logo.png'
import userIcon from '../assets/image/user-img.png'
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GETID } from "./utils/Constants";

const NavigationBar = () => {
  const [empData, setEmpData] = useState(null);
  const [pic, setPic] = useState("");

  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    try {
      const response = await axios.get(EMPLOYEE_GETID);
      const data = response.data.data;
      setEmpData(data[0]);
      setPic("http://core.leadplaner.com:3001/employee/doc/" + data[0].profile_image);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="sidebar-header">
        <a><img src={companyLogo} alt="Logo Image" /></a>
      </div>
      <div className="navigationBar">
        <Link to={"/"}>
          <div className="userLogoContainer">
            {empData ? (
              <img src={pic} alt="user-img" />
            ) : (
              <img src={userIcon} alt="user-img" />
            )}
            {empData && (
              <p>John Wick<br /> <span>Client</span></p>
            )}
          </div>
        </Link>
        <div className='sidebarContainer'>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
