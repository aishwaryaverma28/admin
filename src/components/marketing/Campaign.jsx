import React from "react";
import { useState } from "react";
import "../styles/Marketing.css";
import Search from "../../assets/image/search.svg";
import WhatsappCampaign from "./WhatsappCampaign.jsx";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [number, setNumber] = useState(0);
  const [topButton, setTopButton] = useState("+ Create Campaign");


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNumber(number === 0 ? 1 : 0);
  };

  const handleDataFromChild = (data) => {
  setTopButton(data);
  };
  return (
    <div>

      <div className="contacts-top-flex ">
        <div className="genral-setting-btn genral-setting-fonts aaa">
          <button
            className={`genral-btn  ${
              activeTab === "whatsapp" ? "genral-active" : ""
            }`}
            onClick={() => handleTabClick("whatsapp")}
          >
            <i class="fa-sharp fa-regular fab fa-whatsapp"></i>
            <span className="mrkt-whatsapp"> Whatsapp Campaign</span>
          </button>
          <button
            className={`genral-btn contact-genral-btn ${
              activeTab === "email" ? "genral-active" : ""
            }`}
            onClick={() => handleTabClick("email")}
          >
            <i class="fa-sharp fa-regular fa-envelope"></i>
            <span className="mrkt-whatsapp"> Email Campaign</span>
          </button>
        </div>
        <div className="contact-top-right">
        {
            number === 0 ? (
                <>
                <div className="recycle-search-box">
            <input
              type="text"
              className="recycle-search-input recycle-fonts"
              placeholder="Search..."
            />
            <span className="recycle-search-icon">
              <img src={Search} alt="" />
            </span>
          </div>

          <div>
          {
            topButton === "+ Create Campaign" ? (
              <button className="common-fonts common-save-button mrkt-new-btn">+ Create Campaign</button>
            ) : (
              <button className="common-fonts common-save-button mrkt-new-btn">+ Create List</button>
            )
          }
            
          </div>
          </>
            )  : (
                <>
                <div className="recycle-search-box">
            <input
              type="text"
              className="recycle-search-input recycle-fonts"
              placeholder="Search..."
            />
            <span className="recycle-search-icon">
              <img src={Search} alt="" />
            </span>
          </div>
          <div>
            <button className="common-fonts common-save-button mrkt-new-btn">+ Create Campaign</button>
          </div>
          </>
            )      }

        </div>
      </div>
      {
        activeTab === "whatsapp"  && (
          <WhatsappCampaign sendDataToParent={handleDataFromChild}/>
        )
      }
    </div>
  );
};

export default Campaign;
