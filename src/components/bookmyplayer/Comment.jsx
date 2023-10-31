import React from 'react'

const Comment = ({onClose, description}) => {
  return (
    <div class="recycle-popup-wrapper">
        
    <div class="recycle-popup-container">
        <div class="recycle-popup-box">
            <p class="common-fonts restore-records">Respond To Review</p>
      <p class="common-fonts selected-records-note">{description}</p>      
        </div>
     


    <div class="recycle-popup-btn">
        <button class="restore-no common-fonts" onClick={onClose}>Close</button>

      </div>
</div>
</div>
  )
}

export default Comment