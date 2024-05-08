import React, {useState} from 'react'
import AllLeadsModal from './AllLeadsModal';

const AllLeadsCards = ({obj}) => {
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
              {obj?.city}
              {/* - <span>5 Leads</span> */}
            </p>
          </div>
          {obj?.academies?.map((item) => (
            <>
          <div className="contact-details">
          {item?.academy_id} - {item?.academy_name}: <span className='greenText'>{item?.['COUNT(l.id)']} leads</span>
          </div>
          <br/>
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
        />
      )}
  </>
  )
}

export default AllLeadsCards