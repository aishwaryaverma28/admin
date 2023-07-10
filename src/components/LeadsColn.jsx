import React, { useState } from "react";
import "./styles/LPleads.css";
import user from "../assets/image/user.svg";
import Modal from "./Modal";

const LeadsColn = ({ leadArray, leadKey }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const totalValue = leadArray.reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <div className="card-details">
        <div className="main-cards">
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
            <div
              key={item.id}
              className="user-card"
              onClick={() => openModal(item)}
            >
              <div className="user-details">
                <div>
                  <p className="heading">
                    {item.lead_name}
                    <br />
                    <span>
                      <i className="far fa-clock"></i>{" "}
                      {item.creation_date.split("T")[0]}
                    </span>
                  </p>
                </div>
                <a href="#" className="user-setting--btn">
                  <i className="fas fa-ellipsis-h"></i>
                </a>
              </div>
              <div className="lead-value">${item.value.toLocaleString("en-IN")}</div>
              <div className="contact-details">
                <div className="mail">
                  <img src={user} alt="" />
                  <p>{item.first_name + " " + item.last_name}</p>
                </div>
                <p className={item.priority === "Imp" ? "imptnt" : "avg"}>
                  {item.priority}
                </p>
              </div>
            </div>
          ))}
          <div className="bottom-fixed">
            <p>total: ${totalValue.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
      {modalVisible && (
        <Modal selectedItem={selectedItem} closeModal={closeModal} />
      )}
    </>
  );
};

export default LeadsColn;
