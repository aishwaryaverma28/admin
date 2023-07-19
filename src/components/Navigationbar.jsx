import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import "../components/styles/Sidebar.css";
import companyLogo from "../assets/image/logo.svg";
import userIcon from "../assets/image/user-img.png";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GETID, VIEW_IMG,handleApiError,getDecryptedToken } from "./utils/Constants";

const NavigationBar = () => {
  const { profileImage } = useContext(UserContext);
  const [empData, setEmpData] = useState(null);
  const [pic, setPic] = useState("");
  const navigate = useNavigate();
  const decryptedToken = getDecryptedToken();
  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    try {
      const response = await axios.get(EMPLOYEE_GETID, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        },
      });
      const data = response.data.data;
      setEmpData(data[0]);
      setPic(VIEW_IMG + data[0].profile_image);
    } catch(error){
      handleApiError(error,navigate);
    };
  }
  const handleLogout = () => {
    // Clear JWT token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("landingUrl");
    localStorage.removeItem("id");
    // Redirect to the home page or any other desired path
    navigate("/");
  };
  return (
    <>
      <div className="sidebar-header">
        <a>
          <img src={companyLogo} alt="Logo Image" />
        </a>
      </div>
      <div className="navigationBar">
        <Link to={"/admin"}>
          <div className="userLogoContainer">
            {empData ? (
              <img src={profileImage || pic} alt="user-img" />
            ) : (
              <img src={userIcon} alt="user-img" />
            )}
            {empData && (
              <p>
                John Wick
                <br /> <span>Client</span>
              </p>
            )}
          </div>
        </Link>
        <div className="sidebarContainer">
          <Sidebar />
        </div>
      </div>
      <div className="adminLogout" onClick={handleLogout}>
        Logout
      </div>
    </>
  );
};

export default NavigationBar;
