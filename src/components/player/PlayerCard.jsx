import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import "react-toastify/dist/ReactToastify.css";
import PlayerLead from "./PlayerLead.jsx";

const PlayerCard = ({
  object,
  itemName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});

  const openModal = (object) => {
    setModalVisible(true);
    setSelectedObj(object?.id);
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
      <div key={object?.id} className="user-card2">
        <div className="card-container">
          <div className="card-leftBox">
            <div className="user-details">
              <p className="heading" onClick={() => openModal(object)}>
                {object?.id} - {object?.name}
              </p>
            </div>
            <div className="contact-details">
              {itemName === "coach_with_leads" && (
                <div className="mail">
                  <p>Leads Count: {object?.lead_count}</p>
                </div>
              )}
              {itemName === "player_logs" && (
                <div className="mail">
                  <p>Count: {object?.visit_count}</p>
                </div>
              )}
              {itemName === "player_logs" && (
                <div className="mail">
                  <p>{object?.sport}</p>
                </div>
              )}
              {itemName === "player_logs" && (
                <div className="mail">
                  <p>{object?.city}</p>
                </div>
              )}
              {itemName === "verified_player" && (
                <>
                  {object?.email_verified === 1 && (
                    <div className="mail">
                      <p>Email Verified</p>
                    </div>
                  )}
                  {object?.mobile_verified === 1 && (
                    <div className="mail">
                      <p>Mobile Verified</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="DealCard-rightBox">
            {itemName === "player_logs" && (
              <>
                {(object?.email_verified === 1 || object?.mobile_verified === 1) && (
                  <div className="greenVerified"></div>
                )}
                {(object?.logged_in === 1) && (
                  <div className="yellowLogIn"></div>
                )}
              </>
            )}
            {itemName === "verified_player" && (
              <>
                {(object?.email_verified === 1 || object?.mobile_verified === 1) && (
                  <div className="greenVerified"></div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {modalVisible && (
        <PlayerLead
          selectedItem={selectedObj}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default PlayerCard;
