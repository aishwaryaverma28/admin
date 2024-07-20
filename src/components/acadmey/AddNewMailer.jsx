import React, { useState } from 'react'
import { editStylingInput, editStylingTextarea, editStylingSelect1 } from "./../utils/variables";
const AddNewMailer = () => {
    const [openEditor, setOpenEditor] = useState(false);
    const [stateBtn, setStateBtn] = useState(0);
    const expandEditor = () => {
        setOpenEditor(!openEditor)
    }
    const handleCancelBtn = (e) => {
        e.preventDefault();
        setOpenEditor(false);
        setStateBtn(0);
    };
    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <>
            {!openEditor ? (
                <div className="colapedEditor" onClick={expandEditor}>
                    <p>Click here to add new mailer</p>
                </div>
            ) : (
                <>
                    <div className="new-height">
                        <div className="leadDetailsLeft">
                            <div className="detailsBox">
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>Mailer Name</p>
                                        <p>Status</p>
                                        <p>Event Type</p>
                                        <p>Frequency</p>
                                        <p>Start Date</p>
                                        <p>End Date</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span className='newEditableArea'>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    style={editStylingInput}
                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <select
                                                    name="status"
                                                    id="status"
                                                    style={editStylingSelect1}
                                                >
                                                    <option value=""></option>
                                                    <option value="1">Enable</option>
                                                    <option value="0">Disable</option>
                                                </select>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <select
                                                    name="type"
                                                    id="type"
                                                    style={editStylingSelect1}
                                                >
                                                    <option value=""></option>
                                                    <option value="1">Recurring</option>
                                                    <option value="0">One time</option>
                                                </select>
                                            </span>
                                        </p>
                                        <p>
                                            <span className='newEditableArea'>
                                                <select
                                                    name="frequency"
                                                    id="frequency"
                                                    style={editStylingSelect1}
                                                >
                                                    <option value=""></option>
                                                    <option value="months">Months</option>
                                                    <option value="days">Days</option>
                                                    <option value="hours">Hours</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name=""
                                                    style={editStylingInput}
                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="date"
                                                    name="start_date"
                                                    style={editStylingInput}
                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="date"
                                                    name="end_date"
                                                    style={editStylingInput}
                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-support-button headphone-btn">
                                    <button className="common-white-button" onClick={handleCancelBtn}>Cancel</button>
                                    {stateBtn === 0 ? (
                                        <button className="disabledBtn" disabled>
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="common-save-button permission-save-btn"
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AddNewMailer