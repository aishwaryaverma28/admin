import React from "react";
import "../styles/LPSetting.css";
import { NavLink } from "react-router-dom";
import arrowLeft from "../../assets/image/arrow-left.svg";
import { getDecryptedUserPath } from "../utils/Constants";

const LPSettingSidebar = () => {
  const decryptedUserPath = getDecryptedUserPath();
  const allowed = decryptedUserPath.split(",");
  // const allowed = ["/lp/lead","/lp/home","/lp/mail","/lp/contacts","/lp/deals","/lp/settings","/lp/settings/general","/lp/settings/notification","/lp/settings/usernteams","/lp/settings/companysettings","/lp/settings/recyclebin","/lp/settings/privacyConcent","/lp/settings/settingLeads","/lp/settings/settingDeal","/lp/settings/settingUsage","/lp/settings/settingImpExp"];
  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true; // All paths are allowed when allowed array is empty
    }
    return allowed.includes(path);
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate back in the browser history
  };
  return (
    <section className="setting-side-panel">
      <div className="go-back-btn ">
        <button className="setting-font-style" onClick={handleGoBack}>
          <img src={arrowLeft} alt="" />
          <span>Go Back</span>
        </button>
      </div>
      <div>
        <p className="setting-heading setting-font-style">Settings</p>
      </div>
      <div>
        <p className="prefrence setting-font-style">Your Prefrences</p>
        {isPathAllowed("/lp/settings/general") && (
          <p className="prefrence-options setting-font-style">
            {" "}
            <NavLink exact to="/lp/settings/general">
              General
            </NavLink>
          </p>
        )}
        {isPathAllowed("/lp/settings/notification") && (
          <p className="prefrence-options setting-font-style">
            <NavLink exact to="/lp/settings/notification">
              Notification
            </NavLink>
          </p>
        )}
      </div>

      <div>
        <p className="account-setup setting-font-style">Account Setup</p>
        {isPathAllowed("/lp/settings/usernteams") && (
          <p className="account-options setting-font-style">
            {" "}
            <NavLink exact to="/lp/settings/usernteams" activeClassName="activeLink">
              Users & Teams
            </NavLink>
          </p>
        )}
        {isPathAllowed("/lp/settings/privacyConcent") && (
          <p className="account-options setting-font-style">
            <NavLink exact to="/lp/settings/privacyConcent" activeClassName="activeLink">
              Privacy & Consent
            </NavLink>
          </p>
        )}
      </div>
      <div>
        <p className="company-setup setting-font-style">Company</p>
        {isPathAllowed("/lp/settings/companysettings") && (
        <p className="company-options setting-font-style">
           {" "}
          <NavLink
            exact
            to="/lp/settings/companysettings"
            activeClassName="activeLink"
          >
            Company Settings
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/settingLeads") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/settingLeads"
            activeClassName="activeLink"
          >
            Leads
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/settingDeal") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/settingDeal"
            activeClassName="activeLink"
          >
            Deals
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/settingUsage") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/settingUsage"
            activeClassName="activeLink"
          >
            Usage
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/settingImpExp") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/settingImpExp"
            activeClassName="activeLink"
          >
            Import & Export
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/workflow") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/workflow"
            activeClassName="activeLink"
          >
            WorkFlow
          </NavLink>
        </p>
        )}
        {isPathAllowed("/lp/settings/recyclebin") && (
        <p className="company-options setting-font-style">
          <NavLink
            exact
            to="/lp/settings/recyclebin"
            activeClassName="activeLink"
          >
            Recycle Bin
          </NavLink>
        </p>
        )}
      </div>
    </section>
  );
};

export default LPSettingSidebar;
