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

  const [activeTab, setActiveTab] = useState('Notes'); 

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  
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
            <button
          className={`recycle-btn recycle-fonts ${activeTab === 'Notes' ? 'recycle-active' : ''}`}
          onClick={() => handleTabClick('Notes')}
        >Notes (2)</button> 
            <button
          className={`recycle-btn recycle-fonts ${activeTab === 'Deals' ? 'recycle-active' : ''}`}
          onClick={() => handleTabClick('Deals')}
        >Deals (3)</button>
            <button
          className={`recycle-btn recycle-fonts ${activeTab === 'Leads' ? 'recycle-active' : ''}`}
          onClick={() => handleTabClick('Leads')}
        >Leads (4)</button>
            <button
          className={`recycle-btn recycle-fonts ${activeTab === 'Company' ? 'recycle-active' : ''}`}
          onClick={() => handleTabClick('Company')}
        >Company (5)</button>
            <button
          className={`recycle-btn recycle-fonts ${activeTab === 'Contacts' ? 'recycle-active' : ''}`}
          onClick={() => handleTabClick('Contacts')}
        >Contacts (6)</button>
            

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

            {activeTab === 'Notes' && 
             
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
            
            
            }
      {activeTab === 'Deals' && 
      
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
      
      
      }
      {activeTab === 'Leads' && 
      
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

      }
      {activeTab === 'Company' && 
      
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
      
      }
      {activeTab === 'Contacts' && 
      
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
      
      
      }

            
          </section>






        </div>
      </div>
    </div>
  );
};

export default RecycleBin;
