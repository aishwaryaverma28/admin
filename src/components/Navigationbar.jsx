import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from "./UserContext";
import "../components/styles/Sidebar.css";
import companyLogo from '../assets/image/logo.png'
import userIcon from '../assets/image/user-img.png'
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GETID,VIEW_IMG } from "./utils/Constants";

const NavigationBar = () => {
  const { profileImage } = useContext(UserContext);
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
      setPic(VIEW_IMG + data[0].profile_image);
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
              <img src={profileImage|| pic} alt="user-img" />
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
