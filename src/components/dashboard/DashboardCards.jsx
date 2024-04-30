import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import CoachLead from "../lead/CoachLead.jsx";
import PlayerLead from "../lead/PlayerLead.jsx";
import NewUserLead from "../newuser/NewUserLead.jsx";
import AcadmeyLead from "../lead/AcadmeyLead.jsx";

const DashboardCards = ({
  object,
  onLeadAdded,
  itemName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [coachMenu, setCoachMenu] = useState(false);
  const [coachNewMenu, setCoachNewMenu] = useState(false);
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
    console.log(object)
    if (itemName === "academy") {
      if(object?.parent_tbl === 0)
      {
      setModalVisible(true);
      setSelectedObj(object);
    }
    else{
      setAcademyOpen(true);
      setSelectedObj(object?.parent_id);
    }
    }
    if (itemName === "coach") {
      if(object?.parent_tbl === 0)
      {}
      else{
      setCoachMenu(true);
      setSelectedObj(object?.parent_id);
      }
    }
    if (itemName === "player") {
      if(object?.parent_tbl === 0)
      {}
      else{
      setPlayerMenu(true);
      setSelectedObj(object?.parent_id);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeAcademyModal = () => {
    setAcademyOpen(false);
  };
  const closeCoachModal = () => {
    setCoachMenu(false);
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
                <p><span> {object.type} - {object.parent_id}</span></p>
              </div>
              <div className="mail">
                {formatDate(object?.creation_date)}
              </div>
            </div>
          </div>
          <div className="DealCard-rightBox">
            {object?.parent_tbl === 0 ? <> <div className="newData">New</div></> : <></>}
          </div>
        </div>
      </div>
      {modalVisible && (
        <NewUserLead
          selectedItem={selectedObj}
          closeModal={closeModal}
          onLeadAdded={onLeadAdded}
        />
      )}
      {academyOpen && (
        <AcadmeyLead
         selectedItem={selectedObj}
        closeModal={closeAcademyModal}
        onLeadAdded={onLeadAdded}/>
      )}
      {coachMenu && (
        <CoachLead
          selectedItem={selectedObj}
          closeModal={closeCoachModal}
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

export default DashboardCards;
