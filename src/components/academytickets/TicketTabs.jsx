import React, { useState } from 'react'
import AcademyTickets from "./AcademyTickets";
import Support from "./Support";
const TicketTabs = () => {
    const [activeTab, setActiveTab] = useState("people");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className='contant-to-ragne'>
                <div className="city-top-flex ">
                    <div className="genral-setting-btn genral-setting-fonts city-top-tab">
                        <button
                            className={`genral-btn  ${activeTab === "people" ? "genral-active" : ""
                                }`}
                            onClick={() => handleTabClick("people")}
                        >
                            Tickets (Registered User)
                        </button>
                        <button
                            className={`genral-btn contact-genral-btn ${activeTab === "company" ? "genral-active" : ""
                                }`}
                            onClick={() => handleTabClick("company")}
                        >
                            Tickets (Unregistered User)
                        </button>
                    </div>
                </div>
                {activeTab === "people" && (
                    <AcademyTickets />
                )}
                {activeTab === "company" && (
                    <Support />
                )}
            </div>
        </>
    )
}

export default TicketTabs