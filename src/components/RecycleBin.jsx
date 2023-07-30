import React, { useState, useEffect } from 'react';
import "./styles/RecycleBin.css";
import LPSettingSidebar from "./LPSettingSidebar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../assets/image/calendar.svg';
import axios from "axios";
import { getDecryptedToken, handleLogout } from "./utils/Constants";
import { format } from 'date-fns';




const RecycleBin = () => {

  const defaultDate = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState('Notes');
  const [recycleData, setRecycleData] = useState([]);
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://core.leadplaner.com:3001/api/lead/getallfromtrash', {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
        });

        if (response.data.status === 1) {
          // console.log(response.data.data);
          setRecycleData(response.data.data);
        } else {
          if (response.data.message === "Token has expired") {
            alert(response.data.message);
            handleLogout();
          }
        }
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy'); // Change the format as per your requirement
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };






  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredRecycleData = recycleData.filter((recycleItem) => {
    const fullName = `${recycleItem.first_name} ${recycleItem.last_name}`.toLowerCase();
    const leadName = recycleItem.lead_name?.toLowerCase() || "";
    const updateDate = formatDate(recycleItem?.update_date) || "";
    const searchRecycle = searchQuery.toLowerCase();
    const itemDate = new Date(recycleItem.update_date);

    const formattedItemDate = formatDate(itemDate);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Check if the search query matches any of the fields
    const matchesSearchQuery =
      fullName.includes(searchRecycle) ||
      leadName.includes(searchRecycle) ||
      updateDate.includes(searchRecycle);

    // Check if the item date falls within the specified date range
    const withinDateRange =
      (!formattedStartDate || formattedItemDate >= formattedStartDate) &&
      (!formattedEndDate || formattedItemDate <= formattedEndDate);

    // If the end date is today, include it in the filtered results
    const isToday = endDate && endDate.toDateString() === new Date().toDateString();

    // Show all data when both start and end dates are null, and search box is empty
    if (!startDate && !endDate && !searchQuery) {
      return true;
    }

    // Show all data when start date and end date are null, and search query matches any field
    if (!startDate && !endDate && matchesSearchQuery) {
      return true;
    }

    // Show all data when start date is null, end date is today, and search query matches any field
    if (!startDate && isToday && matchesSearchQuery) {
      return true;
    }

    // Filter based on regular conditions (search query and date range)
    return matchesSearchQuery && (withinDateRange || isToday);
  });


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
              >Leads ({recycleData.length})</button>
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
                <input type="text" className="recycle-search-input recycle-fonts" placeholder="Search..." value={searchQuery}
                  onChange={handleSearchChange} />
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
                      dateFormat="dd/MM/yyyy"
                      value={startDate}
                      placeholderText="dd/mm/yyyy"


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
                      dateFormat="dd/MM/yyyy"
                      value={endDate}
                      placeholderText="dd/mm/yyyy"

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
                      <th>Lead Name</th>
                      <th>Created By</th>
                      <th>Deleted By</th>
                      <th>Date Deleted</th>
                    </tr>

                  </thead>
                  {isLoading ? (
                    <p style={{ padding: "1.5rem" }}>Loading...</p>
                  ) :
                    filteredRecycleData.length === 0 ? (
                      <>
                      <td></td>
                      <p className="no-data-found">No data found</p>
                      </>
                    ) :

                      filteredRecycleData.map((item) => (
                        <tbody>

                          <tr>
                            <td>
                              <label className="custom-checkbox">
                                <input type="checkbox" className="cb1" />
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            <td>
                              {item.lead_name}
                              <p></p>
                            </td>

                            <td>
                              {item.first_name} {item.last_name}
                            </td>

                            <td>
                              {item.first_name} {item.last_name}
                            </td>

                            <td>
                              {formatDate(item.update_date.slice(0, 10))}
                            </td>
                          </tr>

                        </tbody>
                      ))}
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
