import React from 'react'

const RecycleRestorePopUp = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="recycle-popup-container">
        <div className="recycle-popup-box">
            <p className="common-fonts restore-records">Add Lost Reason</p>
              <div className='lost-flex'>
                <label htmlFor="" className='common-fonts'>Lost Reason</label>
                <textarea name="" id="" cols="45" rows="5"></textarea>
              </div>  
        </div>
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>No</button>
        <button className="restore-yes common-fonts">Save</button>
      </div>
</div>
</div>
  )
}

export default RecycleRestorePopUp