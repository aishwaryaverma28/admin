import React from 'react'

const StageModal = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="recycle-popup-container">
        <div className="recycle-popup-box">
            <p className="common-fonts restore-records">Add Field</p>

             <div>
                <label htmlFor="" className='common-fonts' ds-stage-label>Field Name (required)</label>
                <input type="text" className='common-fonts common-input ds-stage-input' />

                <label htmlFor="" className='common-fonts ds-stage-label'>Field Value (required)</label>
                <input type="text" className='common-fonts common-input ds-stage-input' />
             </div>    
        </div>
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts">Save</button>
      </div>
</div>
</div>
  )
}

export default StageModal