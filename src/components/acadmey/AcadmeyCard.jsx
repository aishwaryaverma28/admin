import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";import "react-toastify/dist/ReactToastify.css";
import AcadmeyLead from "../lead/AcadmeyLead.jsx";

const AcadmeyCard = ({
  object,
  onLeadAdded,
  itemName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});

  const openModal = (object) => {
    setModalVisible(true);
      setSelectedObj(object);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        isMenuOpen &&
        !menuButtonRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMenuOpen]);

  
  return (
    <>
      <div key={object.id} className="user-card2">
        <div className="card-container">
          <div className="card-leftBox">
            <div className="user-details">
              <p className="heading" onClick={() => openModal(object)}>
                {object.id} - {object.name}
              </p>
            </div>
            <div className="lead-value">
            </div>
            <div className="contact-details">
              {itemName === "academyLeads" && (
                <div className="mail">
                  <p>Leads Count: {object.lead_count}</p>
                </div>
              )}
               {itemName === "academyLogs" && (
                <div className="mail">
                  <p>Visit Count: {object.visit_count}</p>
                </div>
              )}
              {itemName === "verified_acadmey" && (
                <>
                {object.email_verified === 1 &&
                  <div className="mail">
                    <p>Email Verified</p>
                  </div>
                }
                {object.mobile_verified === 1 &&
                  <div className="mail">
                    <p>Mobile Verified</p>
                  </div>
                }
              </>
              
              )}
           </div>
          </div>
          <div className="DealCard-rightBox">
            <button
              className="user-setting--btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuButtonRef}
            >
              <i className="fas fa-ellipsis-h"></i>
              {isMenuOpen && (
                <ul className="cardMenu" ref={menuRef}>
                  <li>Assign</li>
                  <li>Delete</li>
                </ul>
              )}
            </button>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                className={`cb1 ${object.status}-card-checkbox`}
                name={object.id}/>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      {modalVisible && (
        <AcadmeyLead
          selectedItem={selectedObj}
          closeModal={closeModal}
          onLeadAdded={onLeadAdded}
        />
      )}
     </>
  );
};

export default AcadmeyCard;
