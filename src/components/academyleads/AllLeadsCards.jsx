import React, {useState} from 'react'
import AllLeadsModal from './AllLeadsModal';

const AllLeadsCards = () => {
  const [modalVisible, setModalVisible] = useState(false);
const openModal = () => {
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
            <p className="heading" onClick={openModal}>
              Mumbai- <span>5 Leads</span>
            </p>
          </div>
          <div className="contact-details">
          Dolphin Swimming Pool SAAP Edupugallu: <span className='greenText'>3leads</span>
          </div>
          <br/>
          <div className="contact-details">
          RRC Swimming Pool Vishwamanya Swimming Academy: <span className='greenText'>2leads</span>
          </div>          
        </div>
        <div className="DealCard-rightBox">
          
        </div>
      </div>
    </div>
    {modalVisible && (
        <AllLeadsModal
          closeModal={closeModal}
        />
      )}
  </>
  )
}

export default AllLeadsCards