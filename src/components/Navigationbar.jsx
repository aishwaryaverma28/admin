import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import "../components/styles/Sidebar.css";
import companyLogo from "../assets/image/logo.svg";
import userIcon from "../assets/image/user-img.png";
import Sidebar from "./Sidebar";
import { Link} from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GETID, VIEW_IMG,getDecryptedToken,handleLogout } from "./utils/Constants";

const NavigationBar = () => {
  const { profileImage } = useContext(UserContext);
  const [empData, setEmpData] = useState(null);
  const [pic, setPic] = useState("");
  const decryptedToken = getDecryptedToken();
  useEffect(() => {
    getUser()
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(
        "http://core.leadplaner.com:3001/api/user/getuserinfo",
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
        }
      );
      const data = response.data.data;
      if (response.data.status === 1) {
      setEmpData(data[0]);
      setPic(VIEW_IMG + data[0].profile_image);
    }
      else {
        if (response.data.message === "Token has expired") {
          alert(response.data.message);
         handleLogout() 
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
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
             {empData ? (
              <p>
              {empData.first_name+" "+empData.last_name}
              <br /> <span>{empData.job_title}</span>
            </p>
            ) : (
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
