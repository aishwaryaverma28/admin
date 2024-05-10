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
            {obj?.academies?.map((item) => (
              <>
                {item?.cnt === 0 ? (
                  <div className="contact-details details_flex">
                    {item?.academy_id} - {item?.academy_name}
                    <div className="right_width">
                      <span className="greenText">Assigned</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="contact-details details_flex"
                      onClick={() => openModal(item)}
                    >
                      {item?.academy_id} - {item?.academy_name}:{" "}
                      <div className="right_width">
                        <span className="greenText">{item?.cnt} leads</span>
                      </div>
                    </div>
                    <br />
                  </>
                )}
              </>
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
