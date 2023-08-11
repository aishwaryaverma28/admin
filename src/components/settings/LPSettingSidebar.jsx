import React from 'react';
import '../styles/LPSetting.css';
import { NavLink } from "react-router-dom";
import arrowLeft from "../../assets/image/arrow-left.svg";

const LPSettingSidebar = () => {
      const handleGoBack = () => {
            window.history.back(); // Navigate back in the browser history
          };
  return (
      <section className="setting-side-panel">
    <div className="go-back-btn ">
      <button className="setting-font-style" onClick={handleGoBack}><img src={arrowLeft} alt="" /><span>Go Back</span></button>
    </div>
    <div>
      <p className="setting-heading setting-font-style">Settings</p>
    </div>
    <div>
      <p className="prefrence setting-font-style">Your Prefrences</p>
      <p className="prefrence-options setting-font-style"> <NavLink
            exact to="/lp/settings/general" 
            >General</NavLink></p>
      <p className="prefrence-options setting-font-style"><NavLink
            exact to="/lp/settings/notification"       
            >Notification</NavLink></p>
    </div>

    <div>
      <p className="account-setup setting-font-style">Account Setup</p>
      <p className="account-options setting-font-style"> <NavLink
            exact to="/lp/settings/usernteams"
            activeClassName="activeLink"
            >users & teams</NavLink></p>
      <p className="account-options setting-font-style"><NavLink
            exact to="/lp/settings/privacyConcent"
            activeClassName="activeLink"
            >privacy & consent</NavLink></p>
    </div>
    <div>
      <p className="company-setup setting-font-style">Company</p>
      <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/companysettings"
            activeClassName="activeLink"
            >Company Settings</NavLink></p>
      <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/settingLeads"
            activeClassName="activeLink"
            >Leads</NavLink></p>
      <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/settingDeal"
            activeClassName="activeLink"
            >Deals</NavLink></p>
      <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/settingUsage"
            activeClassName="activeLink"
            >Usage</NavLink></p>
      <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/settingImpExp"
            activeClassName="activeLink"
            >Import & Export</NavLink></p>
             <p className="company-options setting-font-style"><NavLink
            exact to="/lp/settings/recyclebin"
            activeClassName="activeLink"
            >Recycle Bin</NavLink></p>
    </div>
  </section>
  )
}

export default LPSettingSidebar