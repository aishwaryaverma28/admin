import React, { useState } from "react";
import "./styles/LPleads.css";
import user from "../assets/image/user.svg";
import userIcon from "../assets/image/user-img.png";

const LeadsColn = ({ leadArray, leadKey }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Function to handle the modal opening
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Function to handle the modal closing
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const totalValue = leadArray.reduce((sum, item) => sum + item.value, 0);
  return (
    <>
      <div className="card-details">
        <div class="main-cards">
          <div className="cards-new">
            <p
              className={`new-leads ${
                leadKey === "New"
                  ? "new-color"
                  : leadKey === "Open"
                  ? "open-color"
                  : leadKey === "InProgress"
                  ? "progress-color"
                  : leadKey === "Open deal"
                  ? "deal-color"
                  : leadKey === "Unread"
                  ? "unread-color"
                  : ""
              }`}
            >
              {leadKey}
            </p>
            <p className="leads">{leadArray.length} Leads</p>
          </div>

          {leadArray.map((item) => (
            <div key={item.id} className="user-card">
              <div className="user-details">
                <p className="heading">
                  {item.company_name}
                  <br />
                  <span>
                    <i className="far fa-clock"></i>{" "}
                    {item.creation_date.split("T")[0]}
                  </span>
                </p>
              </div>
              <a
                href="#"
                className="user-setting--btn"
                onClick={() => openModal(item)}
              >
                <i className="fas fa-ellipsis-h"></i>
              </a>
              <div className="contact-details">
                <div className="mail">
                  <img src={user} alt="" />
                  <p>{item.first_name + " " + item.last_name}</p>
                </div>
                <p className={item.priority === "Imp" ? "imptnt" : "avg"}>
                  {item.priority}
                </p>
              </div>
              {console.log(item)}
            </div>
          ))}
          <div class="bottom-fixed">
            <p>total: ${totalValue.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="customization_popup_container">
            <span className="close" onClick={closeModal}>
              <i className="fa-sharp fa-solid fa-xmark"></i>
            </span>
            <div className="user-details--left">
              <div className="user-details--heading">
                <img src={userIcon} alt="user" />
                <p>
                  {selectedItem.company_name}
                  <br />
                  <span>
                    ( Last Updated: {selectedItem.update_date.split("T")[0]} )
                  </span>
                </p>
                <a href="#" className="edit-details">
                  <i className="fa-solid fa-pen"></i>
                </a>
              </div>
              <div className="detailsBox">
                <p className="detailHead">DETAILS</p>
                
              </div>
            </div>
            {/* left side of modal ends here */}
          </div> 
          {/* modal container ends here */}
        </div>
      )}
    </>
  );
};

export default LeadsColn;
