import React, { useState, useEffect } from "react";
import "../styles/RecycleBin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar.svg";
import axios from "axios";
import {
  GET_ALL_LEAD_TRASH,
  RESTORE_LEAD_TRASH,
  DELETE_LEAD_TRASH,
  getDecryptedToken,
  handleLogout,
} from "../utils/Constants";
import { format } from "date-fns";
import RecycleDeletePopUp from "./RecycleDeletePopUp";
import RecycleRestorePopUp from "./RecycleRestorePopUp";
import SearchIcon from '../../assets/image/search.svg';

const DeleteLeads = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("Notes");
  const [recycleData, setRecycleData] = useState([]);
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const leadDeletePopUp = () => {
    setIsDeleteModalOpen(true);
  }

  const closeLeadDeletePopUp = () => {
   setIsDeleteModalOpen(false)
  }
  const leadRestorePopUp = () => {
    setIsRestoreModalOpen(true);
  }

  const closeLeadRestorePopUp = () => {
    setIsRestoreModalOpen(false)
  }
  

  useEffect(() => {
    fetchData();
  }, [decryptedToken]);

  const fetchData = async () => {
    try {
      const response = await axios.get(GET_ALL_LEAD_TRASH, {
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
  const handleRestoreLead = () => {
    const updatedFormData = {
      leadIds: selectedRows,
    };
    axios
      .post(RESTORE_LEAD_TRASH, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        closeLeadRestorePopUp();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteLead = () => {
    const body = {
      leadIds: selectedRows,
    };
    axios
      .delete(DELETE_LEAD_TRASH, {
        data: body,
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        closeLeadDeletePopUp();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isTableHeaderCheckboxChecked =
    recycleData.length > 0 && selectedRows.length === recycleData.length;
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
            <img src={SearchIcon} alt="" />
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
            className={recycleData.length > 0 ? 'recycle-delete recycle-fonts' : 'common-inactive-button inactive-delete  recycle-fonts '}
            // onClick={handleDeleteLead}
            disabled={recycleData.length > 0  ? false : true}
            onClick={leadDeletePopUp}
          >
            Delete
          </button>
          <button
            className={recycleData.length > 0 ? 'recycle-restore recycle-fonts' : 'common-inactive-button recycle-fonts '}
            // onClick={handleRestoreLead}
            disabled={recycleData.length > 0  ? false : true}

            onClick={leadRestorePopUp}
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
              <th>Lead Name</th>
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
                    {item.lead_name}
                    <p></p>
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

        {
          isDeleteModalOpen && (
            <RecycleDeletePopUp onClose={closeLeadDeletePopUp} onDeleteConfirmed={handleDeleteLead} />
          )
        }

        {
          isRestoreModalOpen && (
            <RecycleRestorePopUp onClose={closeLeadRestorePopUp} onRestoreConfirmed={handleRestoreLead} />
          )
        }
      </div>
    </>
  );
};

export default DeleteLeads;
