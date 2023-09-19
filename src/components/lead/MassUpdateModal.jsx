import React, { useState} from 'react';

const MassUpdateModal = ({ onClose, userData , text }) => {

    const handleOwnerClick = (id) => {
     console.log(id);
      } 
    



  return (
    <div className="recycle-popup-wrapper">
      <div className="recycle-popup-container">
        <div className="recycle-popup-box">
          <p className="common-fonts restore-records">Reassign {text}</p>
          <p className="common-fonts selected-mass-user">Reassign To:</p>
            <select name="" id=""className='common-input mass-update-input'  onChange={(e) => handleOwnerClick(e.target.value)}>
            {userData.map((item) => (
                            <option
                              key={item?.id}
                              value={item?.id}
                              className="owner-val"
                              
                            >
                              {`${
                                item?.first_name.charAt(0).toUpperCase() +
                                item?.first_name.slice(1)
                              } ${
                                item?.last_name.charAt(0).toUpperCase() +
                                item?.last_name.slice(1)
                              }`}
                            </option>
                          ))}

            </select>
          <div className="recycle-popup-btn mass-update-btn">
            <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
            <button className="restore-yes common-fonts">Reassign</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassUpdateModal;
