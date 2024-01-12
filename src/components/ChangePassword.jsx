import React from 'react'

const ChangePassword = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper wrapper_new">
        
    <div className="recycle-popup-container">
        <div className="recycle-popup-box">
         
        </div>
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts">Save</button>
      </div>
</div>
</div>
  )
}

export default ChangePassword
