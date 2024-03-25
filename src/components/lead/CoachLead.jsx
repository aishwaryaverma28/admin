import React,{ useState } from 'react'
import CoachDetails from './CoachDetails';
import CoachImage from './CoachImage';

const CoachLead = ({ selectedItem, closeModal }) => {
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
                            Coach Details
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
                            Logs ()
                        </button>

                        <button
                            className={activeTab === "activity" ? "active" : ""}
                            onClick={() => handleTabClick("activity")}
                        >
                            <i class="fa-solid fa-sharp fa-regular fa-calendar-days"></i>
                            Activity ()
                        </button>
                        <button
                            className={activeTab === "notes" ? "active" : ""}
                            onClick={() => handleTabClick("notes")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Notes ()
                        </button>
                        <button
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i className="fa-sharp fa-regular fa-handshake-o"></i>
                            Leads ()
                        </button>
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => handleTabClick("email")}
                        >
                            <i className="fa-sharp fa-regular fa-envelope-open"></i>
                            Email ()
                        </button>
                    </div>
                     {/* ===================================================================tabination content */}
                     <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <CoachDetails selectedItem={selectedItem} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <CoachImage item={selectedItem} />
                            </div>
                        )}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CoachLead