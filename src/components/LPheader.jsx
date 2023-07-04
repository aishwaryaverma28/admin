import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/LPheader.css";
import line from "../assets/image/Line.png";
import user from "../assets/image/user-img.png";
import logo from "../assets/image/logo.png";

const LPheader = () => {
  const [pageTitle, setPageTitle] = useState("Home");
  const [isNavOpen, setIsNavOpen] = useState(false);
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
          <input type="checkbox" name="" id="" />
          <div className="hamburgerLines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menuItems">
            <li onClick={() => handleNavigationClick("Home")}>
              <Link to="/home">Home</Link>
            </li>
            <li onClick={() => handleNavigationClick("Lead")}>
              <Link to="/">Lead</Link>
            </li>
            <li onClick={() => handleNavigationClick("Accounts")}>
              <Link to="/accounts">Accounts</Link>
            </li>
            <li onClick={() => handleNavigationClick("Contacts")}>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li onClick={() => handleNavigationClick("Admin")}>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Bottom Navigation End */}
    </>
  );
};

export default LPheader;
