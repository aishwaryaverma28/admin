import React, { useState, useEffect } from "react";
import "../styles/RecycleBin.css";
import axios from "axios";
import {
  GETNOTE_FROM_TRASH,
  getDecryptedToken,
  handleLogout,
} from "../utils/Constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar.svg";
import { format } from "date-fns";
import DeleteLeads from "./DeleteLeads";
import DeleteNotes from "./DeleteNotes";
import RecycleDeletePopUp from "./RecycleDeletePopUp";
import RecycleRestorePopUp from "./RecycleRestorePopUp";
import SearchIcon from "../../assets/image/search.svg";

const RecycleBin = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leadlen, setLeadlen] = useState(0);
  const [noteslen, setNoteslen] = useState(0);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Leads"
  );
  // const [notesDataLength, setNotesDataLength] = useState(0);
  const decryptedToken = getDecryptedToken();
  const [isDeleteDealModalOpen, setIsDeleteDealModalOpen] = useState(false);
  const [isRestoreDealModalOpen, setIsRestoreDealModalOpen] = useState(false);
  const [isDeleteCompanyModalOpen, setIsDeleteCompanyModalOpen] =
    useState(false);
  const [isRestoreCompanyModalOpen, setIsRestoreCompanyModalOpen] =
    useState(false);
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] =
    useState(false);
  const [isRestoreContactModalOpen, setIsRestoreContactModalOpen] =
    useState(false);

  // function to open delete popup and close delete pop up for deal tab

  const dealsDeletePopUp = () => {
    setIsDeleteDealModalOpen(true);
  };

  const closeDealDeletePopUp = () => {
    setIsDeleteDealModalOpen(false);
  };

  // function to open restore popup and close restore pop up for deal tab
  const dealsRestorePopUp = () => {
    setIsRestoreDealModalOpen(true);
  };

  const closeDealRestorePopUp = () => {
    setIsRestoreDealModalOpen(false);
  };

  // function to open delete popup and close delete pop up for company tab

  const companyDeletePopUp = () => {
    setIsDeleteCompanyModalOpen(true);
  };

  const closeCompanyDeletePopUp = () => {
    setIsDeleteCompanyModalOpen(false);
  };

  // function to open restore popup and close restore pop up for company tab

  const companyRestorePopUp = () => {
    setIsRestoreCompanyModalOpen(true);
  };

  const closeCompanyRestorePopUp = () => {
    setIsRestoreCompanyModalOpen(false);
  };

  // function to open delete popup and close delete pop up for contact tab

  const contactDeletePopUp = () => {
    setIsDeleteContactModalOpen(true);
  };

  const closeContactDeletePopUp = () => {
    setIsDeleteContactModalOpen(false);
  };

  // function to open restore popup and close restore pop up for contact tab

  const contactRestorePopUp = () => {
    setIsRestoreContactModalOpen(true);
  };

  const closeContactRestorePopUp = () => {
    setIsRestoreContactModalOpen(false);
  };

  useEffect(() => {
    fetchData();
    fetchNotesData();
    const validTabs = ["Notes", "Deals", "Leads", "Company", "Contacts"];
    if (!validTabs.includes(localStorage.getItem("activeTab"))) {
      setActiveTab("Leads");
      localStorage.setItem("activeTab", "Leads");
    }
  }, []);
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
  const fetchNotesData = async () => {
    try {
      const response = await axios.get(GETNOTE_FROM_TRASH, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.data.status === 1) {
        setNoteslen(response.data.data.length);
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName); // Store the active tab in localStorage
  };

  return (
    <>
      <section className="recycle-container">
        <div className="recycle-top">
          <div>
            <p className="recycle-heading recycle-fonts">Recycle Bin</p>
            <p className="recycle-note recycle-fonts">
              Restore Deals deleted in the last 90 days
            </p>
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
            className={`recycle-btn recycle-fonts ${
              activeTab === "Notes" ? "recycle-active" : ""
            }`}
            onClick={() => handleTabClick("Notes")}
          >
            Notes ({noteslen})
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
        {activeTab === "Notes" && <DeleteNotes deleteCount={fetchNotesData} />}
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
                  <img src={SearchIcon} alt="" />
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
                <button
                  className="recycle-delete recycle-fonts"
                  onClick={dealsDeletePopUp}
                >
                  Delete
                </button>
                <button
                  className="recycle-restore recycle-fonts"
                  onClick={dealsRestorePopUp}
                >
                  Restore
                </button>
                <button type="button" className="helpBtn recycle-refresh-icon" title="Refresh">
              <i class="fa-sharp fa-solid fa-rotate "></i>
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
              {isDeleteDealModalOpen && (
                <RecycleDeletePopUp onClose={closeDealDeletePopUp} />
              )}

              {isRestoreDealModalOpen && (
                <RecycleRestorePopUp onClose={closeDealRestorePopUp} />
              )}
            </div>
          </>
        )}
        {activeTab === "Leads" && <DeleteLeads deleteCount={fetchData} />}
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
                  <img src={SearchIcon} alt="" />
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
                <button
                  className="recycle-delete recycle-fonts"
                  onClick={companyDeletePopUp}
                >
                  Delete
                </button>
                <button
                  className="recycle-restore recycle-fonts"
                  onClick={companyRestorePopUp}
                >
                  Restore
                </button>
                <button type="button" className="helpBtn recycle-refresh-icon" title="Refresh">
              <i class="fa-sharp fa-solid fa-rotate "></i>
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

              {isDeleteCompanyModalOpen && (
                <RecycleDeletePopUp onClose={closeCompanyDeletePopUp} />
              )}

              {isRestoreCompanyModalOpen && (
                <RecycleRestorePopUp onClose={closeCompanyRestorePopUp} />
              )}
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
                  <img src={SearchIcon} alt="" />
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
                <button
                  className="recycle-delete recycle-fonts"
                  onClick={contactDeletePopUp}
                >
                  Delete
                </button>
                <button
                  className="recycle-restore recycle-fonts"
                  onClick={contactRestorePopUp}
                >
                  Restore
                </button>
                <button type="button" className="helpBtn recycle-refresh-icon" title="Refresh">
              <i class="fa-sharp fa-solid fa-rotate "></i>
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

              {isDeleteContactModalOpen && (
                <RecycleDeletePopUp onClose={closeContactDeletePopUp} />
              )}

              {isRestoreContactModalOpen && (
                <RecycleRestorePopUp onClose={closeContactRestorePopUp} />
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default RecycleBin;
