import React from 'react'

const LabelModal = ({onClose, onSave}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="recycle-popup-container">
        <div className="recycle-popup-box">
            <p className="common-fonts restore-records">add new label</p>
       <div>
        <label htmlFor="" className='common-fonts'>Label name</label>
        <input type="text" className='common-input label-input' />
        </div>    

                <div>
            <p className='common-fonts'>Label color</p>
            <div className='circle-flex'>
                <div className='genral-circle circle1'></div>
                <div className='genral-circle circle2'></div>
                <div className='genral-circle circle3'></div>
                <div className='genral-circle circle4'></div>
                <div className='genral-circle circle5'></div>
                <div className='genral-circle circle6'></div>
                <div className='genral-circle circle7'></div>
                <div className='genral-circle circle8'></div>
                <div className='genral-circle circle9'></div>
                <div className='genral-circle circle10'></div>
            </div>
        </div>
         
        </div>




    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts" onClick={onSave}>Save</button>
      </div>
</div>
</div>
  )
}

export default LabelModal