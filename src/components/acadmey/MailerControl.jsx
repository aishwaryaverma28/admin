import React from 'react'

const MailerControl = () => {
    return (
        <>
            <p className='common-fonts reply-head'>
                Mailer Control
            </p>
            <div className='flexBox mailer-conatiner'>
                <div className='box1 flexBox'>
                    <p className='common-fonts'>Status: </p>
                    <label className="password-switch">
                        <input
                            type="checkbox"
                        />
                        <span className="password-slider password-round"></span>
                    </label>
                </div>
                <div className='box2 flexBox'>
                    <p className='common-fonts'>Start Date: </p>
                    <input className='editInput'
                        type="date"
                        name="start_date"
                    />
                </div>
                <div className='box2 flexBox'>
                    <p className='common-fonts'>End Date: </p>
                    <input className='editInput'
                        type="date"
                        name="end_date"
                    />
                </div>
            </div>
            <div className='flexBox mailer-conatiner'>
                <div className='box2 flexBox'>
                    <p className='common-fonts'>Frequency : </p>
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
                <p className="common-fonts reply-head">
                    <button className="convertToDeal">
                        Immediate Mailer
                    </button>
                </p>
            </div>
        </>
    )
}

export default MailerControl