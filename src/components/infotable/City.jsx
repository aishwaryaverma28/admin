import React, { useState } from 'react'
import CityTable from './CityTable'
import "../styles/Contacts.css";
import Back from "../../assets/image/arrow-left.svg";
import TempCityTable from './TempCityTable';
const City = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("people");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className='contant-to-ragne'>
                <div className="city-top-flex ">
                <img src={Back} alt="" onClick={onClose} />
                    <div className="genral-setting-btn genral-setting-fonts city-top-tab">
                        <button
                            className={`genral-btn  ${activeTab === "people" ? "genral-active" : ""
                                }`}
                            onClick={() => handleTabClick("people")}
                        >
                            Original Table
                        </button>
                        <button
                            className={`genral-btn contact-genral-btn ${activeTab === "company" ? "genral-active" : ""
                                }`}
                            onClick={() => handleTabClick("company")}
                        >
                            Temporary Table
                        </button>
                    </div>
                </div>
                {activeTab === "people" && (
        <CityTable/>
      )}
      {activeTab === "company" && (
        <TempCityTable/>
      )}
            </div>
        </>
    )
}

export default City