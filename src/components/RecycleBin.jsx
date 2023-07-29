import React, { useState } from 'react';
import "./styles/RecycleBin.css";
import LPSettingSidebar from "./LPSettingSidebar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../assets/image/calendar.svg';

const RecycleBin = () => {

  const defaultDate = new Date();
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);


  
  const handleInputClick = (e) => {
    e.preventDefault();
 
  };

  return (
    <div>
      <div className="settings-container">
        <LPSettingSidebar />
        <div className="mainPage">
          <section className="recycle-container">

            <div className="recycle-top">
              <div>
                <p className="recycle-heading recycle-fonts">Recycle Bin</p>
                <p className="recycle-note recycle-fonts">Restore Deals deleted in the last 90 days</p>
              </div>

              <div className="recycle-top-right">
                <p className="default-days recycle-fonts">Default delete Days</p>
                <select name="" id="" className="recycle-fonts default-days-select">
                  <option value="">30days</option>
                  <option value="">45days</option>
                  <option value="">60days</option>
                  <option value="">90days</option>
                </select>
              </div>

            </div>

            <div className="recycle-setting-btn ">
              <button className="recycle-btn recycle-active recycle-fonts">Notes (20)</button>
              <button className="recycle-btn recycle-fonts ">Deals (9)</button>
              <button className="recycle-btn recycle-fonts ">Leads (6)</button>
              <button className="recycle-btn recycle-fonts ">Company (12)</button>
              <button className="recycle-btn recycle-fonts ">Contacts (10)</button>

            </div>



            <div className="recycle-search-user-section">
              <div className="recycle-search-box">
                <input type="text" className="recycle-search-input recycle-fonts" placeholder="Search..." />
                <span className="recycle-search-icon">
                  <img src="../assets/image/search.svg" alt="" />
                </span>
              </div>

              <div className="recycle-date" >
                <div className="custom-date-input">

                  <div className='date-input-wrapper'>
                  <img src={CalendarIcon} alt="Delete" className="delete-icon" />
              
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="recycle-date-input"
                  onClick={handleInputClick}
                  dateFormat="dd/MM/yyyy"
                  
                />

                  </div>

               
     
                 
                
                </div>

                <span className="recycle-fonts date-to">To</span>

                <div className="custom-date-input">
                  <div className='date-input-wrapper'>

                  <img src={CalendarIcon} alt="Delete" className="delete-icon" />
                  
                  <DatePicker
                     selected={endDate}
                     onChange={(date) => setEndDate(date)}
                     className="recycle-date-input"
                     onClick={handleInputClick}
                     dateFormat="dd/MM/yyyy"
                    />
            
                 
                  
                  </div>
                 

                
                </div>
              </div>

              <div className="recycle-btn">
                <button className="recycle-delete recycle-fonts">Delete</button>
                <button className="recycle-restore recycle-fonts">Restore</button>
              </div>

            </div>

            <div className="recycle-list-table recycle-fonts">
            <table className="recycle-table" id="recycle-border">
                  <thead>
                          <tr>
                                    <th>
                                      <label className="custom-checkbox">
                                        <input type="checkbox" className="cb1" />
                                        <span className="checkmark"></span>
                                      </label>
                                    </th>
                                    <th>Subject</th>
                                    <th>Created By</th>
                                    <th>Deleted By</th>
                                    <th>Date Deleted</th>
                                  </tr>

                  </thead>
                  <tbody>
                  
                      <tr>
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" className="cb1" />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td>
                        Lorem ipsum dolor sit amet consectetur. Porttitor.....
                          <p></p>
                        </td>

                        <td>
                          vaneet gupta
                        </td>

                        <td>
                          anant singh
                        </td>

                        <td>
                          08 august 2023
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" className="cb1" />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td>
                        Lorem ipsum dolor sit amet consectetur. Porttitor.....
                          <p></p>
                        </td>

                        <td>
                          vaneet gupta
                        </td>

                        <td>
                          anant singh
                        </td>

                        <td>
                          08 august 2023
                        </td>
                      </tr>
                  </tbody>
                </table>
                </div>
          </section>






        </div>
      </div>
    </div>
  );
};

export default RecycleBin;
