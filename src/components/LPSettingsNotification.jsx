import React, { useState } from "react";
import LPSettingSidebar from "./LPSettingSidebar";
import "./styles/LPSettingsNotification.css";
import ArrowGreater from "../assets/image/greater-arrow.svg";
import SearchIcon from "../assets/image/search.svg";
import Envelope from "../assets/image/envelope.svg";

const LPSettingsNotification = () => {
  const [activeTab, setActiveTab] = useState("email");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="settings-container">
      <LPSettingSidebar />
      <div className="mainPage">
        <section className="notification-setting-container notification-setting-fonts">
          <p className="notification-heading">Notification</p>

          <div className="notification-setting-btn notification-setting-fonts">
            <button
              className={`notification-btn ${
                activeTab === "email" ? "notification-active" : ""
              }`}
              onClick={() => handleTabClick("email")}
            >
              Email
            </button>
            <button
              className={`notification-btn ${
                activeTab === "desktop" ? "notification-active" : ""
              }`}
              onClick={() => handleTabClick("desktop")}
            >
              Desktop
            </button>
            <button
              className={`notification-btn ${
                activeTab === "otherApps" ? "notification-active" : ""
              }`}
              onClick={() => handleTabClick("otherApps")}
            >
              Other Apps
            </button>
          </div>
          {activeTab === "email" && (
            <>
              <div className="notification-email-section">
                <div className="envelope-section">
                  <img src={Envelope} alt="" />
                  <div className="notification-email-description">
                    <p>Email</p>
                    <p>
                      Notification will be sent to your saved mail. (You can
                      change your email anytime)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="notification-switch">
                    <input type="checkbox" />
                    <span className="notification-slider notification-round"></span>
                  </label>
                </div>
              </div>

              <div className="notification-list-section notification-setting-fonts">
                <p>Notify me about</p>

                <div className="search-user-section">
                  <div className="search-box">
                    <input
                      type="text"
                      className="search-input notification-setting-fonts"
                      placeholder="Search for notification topics"
                    />
                    <span className="search-icon">
                      <img src={SearchIcon} alt="" />
                    </span>
                  </div>
                </div>

                <div className="notification-list">
                  <ul>
                    <li>
                      <img src={ArrowGreater} alt="" /> <span>Calling</span>
                    </li>
                    <li>
                      <img src={ArrowGreater} alt="" /> <span>Deals</span>
                    </li>

                    <li>
                      <img src={ArrowGreater} alt="" /> <span>Leads</span>
                    </li>

                    <li>
                      <img src={ArrowGreater} alt="" /> <span>Activity</span>
                    </li>

                    <li>
                      <img src={ArrowGreater} alt="" />{" "}
                      <span>comments & mentions</span>
                    </li>
                    <li>
                      <img src={ArrowGreater} alt="" />{" "}
                      <span>Assigned to you</span>
                    </li>

                    <li>
                      <img src={ArrowGreater} alt="" />{" "}
                      <span>Contacts & Companies </span>
                    </li>

                    <li>
                      <img src={ArrowGreater} alt="" /> <span>Invoices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "desktop" && <>desktop</>}

          {activeTab === "otherApps" && <>other apps</>}
        </section>
      </div>
    </div>
  );
};

export default LPSettingsNotification;
