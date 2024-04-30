import React, { useState, useEffect, useRef, useContext } from "react";
import { LPContext } from "./LPContext";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./styles/LPheader.css";
import line from "../assets/image/Line.png";
import user from "../assets/image/user-img.png";
import logo from "../assets/image/logo.svg";
import axios from "axios";
import {
  USER_INFO,
  getDecryptedToken,
  getDecryptedUserPath,
} from "./utils/Constants";
import HelpModal from "./HelpModal";
import NotificationModal from "./NotificationModal.jsx";
import { useDispatch } from 'react-redux';
import { addItem } from "./utils/userInfoSlice.js";
import ResetPassword from "./settings/ResetPassword.jsx";
import { toast, ToastContainer } from "react-toastify";
const LPheader = () => {
  const [isResetPassowrd, setIsResetPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const { name } = useContext(LPContext);
  const landingUrl = localStorage.getItem("landingUrl");
  const [pageTitle, setPageTitle] = useState("Lead");
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [clientData, setClientData] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [pathAddress, setPathAddress] = useState(null);
  const decryptedToken = getDecryptedToken();
  const location = useLocation();
  const decryptedUserPath = getDecryptedUserPath();
  const [number, setNumber] = useState(null);
  let allowed = decryptedUserPath.split(",");
  // let allowed = [
  //   "/lp/lead",
  //   "/lp/bmp",
  //   "/lp/admin",
  //   "/lp/home",
  //   "/lp/mail",
  //   "/lp/contacts",
  //   "/lp/deals",
  //   "/lp/settings",
  //   "/lp/settings/general",
  //   "/lp/settings/notification",
  //   "/lp/settings/usernteams",
  //   "/lp/settings/companysettings",
  //   "/lp/settings/recyclebin",
  //   "/lp/settings/privacyConcent",
  //   "/lp/settings/settingLeads",
  //   "/lp/settings/settingDeal",
  //   "/lp/settings/settingUsage",
  //   "/lp/settings/settingImpExp",
  //   "/lp/settings/blog/add",
  //   "/lp/settings/blog/view",
  //   "/lp/settings/sitePages/add",
  //   "/lp/settings/sitePages/view",
  //   "/lp/settings/helpSection/add",
  //   "/lp/settings/helpSection/update",
  //   "/lp/settings/userManagement/add",
  //   "/lp/settings/userManagement/update",
  //   "/lp/settings/employee/add",
  //   "/lp/settings/employee/view",
  //   "/lp/settings/accessManagement",
  //   "/lp/settings/reportsAndAnalytics",
  //   "/lp/settings/masterSettings/City",
  //   "/lp/settings/system/state",
  //   "/lp/settings/viewProfile/employeeProfile",
  //   "/lp/marketing"
  // ];
  if (landingUrl === "/lp/admin") {
    allowed = allowed.filter((path) => path !== "/lp/home");
  } else if (landingUrl === "/lp/home") {
    allowed = allowed.filter((path) => path !== "/lp/admin");
  }

  useEffect(() => {
    if (landingUrl === "/lp/admin") {
      setPathAddress("/lp/settings/viewProfile/employeeProfile");
    } else {
      setPathAddress("/lp/settings/general");
    }
  }, []);

  useEffect(() => {
    switch (landingUrl) {
      case "/lp/bmp/overview":
        setPageTitle("BMP");
        break;
      case "/lp/bmp/admin":
        setPageTitle("Manager");
        break;
      case "/lp/admin":
        setPageTitle("Home");
        break;
      case "/lp/home":
        setPageTitle("Home");
        break;
      default:
        setPageTitle("Lead");
        break;
    }
  }, [landingUrl]);
  const handleBell = () => {
    setIsNotifyModalOpen(true);
  };
  const handleBellCLose = () => {
    setIsNotifyModalOpen(false);
  };

  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true;
    }
    const userRole = localStorage.getItem("role_name");
    if (userRole === "Academy_admin" && path === "/lp/bmp/admin") {
      return false;
    }

    return allowed.includes(path);
  };

  async function getUser() {
    try {
      const response = await axios.get(USER_INFO, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });
      const data = response?.data?.data;
      localStorage.setItem("org_id", data[0].org_id);
      if (response.data.status === 1) {
        setClientData(data[0]);
        setUserId(data[0].id)
        setNumber(0);
        dispatch(addItem(data));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Invalid or expired token.") {
        alert(error?.response?.data?.message);
        handleLogout();
      }
    }
  }

    useEffect(() => {
     getUser();
  }, []);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavigationClick = (title) => {
    setPageTitle(title);
  };

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleHelpModalOpen = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };
  //==============================================================change password
  const handleResetPasswordOpen = () => {
    setIsResetPassword(true);
  };

  const handleResetPasswordClose = () => {
    setIsResetPassword(false);
  };

