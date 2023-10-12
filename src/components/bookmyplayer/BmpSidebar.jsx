import React from "react";
import "../styles/LPSetting.css";
import { NavLink } from "react-router-dom";

const BmpSidebar = () => {
  return (
    <section className="setting-side-panel">
      <div>BmpSidebar</div>
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
        Gallery
        </NavLink>
      </p>
    </section>
  );
};

export default BmpSidebar;
