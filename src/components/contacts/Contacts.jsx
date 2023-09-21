import React, { useEffect, useState, useRef } from "react";
import '../styles/Contacts.css';
import CompanyModal from './CompanyModal.jsx';
import PeopleModal from './PeopleModal.jsx';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";
import axios from "axios";
import {
  IMPORT_PEOPLE,
  IMPORT_COMPANY,
  handleLogout,
  getDecryptedToken,
} from "../utils/Constants";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [number,setNumber] = useState(0);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const fileInputRef = useRef(null);
  const [csvData, setCsvData] = useState([]);
  const fileInputRef2 = useRef(null);
  const [csvData2, setCsvData2] = useState([]);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNumber(number===0 ? 1 : 0)
  };

  const handleCompanyModal = () => {
    setCompanyModalOpen(true)
  }
  const handleCompanyModalClose = () => {
    setCompanyModalOpen(false)
  }
  const handlePersonModal = () => {
    setPersonModalOpen(true)
  }
  const handlePersonModalClose = () => {
    setPersonModalOpen(false)
  }

  const handleCsvFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assume the first row contains headers
        complete: (result) => {
          const dataWithIntValues = result?.data.map((row) => ({
            ...row,
            valuation: parseInt(row?.valuation),
          }));
          // Store CSV data in state
          const dataWithoutLastValue = dataWithIntValues.slice(0, -1);
          setCsvData(dataWithoutLastValue);
          postCsvDataToAPI(dataWithoutLastValue);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    }
  };
  // Function to handle "Import" menu item click
  const handleImportClick = () => {
    // Trigger a click event on the hidden file input element
    fileInputRef.current.click();
  };
  const postCsvDataToAPI = async (csvData) => {
     try {
      const response = await axios.post(
        IMPORT_COMPANY,
        {
          data: csvData,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      if (response.data.status === 1) {
        toast.success("Import successfull", {
          position: "top-center",
          autoClose: 2000,
        });
        // You can add further logic here if needed
      } else {
        toast.error("Some Error Occured", {
          position: "top-center",
          autoClose: 2000,
        });
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error posting CSV data:", error);
      // Handle the error as needed
    }
  };

  const handleCsvFileImport2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assume the first row contains headers
        complete: (result) => {
          // Store CSV data in state
          const dataWithoutLastValue = result?.data?.slice(0, -1);
          setCsvData2(dataWithoutLastValue);
          postCsvDataToAPI2(dataWithoutLastValue);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    }
  };
  // Function to handle "Import" menu item click
  const handleImportClick2 = () => {
    // Trigger a click event on the hidden file input element
    fileInputRef2.current.click();
  };
  const postCsvDataToAPI2 = async (csvData) => {
    try {
      const response = await axios.post(
        IMPORT_PEOPLE,
        {
          data: csvData,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      if (response.data.status === 1) {
        toast.success("Import successfull", {
          position: "top-center",
          autoClose: 2000,
        });
        // You can add further logic here if needed
      } else {
        toast.error("Some Error Occured", {
          position: "top-center",
          autoClose: 2000,
        });
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error posting CSV data:", error);
      // Handle the error as needed
    }
  };


  return (
    <>

    <div className='contacts-top-flex '>

    <div className="genral-setting-btn genral-setting-fonts aaa">
    <button
              className={`genral-btn  ${activeTab === "people" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("people")}
            >
              People
            </button>
            <button
              className={`genral-btn contact-genral-btn ${activeTab === "company" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("company")}
            >
              Company
            </button>
          </div>


          <div className='contact-top-right'>
          
              <p className='common-fonts contact-records'>{number===0 ? 6 : 10} Records</p>
   
            
            {
              number===0 ? (
                <button className='common-fonts common-save-button contact-dots contact-btn-top' onClick={handlePersonModal}>Add People</button>
              ):
              (
                <button className='common-fonts common-save-button contact-dots contact-btn-top' onClick={handleCompanyModal}>Add Company</button>
              )
            }
<input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleCsvFileImport}
            />

<input
              type="file"
              accept=".csv"
              ref={fileInputRef2}
              style={{ display: "none" }}
              onChange={handleCsvFileImport2}
            />
            {
              number===0 ? (
                <button className='common=save-button common-white-green-button contact-dots' onClick={handleImportClick2}>Import People</button>
                ):
              (
            <button className='common=save-button common-white-green-button contact-dots' onClick={handleImportClick}>Import Compnay</button>
              )}
            <button className='common-white-green-button contact-dots'>...</button>
          </div>


    </div>



          {
            activeTab==="people" && (
              <div>People</div>
            )
          }
          {
            activeTab==="company" && (
              <div>Company</div>
            )
          }

          {
            companyModalOpen && (
              <CompanyModal onClose={handleCompanyModalClose} />
            )
          }
          {
            personModalOpen&& (
              <PeopleModal onClose={handlePersonModalClose} />
            )
          }
           <ToastContainer />
    </>
  )
}

export default Contacts