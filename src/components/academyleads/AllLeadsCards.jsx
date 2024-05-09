import React, { useState } from 'react'
import AllLeadsModal from './AllLeadsModal';

const AllLeadsCards = ({ obj , sport, getAllLeads }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [object, setObject] = useState();
  const openModal = (item) => {
    setObject(item)
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div className="user-card2">
        <div className="card-container">
          <div className="card-leftBox">
            <div className="user-details">
              <p className="heading">
                {obj?.city}
                {/* - <span>5 Leads</span> */}
              </p>
            </div>
            {obj?.academies?.map((item) => (
              <>
                <div className="contact-details" onClick={() => openModal(item)}>
                  {item?.academy_id} - {item?.academy_name}: <span className='greenText'>{item?.cnt} leads</span>
                </div>
                <br />
              </>
            ))}
          </div>
          <div className="DealCard-rightBox">

          </div>
        </div>
      </div>
      {modalVisible && (
        <AllLeadsModal
          closeModal={closeModal}
          object= {object}
          sport={sport}
          getAllLeads={getAllLeads}
        />
      )}
    </>
  )
}

export default AllLeadsCards