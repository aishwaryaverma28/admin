import React from 'react'

const RecycleRestorePopUp = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="recycle-popup-container">
        <div className="recycle-popup-box">
            <p className="common-fonts restore-records">Add Documents</p>
               <input type="text" className='common-fonts common-input add-component-input' />      
        </div>
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts">Add</button>
      </div>
</div>
</div>
  )
}

export default RecycleRestorePopUp