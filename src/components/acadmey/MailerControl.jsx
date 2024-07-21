import React, { useState } from 'react'

const MailerControl = () => {
    const [stateBtn, setStateBtn] = useState(0);
    return (
        <section className='mailer-sec'>
            <p className='common-fonts reply-head'>
                Mailer Control
            </p>
            <div className='flexBox mailer-conatiner'>
                <div className='box1 flexBox'>
                    <p className='common-fonts'>Status: </p>
                    <label className="password-switch lead-switch">
                        <input
                            type="checkbox"
                        />
                        <span className="password-slider lead-slider password-round"></span>
                    </label>
                </div>
                <div className='box2 flexBox'>
                    <p className='common-fonts p-width'>Start Date: </p>
                    <input className='editInput'
                        type="date"
                        name="start_date"
                    />
                </div>
                <div className='box2 flexBox'>
                    <p className='common-fonts p-width'>End Date: </p>
                    <input className='editInput'
                        type="date"
                        name="end_date"
                    />
                </div>
            </div>
            <div className='flexBox mailer-conatiner'>
                <div className='box3 flexBox'>
                    <p className='common-fonts f-width'>Frequency : </p>
                    <span className='newEditableArea'>
                        <select
                            name="frequency"
                            id="frequency"
                            className='editInput'
                        >
                            <option value=""></option>
                            <option value="months">Months</option>
                            <option value="days">Days</option>
                            <option value="hours">Hours</option>
                        </select>
                        <input className='editInput'
                            type="text"
                            name=""
                        />
                    </span>
                </div>
                {stateBtn === 0 ? (
                    <button className="disabledBtn new-disable" disabled>
                        Update
                    </button>
                ) : (
                    <button
                        className="common-save-button permission-save-btn"
                    >
                        Update
                    </button>
                 )}
                <p className="common-fonts reply-head">
                    <button className="convertToDeal">
                        Immediate Mailer
                    </button>
                </p>
            </div>
        </section>
    )
}

export default MailerControl