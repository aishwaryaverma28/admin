import React, { useEffect, useState, useRef } from "react";
import "../styles/Contacts.css";
import CompanyModal from "./CompanyModal.jsx";
import PeopleModal from "./PeopleModal.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";
import axios from "axios";
import {
  IMPORT_PEOPLE,
  IMPORT_COMPANY,
  handleLogout,
  getDecryptedToken,
  ALL_COMPANY,
  ALL_PEOPLE
} from "../utils/Constants";
import CompanyTable from "./CompanyTable.jsx";
import PeopleTable from "./PeopleTable.jsx";
import More from '../../assets/image/more.svg';

const Contacts = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [number, setNumber] = useState(0);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  console.log(decryptedToken);
  const fileInputRef = useRef(null);
  const [csvData, setCsvData] = useState([]);
  const fileInputRef2 = useRef(null);
  const [csvData2, setCsvData2] = useState([]);
  const [companyData, setCompanyData] = useState([])
  const [personData, setPersonData] = useState([])
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        actionDropDownRef.current &&
        !actionDropDownRef.current.contains(event.target)
      ) {
        setActionOpen(false);
      }
    };



    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setActionOpen(!actionopen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNumber(number === 0 ? 1 : 0);
  };

  const handleCompanyModal = () => {
    setCompanyModalOpen(true);
  };
  const handleCompanyModalClose = () => {
    setCompanyModalOpen(false);
  };
  const handlePersonModal = () => {
    setPersonModalOpen(true);
  };
  const handlePersonModalClose = () => {
    setPersonModalOpen(false);
  };

  const fetchCompany = (e) => {
    
    axios
      .get(ALL_COMPANY, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
          setCompanyData(response?.data?.data);
          setLoading(false)
         })
      .catch((error) => {
        console.log(error);
        toast.error("some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };
  const fetchPeople = (e) => {
    
    axios
      .get(ALL_PEOPLE, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setPersonData(response?.data?.data);
        setLoadingPeople(false);
         })
      .catch((error) => {
        console.log(error);
        toast.error("some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  useEffect(()=>{
    fetchCompany();
    fetchPeople();
  },[])

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
      <div className="contacts-top-flex ">
        <div className="genral-setting-btn genral-setting-fonts aaa">
          <button
            className={`genral-btn  ${
              activeTab === "people" ? "genral-active" : ""
            }`}
            onClick={() => handleTabClick("people")}
          >
            People
          </button>
          <button
            className={`genral-btn contact-genral-btn ${
              activeTab === "company" ? "genral-active" : ""
            }`}
            onClick={() => handleTabClick("company")}
          >
            Company
          </button>
        </div>

        <div className="contact-top-right">
          <p className="common-fonts contact-records">
            {number === 0 ? personData.length : companyData.length} Records
          </p>

          {number === 0 ? (
            <button
              className="common-fonts common-save-button contact-dots contact-btn-top"
              onClick={handlePersonModal}
            >
              Add People
            </button>
          ) : (
            <button
              className="common-fonts common-save-button contact-dots contact-btn-top"
              onClick={handleCompanyModal}
            >
              Add Company
            </button>
          )}
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
          {number === 0 ? (
            <button
              className="common=save-button common-white-green-button contact-dots contact-btn-top"
              onClick={handleImportClick2}
            >
              Import People
            </button>
          ) : (
            <button
              className="common=save-button common-white-green-button contact-dots contact-btn-top"
              onClick={handleImportClick}
            >
              Import Compnay
            </button>
          )}

          {
            number===0 ? (

              //for people delete

              <div className="select action-select">
              <div className="dropdown-container" ref={actionDropDownRef}>
                <div
                  className="contact-three-dots"
                  onClick={toggleDropdown}
                >
                  <img src={More} alt="" />
                </div>
                {actionopen && (
                  <ul className="dropdown-menu contact-delete-menu">
                    <li>Delete People</li>
                  </ul>
                )}
              </div>
            </div>

            ) : (

              //for company delete
              <div className="select action-select">
              <div className="dropdown-container" ref={actionDropDownRef}>
                <div
                  className="contact-three-dots"
                  onClick={toggleDropdown}
                >
                  <img src={More} alt="" />
                </div>
                {actionopen && (
                  <ul className="dropdown-menu contact-delete-menu">
                    <li>Delete Company</li>
                  </ul>
                )}
              </div>
            </div>
            )
          }

        </div>
      </div>

      {activeTab === "people" && (
        <PeopleTable personData={personData} loading={loadingPeople}/>
      )}
      {activeTab === "company" && (
        <CompanyTable companyData={companyData} loading={loading} />
      )}

      {companyModalOpen && <CompanyModal onClose={handleCompanyModalClose} fetchCompany={fetchCompany} />}
      {personModalOpen && <PeopleModal onClose={handlePersonModalClose} fetchPeople={fetchPeople} />}
      <ToastContainer />
    </>
  );
};

export default Contacts;
