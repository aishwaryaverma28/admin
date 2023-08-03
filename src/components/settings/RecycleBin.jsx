import React, { useState, useEffect } from "react";
import "../styles/RecycleBin.css";
import axios from "axios";
import LPSettingSidebar from "./LPSettingSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar.svg";
import { format } from "date-fns";
import { getDecryptedToken, handleLogout } from "../utils/Constants";
import DeleteLeads from "./DeleteLeads";
import DeleteNotes from "./DeleteNotes";

const RecycleBin = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leadlen, setLeadlen] = useState(0);
  const [activeTab, setActiveTab] = useState("Leads");
  const [notesDataLength, setNotesDataLength] = useState(0); 
  const decryptedToken = getDecryptedToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://core.leadplaner.com:3001/api/lead/getallfromtrash",
          {
            headers: {
              Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
            },
          }
        );

        if (response.data.status === 1) {
          // console.log(response.data.data);
          setLeadlen(response.data.data.length);
        } else {
          if (response.data.message === "Token has expired") {
            alert(response.data.message);
            handleLogout();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleNotesDataLengthChange = (length) => {
    setNotesDataLength(length);
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
                <p className="recycle-note recycle-fonts">
                  Restore Deals deleted in the last 90 days
                </p>
              </div>
              <div className="recycle-top-right">
                <p className="default-days recycle-fonts">
                  Default delete Days
                </p>
                <select
                  name=""
                  id=""
                  className="recycle-fonts default-days-select"
                >
                  <option value="">30days</option>
                  <option value="">45days</option>
                  <option value="">60days</option>
                  <option value="">90days</option>
                </select>
              </div>
            </div>
            <div className="recycle-setting-btn ">
              <button
                className={`recycle-btn recycle-fonts ${
                  activeTab === "Notes" ? "recycle-active" : ""
                }`}
                onClick={() => handleTabClick("Notes")}
              >
                Notes ({notesDataLength})
              </button>
              <button
                className={`recycle-btn recycle-fonts ${
                  activeTab === "Deals" ? "recycle-active" : ""
                }`}
                onClick={() => handleTabClick("Deals")}
              >
                Deals (3)
              </button>
              <button
                className={`recycle-btn recycle-fonts ${
                  activeTab === "Leads" ? "recycle-active" : ""
                }`}
                onClick={() => handleTabClick("Leads")}
              >
                Leads ({leadlen})
              </button>
              <button
                className={`recycle-btn recycle-fonts ${
                  activeTab === "Company" ? "recycle-active" : ""
                }`}
                onClick={() => handleTabClick("Company")}
              >
                Company (5)
              </button>
              <button
                className={`recycle-btn recycle-fonts ${
                  activeTab === "Contacts" ? "recycle-active" : ""
                }`}
                onClick={() => handleTabClick("Contacts")}
              >
                Contacts (6)
              </button>
            </div>
            {activeTab === "Notes" && <DeleteNotes onDataLengthChange={handleNotesDataLengthChange} />}
            {activeTab === "Deals" && (
              <>
                <div className="recycle-search-user-section">
                  <div className="recycle-search-box">
                    <input
                      type="text"
                      className="recycle-search-input recycle-fonts"
                      placeholder="Search..."
                    />
                    <span className="recycle-search-icon">
                      <img src="../assets/image/search.svg" alt="" />
                    </span>
                  </div>
                  <div className="recycle-date">
                    <div className="custom-date-input">
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                    <button className="recycle-delete recycle-fonts">
                      Delete
                    </button>
                    <button className="recycle-restore recycle-fonts">
                      Restore
                    </button>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {activeTab === "Leads" && <DeleteLeads />}
            {activeTab === "Company" && (
              <>
                <div className="recycle-search-user-section">
                  <div className="recycle-search-box">
                    <input
                      type="text"
                      className="recycle-search-input recycle-fonts"
                      placeholder="Search..."
                    />
                    <span className="recycle-search-icon">
                      <img src="../assets/image/search.svg" alt="" />
                    </span>
                  </div>
                  <div className="recycle-date">
                    <div className="custom-date-input">
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                    <button className="recycle-delete recycle-fonts">
                      Delete
                    </button>
                    <button className="recycle-restore recycle-fonts">
                      Restore
                    </button>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {activeTab === "Contacts" && (
              <>
                <div className="recycle-search-user-section">
                  <div className="recycle-search-box">
                    <input
                      type="text"
                      className="recycle-search-input recycle-fonts"
                      placeholder="Search..."
                    />
                    <span className="recycle-search-icon">
                      <img src="../assets/image/search.svg" alt="" />
                    </span>
                  </div>
                  <div className="recycle-date">
                    <div className="custom-date-input">
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                      <div className="date-input-wrapper">
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="delete-icon"
                        />
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
                    <button className="recycle-delete recycle-fonts">
                      Delete
                    </button>
                    <button className="recycle-restore recycle-fonts">
                      Restore
                    </button>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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

                        <td>vaneet gupta</td>

                        <td>anant singh</td>

                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
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
                        <td>vaneet gupta</td>
                        <td>anant singh</td>
                        <td>08 august 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecycleBin;