//================================================================sign out
  const handleLogout = () => {
    if (localStorage.length === 0) {
      window.location.href = "https://core.leadplaner.com/login";
    } else {
      localStorage.clear();
      window.location.href = "https://core.leadplaner.com/login";
    }
  };
  return (
    <>
      <div className="nav">
        <div className="navHeader">
          <div className="navTitle">{pageTitle}</div>
        </div>
        <div className="navBtn">
          <label htmlFor="navCheck" onClick={handleNavToggle}>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <input type="checkbox" id="navCheck" checked={isNavOpen} />
        <div className={`navLinks ${isNavOpen ? "open" : ""}`}>
          <div className="searchBox">
            <button className="searchBtn">
              <i className="fas fa-search"></i>
            </button>
            <input
              className="searchInput"
              type="text"
              placeholder="Search lead, contact and more"
            />
          </div>
          <div>
            <button type="button" className="plusBtn" title="Create Lead">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <ul className="icons">
            <li>
              <button type="button" className="bellBtn" title="Notification">
                <i className="far fa-bell" onClick={handleBell}></i>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="helpBtn"
                title="Help"
                onClick={handleHelpModalOpen}
              >
                <i className="far fa-question-circle"></i>
              </button>
            </li>
            <li>
              <Link to={pathAddress}>
                <button type="button" className="settingBtn" title="Settings">
                  <i className="fa-sharp fa-solid fa-gear"></i>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="userDropdownContainer" ref={dropdownRef}>
          <div className="userImg" onClick={toggleDropdown}>
            <img className="borderLeft" src={line} alt="border-left" />
            <img src={user} alt="user" />
            {clientData ? (
              <p>
               {
                  number === 0 ? (
                    `${clientData?.first_name} ${clientData?.last_name}`
                  ) : (
                    `${clientData?.name}`
                  )

                }
                <br />
                <span>{clientData?.job_title}</span>
              </p>
            ) : (
              <p>
                John Wick
                <br />
                <span>admin</span>
              </p>
            )}
          </div>
          {isOpen && (
            <div className="logoutDropdown">
              <div className="logUserInfo">
                <img src={user} alt="user" />
                <div className="crmUserInfo">
                  <h5 className="crmUserInfoName">
                    {
                      number === 0 ? (
                        `${clientData?.first_name} ${clientData?.last_name}`
                      ) : (
                        `${clientData?.name}`
                      )

                    }
                  </h5>
                  <p className="email-case">{clientData?.email}</p>
                 <p>{clientData?.job_title}</p>
                </div>
              </div>
              <div className="profileNPref">Profile & Preferences</div>
              <div className="pass_flex">
                <div className="userId">
                User Id: {clientData?.id ? (clientData?.id) : 123456789}
                </div>
                <p className="common-fonts" 
                onClick={handleResetPasswordOpen}
                >
                  Change Password
                </p>
              </div>
              <div className="userId">
                <p>Invite & earn rewards</p>
                <p>Account & Billing </p>
                <p>Price & Features</p>
                <p>Training & Services</p>
                <p>About this application</p>
              </div>
              <div className="signOutDiv">
                <p onClick={handleLogout}>Sign Out</p>
                <p>Privacy policy</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Top Navigation End  */}
      {/* Bottom Navigation Start */}
      <nav className="navbar">
        <div className="navbarContainer">
           <img src={logo} alt="" className="logo" />
          <input
            type="checkbox"
            name=""
            id=""
            checked={isMenuOpen}
            onChange={handleMenuToggle}
          />
          <div className="hamburgerLines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className={`menuItems ${isMenuOpen ? "open" : ""}`}>
            {isPathAllowed("/lp/home") && (
              <li onClick={() => handleNavigationClick("Home")}>
                <NavLink exact to="/lp/home" activeClassName="activeNav">
                  Home
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/admin") && (
              <li onClick={() => handleNavigationClick("Admin")}>
                <NavLink exact to="/lp/admin" activeClassName="activeNav">
                  Home
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/lead") && (
              <li onClick={() => handleNavigationClick("Lead")}>
                <NavLink exact to="/lp/lead" activeClassName="activeNav">
                  Dashboard
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/bmp") && (
              <li onClick={() => handleNavigationClick("Acadmey")}>
                <NavLink exact to="/lp/bmp" activeClassName="activeNav">
                  Academies
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/coach") && (
              <li onClick={() => handleNavigationClick("Coach")}>
                <NavLink exact to="/lp/coach" activeClassName="activeNav">
                  Coaches
                </NavLink>
              </li>
            )}
            <li onClick={() => handleNavigationClick("Player")}>
                <NavLink exact to="/lp/player" activeClassName="activeNav">
                  Player
                </NavLink>
              </li>
            {isPathAllowed("/lp/deals") && (
              <li onClick={() => handleNavigationClick("Deal")}>
                <NavLink exact to="/lp/deals" activeClassName="activeNav">
                  Leads
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/contacts") && (
              <li onClick={() => handleNavigationClick("Contacts")}>
                <NavLink exact to="/lp/contacts" activeClassName="activeNav">
                  Support
                </NavLink>
              </li>
            )}
          </ul>
          <span></span>
        </div>
        </nav>      
      {/* Bottom Navigation End */}
      {isResetPassowrd && (
        <ResetPassword onClose={handleResetPasswordClose} user={userId}/>
      )}
      {isHelpModalOpen && <HelpModal onClose={closeHelpModal} />}
      {isNotifyModalOpen && <NotificationModal onClose={handleBellCLose} />}
      <ToastContainer/>
    </>
  );
};

export default LPheader;
