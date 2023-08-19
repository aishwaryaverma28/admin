import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import "../components/styles/Sidebar.css";
import companyLogo from "../assets/image/logo.svg";
import userIcon from "../assets/image/user-img.png";
import Sidebar from "./Sidebar";
import { Link} from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GETID, VIEW_IMG,getDecryptedToken,handleLogout,GET_USER_EMPLOYEE } from "./utils/Constants";

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
        GET_USER_EMPLOYEE,
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
    } catch (error) {
      console.log(error);
          if (error?.response?.data?.message === "Invalid or expired token.") {
            alert(error?.response?.data?.message);
           handleLogout() 
          }
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
