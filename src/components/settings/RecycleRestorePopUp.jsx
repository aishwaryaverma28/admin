import React from 'react'

const RecycleRestorePopUp = ({onClose,onRestoreConfirmed}) => {
  return (
    <div class="recycle-popup-wrapper">
        
    <div class="recycle-popup-container">
        <div class="recycle-popup-box">
            <p class="common-fonts restore-records">Restore checked records</p>
      <p class="common-fonts selected-records-note">The selected record and their entities will get restored.</p>
      <p class="common-fonts restore-questions">Are you sure you want to permanently restore the record?  </p>        
        </div>
     


    <div class="recycle-popup-btn">
        <button class="restore-no common-fonts" onClick={onClose}>No</button>
        <button class="restore-yes common-fonts" onClick={onRestoreConfirmed}>Yes</button>
      </div>
</div>
</div>
  )
}

export default RecycleRestorePopUp