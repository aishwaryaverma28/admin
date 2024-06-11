import React,{useState} from 'react'
import CityTable from './CityTable'

const City = () => {
    const [activeTab, setActiveTab] = useState("people");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    return (
        <>
        <div className="performance_title2">
        {/* <img src={Back} alt="" onClick={onClose} /> */}
            <div className="contacts-top-flex ">
                <div className="genral-setting-btn genral-setting-fonts aaa">
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
            </div>
        </>
    )
}

export default City