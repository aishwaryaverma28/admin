import React, {useEffect, useState, useRef} from "react";
import "./styles/LPleads.css";
import chart from "../assets/image/chart.svg"
import axios from 'axios';
import LeadsColn from "./LeadsColn";
import CreateLead from "./CreateLead";
import {GET_LEAD,IMPORT_CSV,handleApiError,getDecryptedToken} from "./utils/Constants"
import { useNavigate } from "react-router-dom";

const useDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    setIsOpen(false);
  };

  return { isOpen, toggleDropdown, handleOptionClick, dropdownRef };
};

const LPleads = () => {
  const { isOpen: isOpenLeads, toggleDropdown: toggleLeads, handleOptionClick: handleOptionClickLeads, dropdownRef: dropdownRefLeads } = useDropdown();
  const { isOpen: isOpenActions, toggleDropdown: toggleActions, handleOptionClick: handleOptionClickActions, dropdownRef: dropdownRefActions } = useDropdown();
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const fileInputRef = useRef(null);
  const [totalValue,setTotalValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility
  const navigate = useNavigate();
  const decryptedToken = getDecryptedToken();
  const fetchLeadsData = () => {
    axios
      .get(GET_LEAD, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        }
      })
      .then((response) => {
        const dataArray = Object.entries(response.data.data);
        setData(dataArray.map(([key, value]) => value));
        setKeys(dataArray.map(([key, value]) => key));
      })
      .catch((error) => {
        handleApiError(error,navigate);
      });
  };
  
  useEffect(() => {
    fetchLeadsData();
  }, []);
  
  useEffect(() => {
    // Calculate total value whenever data changes
    const calculateTotalValue = () => {
      let sum = 0;
      data.forEach((lead) => {
        lead.forEach((obj) => {
          const value = Number(obj.value); // Parse value as a number
          if (!isNaN(value)) {
            sum += value;
          }
        });
      });
      return sum;
    };

    setTotalValue(calculateTotalValue());
  }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = async () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", "125"); // Replace "yourUserId" with the actual user ID
  
      try {
        await axios.post(IMPORT_CSV, formData, {
          headers: {
            Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
          }
        });
        alert("File uploaded successfully");
        // Handle the success case as needed
      } catch (error) {
        alert("File upload failed", error);
        // Handle the error case as needed
      }
    }
    fetchLeadsData();
  };
  

  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={dropdownRefLeads}>
              <div className="dropdown-header" onClick={toggleLeads}>
                all Leads <i class="fa-sharp fa-solid fa-angle-down"></i>
              </div>
              {isOpenLeads && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleOptionClickLeads("Option 1")}>Leads 1</li>
                  <li onClick={() => handleOptionClickLeads("Option 2")}>Leads 2</li>
                  <li onClick={() => handleOptionClickLeads("Option 3")}>Leads 3</li>
                </ul>
              )}
            </div>
            <div className="view">
              <a href="#" className="grid-view--btn active-btn">
                <img src={chart} alt="chart"/>
              </a>
              <a href="#" className="list-view--btn">
                <i className="fas fa-list-ul"></i>
              </a>
            </div>
          </div>
          <div className="right-side--btns">
            <p>sub total: ${totalValue.toLocaleString("en-IN")}</p>
            <button
              type="button"
              className="secondary-btn"
              onClick={openModal}
            >
              Create Lead
            </button>
            <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
            <button type="button" className="simple-btn" onClick={handleButtonClick}>
              import
            </button>
             <div className="select action-select">
              <div className="dropdown-container" ref={dropdownRefActions}>
                <div className="dropdown-header2" onClick={toggleActions}>
                  Actions <i class="fa-sharp fa-solid fa-angle-down"></i>
                </div>
                {isOpenActions && (
                  <ul className="dropdown-menu">
                    <li onClick={() => handleOptionClickActions("Option 1")}>
                      Action 1
                    </li>
                    <li onClick={() => handleOptionClickActions("Option 2")}>
                      Action 2
                    </li>
                    <li onClick={() => handleOptionClickActions("Option 3")}>
                      Action 3
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cards-body">
        {data.map((leadArray, index) => (
          <div key={keys[index]}>
            <LeadsColn key={keys[index]} leadArray={leadArray} leadKey={keys[index]} />
          </div>
        ))}
      </section>
      <CreateLead isOpen={isModalOpen} onClose={closeModal} onLeadAdded={fetchLeadsData} />

    </div>
  );
};

export default LPleads;
