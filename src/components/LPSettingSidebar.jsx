import React from 'react';
import './styles/LPSetting.css';
import { NavLink } from "react-router-dom";
import arrowLeft from "../assets/image/arrow-left.svg";

const LPSettingSidebar = () => {
  return (
      <section className="setting-side-panel">
    <div className="go-back-btn ">
      <button className="setting-font-style"><img src={arrowLeft} alt="" /><span>Go Back</span></button>
    </div>
    <div>
      <p className="setting-heading setting-font-style">Settings</p>
    </div>
    <div className="setting-font-style">
      <p className="prefrence">Your Prefrences</p>
      <p className="prefrence-options"> <NavLink
            exact to="/lp/settings/general" 
            >General</NavLink></p>
      <p className="prefrence-options"><NavLink
            exact to="/lp/settings/notification"       
            >Notification</NavLink></p>
      <p className="prefrence-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Security</NavLink></p>
    </div>

    <div className="setting-font-style">
      <p className="account-setup">Account Setup</p>
      <p className="account-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >account defaults</NavLink></p>
      <p className="account-options"> <NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >users & teams</NavLink></p>
      <p className="account-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >privacy & consent</NavLink></p>
    </div>
    <div className="setting-font-style">
      <p className="company-setup">Company</p>
      <p className="company-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Company Settings</NavLink></p>
      <p className="company-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Leads</NavLink></p>
      <p className="company-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Deals</NavLink></p>
      <p className="company-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Usage</NavLink></p>
      <p className="company-options"><NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >Import & Export</NavLink></p>
    </div>
  </section>
  )
}

export default LPSettingSidebar