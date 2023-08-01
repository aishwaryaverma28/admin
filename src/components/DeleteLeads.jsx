import React, { useState, useEffect } from 'react';
import "./styles/RecycleBin.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../assets/image/calendar.svg';
import axios from "axios";
import { getDecryptedToken, handleLogout } from "./utils/Constants";
import { format } from 'date-fns';




const DeleteLeads = () => {

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
    
  return (

    <>
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

<div className="recycle-list-table recycle-fonts">

  <table className="recycle-table" id="recycle-border" >
    <thead>
      <tr className='table-text'>
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


</>
   
  )
}

export default DeleteLeads



