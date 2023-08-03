import React, { useState, useEffect } from "react";
import "../styles/RecycleBin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar.svg";
import axios from "axios";
import {
  GETNOTE_FROM_TRASH,
  RESTORE_NOTE_TRASH,
  DELETE_NOTE_TRASH,
  getDecryptedToken,
  handleLogout,
} from "../utils/Constants";
import { format } from "date-fns";

const DeleteNotes = ({ onDataLengthChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("Notes");
  const [recycleData, setRecycleData] = useState([]);
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, [decryptedToken]);

  const fetchData = async () => {
    try {
      const response = await axios.get(GETNOTE_FROM_TRASH, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.data.status === 1) {
        setRecycleData(
          response.data.data.map((item) => ({ ...item, isChecked: false }))
        );
      } else {
        if (response.data.message === "Token has expired") {
          alert(response.data.message);
          handleLogout();
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy"); // Change the format as per your requirement
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredRecycleData = recycleData.filter((recycleItem) => {
    const fullName =
      `${recycleItem.first_name} ${recycleItem.last_name}`.toLowerCase();
    const leadName = recycleItem.lead_name?.toLowerCase() || "";
    const updateDate = formatDate(recycleItem?.update_date) || "";
    const searchRecycle = searchQuery.toLowerCase();

    const itemDate = new Date(recycleItem.update_date);
    itemDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    // Check if the search query matches any of the fields
    const matchesSearchQuery =
      fullName.includes(searchRecycle) ||
      leadName.includes(searchRecycle) ||
      updateDate.includes(searchRecycle);

    // Check if the item date falls within the specified date range
    const withinDateRange =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);
    // Show all data when both start and end dates are null, and search box is empty
    if (!startDate && !endDate && !searchQuery) {
      return true;
    }

    // Show all data when start date and end date are null, and search query matches any field
    if (!startDate && !endDate && matchesSearchQuery) {
      return true;
    }
    // Filter based on regular conditions (search query and date range)
    return matchesSearchQuery && withinDateRange;
  });

  const handleTableHeaderCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      // If the header checkbox is checked, select all rows
      const allRowIds = recycleData.map((item) => item.id);
      setSelectedRows(allRowIds);
    } else {
      // If the header checkbox is unchecked, deselect all rows
      setSelectedRows([]);
    }
    setRecycleData((prevState) =>
      prevState.map((item) => ({ ...item, isChecked: checked }))
    );
  };
  const handleTableRowCheckboxChange = (event, itemId) => {
    const { checked } = event.target;
    setRecycleData((prevState) =>
      prevState.map((item) =>
        item.id === itemId ? { ...item, isChecked: checked } : item
      )
    );

    setSelectedRows((prevSelectedRows) =>
      checked
        ? [...prevSelectedRows, itemId]
        : prevSelectedRows.filter((id) => id !== itemId)
    );
  };
  const handleRestoreNote = () => {
    const updatedFormData = {
      noteIds: selectedRows,
    };
    axios
      .post(RESTORE_NOTE_TRASH, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteNote = () => {
    const updatedFormData = {
      noteIds: selectedRows,
    };
    axios
      .post(DELETE_NOTE_TRASH, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isTableHeaderCheckboxChecked =
    recycleData.length > 0 && selectedRows.length === recycleData.length;
    
    useEffect(() => {
      onDataLengthChange(filteredRecycleData.length);
    }, [filteredRecycleData]);
  return (
    <>
      <div className="recycle-search-user-section">
        <div className="recycle-search-box">
          <input
            type="text"
            className="recycle-search-input recycle-fonts"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="recycle-search-icon">
            <img src="../assets/image/search.svg" alt="" />
          </span>
        </div>

        <div className="recycle-date">
          <div className="custom-date-input">
            <div className="date-input-wrapper">
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
            <div className="date-input-wrapper">
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
          <button
            className="recycle-delete recycle-fonts"
            onClick={handleDeleteNote}
          >
            Delete
          </button>
          <button
            className="recycle-restore recycle-fonts"
            onClick={handleRestoreNote}
          >
            Restore
          </button>
        </div>
      </div>
      <div className="recycle-list-table recycle-fonts">
        <table className="recycle-table" id="recycle-border">
          <thead>
            <tr className="table-text">
              <th>
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    className="cb1"
                    name="allSelect"
                    checked={isTableHeaderCheckboxChecked}
                    onChange={handleTableHeaderCheckboxChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th>Note</th>
              <th>Created By</th>
              <th>Deleted By</th>
              <th>Date Deleted</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ padding: "1.5rem", textAlign: "center" }}
                >
                  Loading...
                </td>
              </tr>
            ) : filteredRecycleData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            ) : (
              filteredRecycleData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="cb1"
                        name={item.id}
                        checked={item.isChecked}
                        onChange={(e) =>
                          handleTableRowCheckboxChange(e, item.id)
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    {item.description.length > 15 ? (
                      <>{item.description.slice(3, 15)}...</>
                    ) : (
                      <>{item.description.slice(3, item.description.length)}</>
                    )}
                  </td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{formatDate(item.update_date.slice(0, 10))}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeleteNotes;
