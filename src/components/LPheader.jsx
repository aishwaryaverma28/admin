import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link} from "react-router-dom";
import "./styles/LPheader.css";
import line from "../assets/image/Line.png";
import user from "../assets/image/user-img.png";
import logo from "../assets/image/logo.svg";
import { handleLogout } from "./utils/Constants";

const LPheader = () => {
  const [pageTitle, setPageTitle] = useState("Lead");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Selected option:', option);
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
              <button type="button" className="helpBtn" title="Help">
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
          <p>
            John Wick
            <br />
            <span>CEO, Admin</span>
          </p>
        </div>
        {isOpen && (
        <div className="logoutDropdown">
          <div className="logUserInfo">
            <img src={user} alt="user" />
            <div className="crmUserInfo">
              <h5 className="crmUserInfoName">John Wick</h5>
              <p>vaneetgupta@gmail.com</p>
              <p>CEO, Admin</p>
            </div>
          </div>
          <div className="profileNPref">
            Profile & Preferences
          </div>
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
            <li onClick={() => handleNavigationClick("Home")}>
              <NavLink exact to="/lp/home" activeClassName="activeNav">
                Home
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Lead")}>
              <NavLink exact to="/lp/lead" activeClassName="activeNav">
                Lead
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Deal")}>
              <NavLink exact to="/lp/deals" activeClassName="activeNav">
                Deal
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Mail")}>
              <NavLink exact to="/lp/mail" activeClassName="activeNav">
                Mail
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Contacts")}>
              <NavLink exact to="/lp/contacts" activeClassName="activeNav">
                Contacts
              </NavLink>
            </li>
          </ul>
          <span></span>
        </div>
      </nav>
      {/* Bottom Navigation End */}
    </>
  );
};

export default LPheader;
