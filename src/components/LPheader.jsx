import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/LPheader.css";
import line from "../assets/image/Line.png";
import user from "../assets/image/user-img.png";
import logo from "../assets/image/logo.png";

const LPheader = () => {
  const [pageTitle, setPageTitle] = useState("Lead");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <ul className="icons">
            <li>
              <button type="button" className="plusBtn">
                <i className="fa-solid fa-plus"></i>
              </button>
            </li>
            <li>
              <button type="button" className="bellBtn">
                <i className="far fa-bell"></i>
              </button>
            </li>
            <li>
              <button type="button" className="helpBtn">
                <i className="far fa-question-circle"></i>
              </button>
            </li>
            <li>
              <button type="button" className="settingBtn">
              <i className="fa-sharp fa-solid fa-gear"></i>
              </button>
            </li>
          </ul>
        </div>
        <div className="userImg">
          <img className="borderLeft" src={line} alt="border-left" />
          <img src={user} alt="user" />
          <p>
            John Wick
            <br />
            <span>CEO, Admin</span>
          </p>
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
              <NavLink exact to="/home" activeClassName="activeNav">
                Home
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Lead")}>
              <NavLink exact to="/" activeClassName="activeNav">
                Lead
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Deal")}>
              <NavLink exact to="/deal" activeClassName="activeNav">
                Deal
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Mail")}>
              <NavLink exact to="/mail" activeClassName="activeNav">
                Mail
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Contacts")}>
              <NavLink exact to="/contacts" activeClassName="activeNav">
                Contacts
              </NavLink>
            </li>
            <li onClick={() => handleNavigationClick("Admin")}>
              <NavLink exact to="/admin" activeClassName="activeNav">
                Admin
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
