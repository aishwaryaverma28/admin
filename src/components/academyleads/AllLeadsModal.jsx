import React,{useState} from 'react'
import {
    getDecryptedToken
} from "./../utils/Constants";
import AllLeadsAssign from './AllLeadsAssign';

const AllLeadsModal = ({ closeModal }) => {
    const decryptedToken = getDecryptedToken();
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
                    Acadmey Id: 156
                </button>
                <button
                    className={activeTab === "details2" ? "active" : ""}
                    onClick={() => handleTabClick("details2")}
                >
                    <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                    Acadmey Id: 723
                </button>
                </div>
            {/* ===================================================================tabination content */}
            <div className="tab-content">
                {activeTab === "details" && (
                    <div className="notes-tab-content">
                        <AllLeadsAssign/>
                    </div>
                )}
            </div>
        </div>
    </div>
   
</div>
)
}

export default AllLeadsModal