import React, { useState } from "react";
import AllLeadsModal from "./AllLeadsModal";

const AllLeadsCards = ({ obj, sport, getAllLeads }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [object, setObject] = useState();
  const openModal = (item) => {
    setObject(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
<div className="user-card2">
  <div className="card-container">
    <div className="card-leftBox">
      <div className="user-details city_cards">
        <p className="heading">
          {obj?.city}
          {/* - <span>5 Leads</span> */}
        </p>
      </div>
      {obj?.academies?.map((item, index) => (
        <div 
          className={`contact-details details_flex ${
            index === obj.academies.length - 1 ? "no-border" : ""
          }`} 
          onClick={item?.cnt > 0 ? () => openModal(item) : undefined}
        >
          {item?.academy_id} - {item?.academy_name}:{" "}
          <div className="right_width">
            <span  className={`${item?.cnt === 0 ? "assignText" : "greenText"}`}>{item?.cnt > 0 ? `${item?.cnt} leads` : "Assigned"}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="DealCard-rightBox"></div>
  </div>
</div>

      {modalVisible && (
        <AllLeadsModal
          closeModal={closeModal}
          object={object}
          sport={sport}
          getAllLeads={getAllLeads}
        />
      )}
    </>
  );
};

export default AllLeadsCards;
