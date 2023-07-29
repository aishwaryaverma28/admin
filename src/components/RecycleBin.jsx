import React from "react";
import "./styles/RecycleBin.css";
import LPSettingSidebar from "./LPSettingSidebar";

const RecycleBin = () => {
  return (
    <div>
      <div className="settings-container">
        <LPSettingSidebar />
        <div className="mainPage"></div>
      </div>
    </div>
  );
};

export default RecycleBin;
