import React,{ useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import TextIcon from "../../assets/image/text-icon.svg";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import Calling from "../../assets/image/call-calling.svg";
import axios from "axios";
import {
  ADD_ACTIVITY,
  handleLogout,
  getDecryptedToken,
} from "../utils/Constants";


const LeadCall = ({type, item, id}) => {
  const [startDate, setStartDate] = useState(null);
    const decryptedToken = getDecryptedToken();

  
  return (
    <div>
      <div className='activity-call-btn'>
        <button className='common-fonts log-meeting'>Log Call</button>
        <button className='common-fonts log-meeting call-btn-active'>Make a Phone Call</button>
      </div>

      <div className='activity-time-travel'>
                  <div className="permission-input-box">
                    <label className="common-fonts activity-label">
                      Date
                    </label>

                    <div className="custom-date-input">
                    <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="activity-calender-icon"
                        />
                      <div className="activity-date-wrapper">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="activity-date-input"
                          dateFormat="dd/MM/yyyy"
                          value={startDate}
                          placeholderText="dd/mm/yyyy"
                        />

                      </div>
                    </div>
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts activity-label activity-label-2">
                      Time From
                    </label>

                   <select name="" id="" className='common-fonts activity-select'>
                    <option value="">hh:mm Pm</option>
                   </select>
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts activity-label activity-label-2">
                     Time To
                    </label>

                   <select name="" id="" className='common-fonts activity-select'>
                    <option value="">hh:mm Pm</option>
                   </select>
                  </div>
                </div>

                <div className='activity-text'>
                  <img src={TextIcon} alt="" />
                  <textarea name="" id="" cols="30" rows="10" className='common-fonts activity-text-area' placeholder='Write Here'></textarea>
                </div>

                <div className='activity-bottom'>
                  <p className='common-fonts activity-month'>July 2023</p>

                  <div className="savedNotes">

            <>
              <section  className="note-display">
                <div
                  className="note-content"
                 
                >
                  <div className="arrow-greater">
                    <img src={GreaterArrow} alt="" />
                  </div>

                  <div className="notes-main">
                    <div className="notes-by">
                      <p>
                        <span>Task </span>
                        assigned to anant
                      </p>
                      <div className="notes-date activity-date">
                      <img src={CalendarIcon} alt="" />
                        <p className='common-fonts activity-date'>
                        Due July 6, 2023 at 10:00 AM GMT+5:30
                        </p>

                      </div>
                    </div>
                    <div className="">
                    <div className='activity-ring'>
                    <div className='activity-calling'>
                     <img src={Calling} alt="" />
                    </div>
                    <p className='common-fonts activity-call-name'>Call</p>

                    </div>

                    </div>
                  </div>
                </div>
              </section>

              <div
                className={
                   "answer display_answer"
                }
              >

              </div>
            </>

        </div>
                </div>
    </div>
  )
}

export default LeadCall
