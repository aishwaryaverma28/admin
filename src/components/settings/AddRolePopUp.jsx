import React from 'react'

const AddRolePopUp = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="assign-role-popup-container">
        <div className="recycle-popup-box">
            <p className="common-fonts assign-role-heading">assign role</p>
            <div className='assign-role-dropdown'>
                <label htmlFor="" className='common-fonts'>Search role</label>
                <select name="" id="" className='common-input assign-role-select'>
                    <option value="">Deals</option>
                </select>
            </div>
        </div>

        <div>
            <p className='common-fonts assign-role-result'>Search result : 1</p>

            <div className='assign-search-details'>
             <div className='assign-deal-code'>
                <p className='common-fonts assign-name assign-bottom'>Name</p>
                <p className='common-fonts'>Deal edit</p>
             </div>
             <div className='assign-deal-code'>
                <p className='common-fonts assign-name'>Code</p>
                <p className='common-fonts'>dealedit_admin_job</p>
             </div>
            </div>
        </div>
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts" >Save</button>
      </div>
</div>
</div>
  )
}

export default AddRolePopUp