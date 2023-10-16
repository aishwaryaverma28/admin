import React from "react";
import "../styles/LPSetting.css";
import "../styles/bmp.css";
import { NavLink } from "react-router-dom";

const BmpSidebar = () => {
  return (
    <section className="setting-side-panel">
     
      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        Profile
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/overview">
        Overview
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/fees">
        Fees and Batches
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/training">
        Training Strategy
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/gallery">
        Photos & Video
        </NavLink>
      </p>

      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        System
      </p>

      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/reviews">
        Reviews
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/leads">
        Leads
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/support">
        Contact Support
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/help">
        Help
        </NavLink>
      </p>

    </section>
  );
};

export default BmpSidebar;
