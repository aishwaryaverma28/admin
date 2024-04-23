import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import AcadmeyLead from "./AcadmeyLead.jsx";
import CoachLead from "./CoachLead.jsx";
import UserLead from "./UserLead.jsx";
import PlayerLead from "./PlayerLead.jsx";

const LeadCards = ({
  object,
  onLeadAdded,
  itemName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coachMenu, setCoachMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [playerMenu, setPlayerMenu] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});

  const formatDate = (isoDate) => {
    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  const openModal = (object) => {
    if (itemName === "academy") {
      setModalVisible(true);
      setSelectedObj(object?.id);
    }
    if (itemName === "coach") {
      setCoachMenu(true);
      setSelectedObj(object?.id);
    }
    if (itemName === "user") {
      setUserMenu(true);
      setSelectedObj(object);
    }
    if (itemName === "player") {
      setPlayerMenu(true);
      setSelectedObj(object);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeCoachModal = () => {
    setCoachMenu(false);
  };
  const closeUserModal = () => {
    setUserMenu(false);
  };
  const closePlayerModal = () => {
    setPlayerMenu(false);
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
              <div className="mail sportCap">
                <p>{itemName === "user" ? <span> {object.type} - {object.parent_id}</span> : object.sport}</p>
              </div>
              {itemName === "academy" && (
                <div className="mail">
                  <p>{object.phone}</p>
                </div>
              )}

              {(itemName === "coach" || itemName === "player") && (
                <div className="mail">
                  <p>{object.mobile}</p>
                </div>
              )}
              {itemName === "user" && (
                <div className="mail">
                  {formatDate(object?.creation_date)}
                </div>
              )}
              {itemName !== "user" && (
                <div className="mail sportCap">
                  <p>{object.city}, {object.state}</p>
                </div>
              )}
            </div>
          </div>
          <div className="DealCard-rightBox">
            {itemName === "coach" && (
              <div className="mail">
                <div className="bmp-image-preview2">
                  <img
                    src={object?.profile_img === null
                      ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/coach/14/logo1.jpg"
                      : `https://bmpcdn.s3.ap-south-1.amazonaws.com/coach/${object?.id}/${object?.profile_img}`}
                    alt="pofile"
                    className="bmp-preview-image"
                  />
                </div>
              </div>
            )}
{itemName === "academy" && (
              <div className="mail">
                <div className="bmp-image-preview2">
                  <img
                    src={object?.logo === null
                      ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp"
                      : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy/${object?.id}/${object?.logo}`}
                    alt="pofile"
                    className="bmp-preview-image"
                  />
                </div>
              </div>
            )}
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
      {coachMenu && (
        <CoachLead
          selectedItem={selectedObj}
          closeModal={closeCoachModal}
        />
      )}
      {userMenu && (
        <UserLead
          selectedItem={selectedObj}
          closeModal={closeUserModal}
        />
      )}
      {playerMenu && (
        <PlayerLead
          selectedItem={selectedObj}
          closeModal={closePlayerModal}
        />
      )}

    </>
  );
};

export default LeadCards;
