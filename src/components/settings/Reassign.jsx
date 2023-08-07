import React from 'react'

const Reassign = ({ onCloseReassign, teamData }) => {
    return (
        <div className="recycle-popup-wrapper">

            <div className="recycle-popup-container reassign-container">
                <div className="recycle-popup-box">
                    <p className="common-fonts restore-records">reassign data</p>
                    <p className='common-fonts deactivate-note' >List of users :</p>
                </div>

                <div className='reassign-members'>
                    {
                        teamData.map(members=>{
                            return (
                                <div className='reassign-label common-fonts'>
                                <label className='common-fonts'>
                                    <input type="radio" name="name" value="anant singh" className='reassign-radio' />
                                    {members.first_name} {members.last_name}
                                </label>
                                </div>

                            )
                        })
                    }
               


                        </div>





                    <div className="recycle-popup-btn">
                        <button className="restore-no common-fonts" onClick={onCloseReassign}>Cancel</button>
                        <button className="common-save-button reassign-save common-fonts">Reassign</button>

                    </div>
                </div>
            </div>
            )
}

            export default Reassign