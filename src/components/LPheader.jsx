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
  handleLogout,
  getDecryptedUserPath,
} from "./utils/Constants";
import HelpModal from "./HelpModal";

const LPheader = () => {
  const { name } = useContext(LPContext);
  const landingUrl = localStorage.getItem("landingUrl");
  const [pageTitle, setPageTitle] = useState("Lead");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [clientData, setClientData] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const location = useLocation();
  const decryptedUserPath = getDecryptedUserPath();
  const allowed = decryptedUserPath.split(",");
  // const allowed = [
  //   "/lp/lead",
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
  //   "/lp/settings/viewProfile/timeSheet",
  //   "/lp/settings/viewProfile/documents",
  //   "/lp/settings/viewProfile/salarySlip",
  // ];
  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true; // All paths are allowed when allowed array is empty
    }
    return allowed.includes(path);
  };

 async function getUser() {
    try {
      const response = await axios.get(USER_INFO, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      });
      const data = response?.data?.data;
      if (response.data.status === 1) {
        setClientData(data[0]);
        //   setPic(VIEW_IMG + data[0].profile_image);
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

  // console.log(clientData);
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
  const handleRefresh = () => {
    window.location.reload(); // Reloads the current page
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    setIsOpen(false);
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
                <i className="far fa-bell"></i>
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
              <Link to="/lp/settings/general">
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
                {" "}
                {name
                  ? name
                  : `${clientData.first_name} ${clientData.last_name}`}
                <br />
                <span>{clientData.job_title}</span>
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
                    {clientData.first_name + " " + clientData.last_name}
                  </h5>
                  <p className="email-case">{clientData.email}</p>
                  <p>{clientData.job_title}</p>
                </div>
              </div>
              <div className="profileNPref">Profile & Preferences</div>
              <div className="userId">
                User Id: 123456789 <i className="far fa-question-circle"></i>
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
                  Lead
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/deals") && (
              <li onClick={() => handleNavigationClick("Deal")}>
                <NavLink exact to="/lp/deals" activeClassName="activeNav">
                  Deal
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/mail") && (
              <li onClick={() => handleNavigationClick("Mail")}>
                <NavLink exact to="/lp/mail" activeClassName="activeNav">
                  Mail
                </NavLink>
              </li>
            )}
            {isPathAllowed("/lp/contacts") && (
              <li onClick={() => handleNavigationClick("Contacts")}>
                <NavLink exact to="/lp/contacts" activeClassName="activeNav">
                  Contacts
                </NavLink>
              </li>
            )}
          </ul>
          <span></span>
        </div>
      </nav>
      {/* Bottom Navigation End */}

      {isHelpModalOpen && <HelpModal onClose={closeHelpModal} />}
    </>
  );
};

export default LPheader;
