import React from 'react'

const ResetPassword = ({onClose}) => {
  return (
    <div className="recycle-popup-wrapper">
        
    <div className="assign-role-popup-container">
        <div className="recycle-popup-box reset-password-box">
            <p className="common-fonts reset-password-heading">Reset password</p>
        </div>

        <div>
                <div className='pwd-label'>
                    <label htmlFor="" className='common-fonts pwd-heading'>New Passowrd</label>
                    <input type="password" className='common-fonts common-input pwd-input' />
                </div>
                <div className='pwd-label'>
                    <label htmlFor="" className='common-fonts pwd-heading'>Confirm Passowrd</label>
                    <input type="password" className='common-fonts common-input pwd-input' />
                </div>
             </div>


             <div className='pwd-rules'>
                <p className='common-fonts pwd-policy'>Password policy :</p>
                <p className='common-fonts pwd-notes'>Minimum 8 characters long</p>
                <p className='common-fonts pwd-notes'>1 number, symbol, or whitespace character</p>
                <p className='common-fonts pwd-notes'>1 uppercase letter</p>
                <p className='common-fonts pwd-notes'>1 special character</p>
             </div>

       
     


    <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>Cancel</button>
        <button className="restore-yes common-fonts" >Save</button>
      </div>
</div>
</div>
  )
}

export default ResetPassword