import React,{ useState } from 'react'
import UserDetails from './UserDetails';
import BmpTickets from './BmpTickets';
import LeadImage from './LeadImage';
import CoachImage from './CoachImage';
import CoachDetails from './CoachDetails';
import AcademyDetails from './AcademyDetails';

const UserLead = ({ selectedItem, closeModal }) => {
    const [activeTab, setActiveTab] = useState("details");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  return (
    <div className="modal">
            <div className="leftClose" onClick={closeModal}></div>
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
                {/* left side of modal ends here */}
                <div className="user-details--right">
                    <div className="tab-navigation">
                         {/* ===================================================================tabination buttons */}
                         <button
                            className={activeTab === "details" ? "active" : ""}
                            onClick={() => handleTabClick("details")}
                        >
                            <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                            {selectedItem?.type} Details
                        </button>
                        <button
                            className={activeTab === "gallery" ? "active" : ""}
                            onClick={() => handleTabClick("gallery")}
                        >
                            <i class="fa-sharp fa-regular fa-images"></i>
                            Images
                        </button>
                        <button
                            className={activeTab === "logs" ? "active" : ""}
                            onClick={() => handleTabClick("logs")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            Logs
                        </button>
                        <button
                            className={activeTab === "tickets" ? "active" : ""}
                            onClick={() => handleTabClick("tickets")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            Tickets
                        </button>
                        
                        <button
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i className="fa-sharp fa-regular fa-handshake-o"></i>
                            Leads
                        </button>
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => handleTabClick("email")}
                        >
                            <i className="fa-sharp fa-regular fa-envelope-open"></i>
                            Email
                        </button>
                    </div>
                     {/* ===================================================================tabination content */}
                     <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                {selectedItem?.type === "Coach" ? <CoachDetails id={selectedItem?.parent_id} /> : selectedItem?.type === "Academy" ? <AcademyDetails id={selectedItem?.parent_id} />: null}
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                {selectedItem?.type === "Coach" ? <CoachImage id={selectedItem?.parent_id} /> : selectedItem?.type === "Academy" ? <LeadImage id={selectedItem?.parent_id} />: null}
                                
                            </div>
                        )}
                        {activeTab === "tickets" && (
                            <div className="notes-tab-content">
                                <BmpTickets selectedItem={selectedItem} />
                            </div>
                        )}
                        </div>
                </div>
            </div>
        </div>
  )
}

export default UserLead