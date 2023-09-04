import React, { useState } from "react";
import "../styles/LPSetting.css";
import { NavLink } from "react-router-dom";
import arrowLeft from "../../assets/image/arrow-left.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import { getDecryptedUserPath } from "../utils/Constants";

const LPSettingSidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [masterSubMenu, setMasterSubMenu] = useState(null);
  const decryptedUserPath = getDecryptedUserPath();
  // const allowed = decryptedUserPath.split(",");
  const allowed = [
    "/lp/lead",
    "/lp/home",
    "/lp/mail",
    "/lp/contacts",
    "/lp/deals",
    "/lp/settings",
    "/lp/settings/general",
    "/lp/settings/notification",
    "/lp/settings/usernteams",
    "/lp/settings/companysettings",
    "/lp/settings/recyclebin",
    "/lp/settings/privacyConcent",
    "/lp/settings/settingLeads",
    "/lp/settings/settingDeal",
    "/lp/settings/settingUsage",
    "/lp/settings/settingImpExp",
    "/lp/settings/blog/add",
    "/lp/settings/blog/view",
  ];
  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true; // All paths are allowed when allowed array is empty
    }
    return allowed.includes(path);
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate back in the browser history
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu((prevSubMenu) => (prevSubMenu === submenu ? null : submenu));
  };
  const toggleMasterSubMenu = (submenu) => {
    setMasterSubMenu((prevSubMenu) =>
      prevSubMenu === submenu ? null : submenu
    );
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
        <div
          className="setting-arrow"
          onClick={() => toggleSubMenu("yourPreferences")}
        >
          <p className="prefrence setting-font-style">Your Prefrences</p>
          <img
            src={openSubMenu === "yourPreferences" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
        {openSubMenu === "yourPreferences" && (
          <>
            {isPathAllowed("/lp/settings/general") && (
              <p className="prefrence-options setting-font-style">
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
            {/* Add more submenu items here as needed */}
          </>
        )}
      </div>

      <div>
        <div className="setting-arrow" onClick={() => toggleSubMenu("account")}>
          <p className="account-setup setting-font-style">Account Setup</p>
          <img
            src={openSubMenu === "account" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
        {openSubMenu === "account" && (
          <>
            {isPathAllowed("/lp/settings/usernteams") && (
              <p className="account-options setting-font-style">
                {" "}
                <NavLink
                  exact
                  to="/lp/settings/usernteams"
                  activeClassName="activeLink"
                >
                  Users & Teams
                </NavLink>
              </p>
            )}
            {isPathAllowed("/lp/settings/privacyConcent") && (
              <p className="account-options setting-font-style">
                <NavLink
                  exact
                  to="/lp/settings/privacyConcent"
                  activeClassName="activeLink"
                >
                  Privacy & Consent
                </NavLink>
              </p>
            )}
          </>
        )}
      </div>

      <div>
        <div className="setting-arrow" onClick={() => toggleSubMenu("company")}>
          <p className="company-setup setting-font-style">Company</p>
          <img
            src={openSubMenu === "company" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>

        {openSubMenu === "company" && (
          <>
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
          </>
        )}
      </div>

      <div>
        <div className="setting-arrow" onClick={() => toggleSubMenu("master")}>
          <p className="company-setup setting-font-style">Master Settings</p>
          <img
            src={openSubMenu === "master" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
      </div>

      {openSubMenu === "master" && (
        <>
          <p className="company-options master-settings-options setting-font-style">
            {" "}
            View Profile
          </p>

          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("blog")}>
          <p className="company-options master-settings-options setting-font-style">Blog</p>
          <img
            src={masterSubMenu === "blog" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>

          
          {masterSubMenu === "blog" && (
            <div className="sub-sub-menu">
              {isPathAllowed("/lp/settings/blog/add") && (
               
              <p className="company-options setting-font-style blog-options">
              <NavLink
                exact
                to="/lp/settings/blog/add"
                activeClassName="activeLink"
              >
                Add
                </NavLink>
              </p>

              )}

              
              {isPathAllowed("/lp/settings/blog/view") && (
               
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                View

              </NavLink>
              </p>
              )}
            </div>
          )}

          <div></div>

          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("site")}>
          <p className="company-options master-settings-options setting-font-style">Site</p>
          <img
            src={masterSubMenu === "site" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
          {masterSubMenu === "site" && (
            <div className="sub-sub-menu">
              <p className="company-options  setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Add
                </NavLink>
              </p>
              <p className="company-options  setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                View
                </NavLink>
              </p>
            </div>
          )}
          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("help")}>
          <p className="company-options master-settings-options setting-font-style">Help</p>
          <img
            src={masterSubMenu === "help" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
          {masterSubMenu === "help" && (
            <div className="sub-sub-menu">
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Add
                </NavLink>
              </p>
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Update
                </NavLink>
              </p>
            </div>
          )}
          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("user")}>
          <p className="company-options master-settings-options setting-font-style">User Management</p>
          <img
            src={openSubMenu === "master" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
          {masterSubMenu === "user" && (
            <div className="sub-sub-menu">
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Add
                </NavLink>
              </p>
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Update
                </NavLink>
              </p>
            </div>
          )}

          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("employee")}>
          <p className="company-options master-settings-options setting-font-style">Employee</p>
          <img
            src={masterSubMenu === "employee" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
          {masterSubMenu === "employee" && (
            <div className="sub-sub-menu">
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                Add
                </NavLink>
              </p>
              <p className="company-options setting-font-style">
                View
              </p>
            </div>
          )}

          <div className="setting-arrow">
          <p className="company-options master-settings-options setting-font-style">Access Management</p>
        </div>

        <div className="setting-arrow">
          <p className="company-options master-settings-options setting-font-style">Reports And Analytics</p>
        </div>
        <div className="setting-arrow" onClick={() => toggleMasterSubMenu("master-setting")}>
          <p className="company-options master-settings-options setting-font-style">Master Settings</p>
          <img
            src={masterSubMenu === "master-setting" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
          {masterSubMenu === "master-setting" && (
            <div className="sub-sub-menu">
              <p className="company-options setting-font-style">
              <NavLink
                exact
                to="/lp/settings/blog/view"
                activeClassName="activeLink"
              >
                City
                </NavLink>
              </p>
            </div>
          )}

          <div className="setting-arrow" onClick={() => toggleMasterSubMenu("system")}>
          <p className="company-options master-settings-options setting-font-style">System</p>
          <img
            src={masterSubMenu === "system" ? GreaterUp : GreaterDown}
            alt=""
          />
        </div>
        </>
      )}
    </section>
  );
};

export default LPSettingSidebar;
