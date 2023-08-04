import React, { useEffect, useState, useRef } from "react";
import "./styles/LPleads.css";
import chart from "../assets/image/chart.svg";
import axios from "axios";
import LeadsColn from "./LeadsColn";
import CreateLead from "./CreateLead";
import {
  GET_LEAD,
  IMPORT_CSV,
  MOVELEAD_TO_TRASH,
  getDecryptedToken,
} from "./utils/Constants";
const LPleads = () => {
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [pipeopen, setPipeOpen] = useState(false);
  const pipeDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const fileInputRef = useRef(null);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  //======================================================================fetch lead data from api
  const fetchLeadsData = () => {
    axios
      .get(GET_LEAD, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const dataArray = Object.entries(response.data.data);
        setData(dataArray.map(([key, value]) => value));
        setKeys(dataArray.map(([key, value]) => key));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);
  // ======================================================================calculate total value of all leads
  useEffect(() => {
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
  //======================================================modal box
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = async () => {
    fileInputRef.current.click();
  };
  //===========================================================for bulk import
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", "125"); // Replace "yourUserId" with the actual user ID

      try {
        await axios.post(IMPORT_CSV, formData, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
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

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const togglePipeDropdown = () => {
    setPipeOpen(!pipeopen);
  };
  const toggleActionDropdown = (option) => {
    if (option === "Delete") {
      setDeleteConfirmationVisible(true);
    }
    setActionOpen(!actionopen);
  };
  // Effect hook to add click event listener when the component mounts
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        leadDropDownRef.current &&
        !leadDropDownRef.current.contains(event.target)
      ) {
        setLeadOpen(false);
      }
    };
    const handleOutsideClick2 = (event) => {
      if (
        pipeDropDownRef.current &&
        !pipeDropDownRef.current.contains(event.target)
      ) {
        setPipeOpen(false);
      }
    };
    const handleOutsideClick3 = (event) => {
      if (
        actionDropDownRef.current &&
        !actionDropDownRef.current.contains(event.target)
      ) {
        setActionOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick2);
    document.addEventListener("click", handleOutsideClick3);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick2);
      document.removeEventListener("click", handleOutsideClick3);
    };
  }, []);

  const handleCardSelection = (cardIdOrIds, isSelected) => {
    if (Array.isArray(cardIdOrIds)) {
      // If an array of card IDs is received, flatten it and remove any repeated IDs
      const uniqueCardIds = Array.from(
        new Set([...selectedCardIds, ...cardIdOrIds])
      );
      setSelectedCardIds(uniqueCardIds);
    } else {
      // If a single card ID is received, update the selectedCardIds accordingly
      if (isSelected) {
        setSelectedCardIds((prevSelectedCardIds) => [
          ...prevSelectedCardIds,
          cardIdOrIds,
        ]);
      } else {
        setSelectedCardIds((prevSelectedCardIds) =>
          prevSelectedCardIds.filter((id) => id !== cardIdOrIds)
        );
      }
    }
  };

  console.log(selectedCardIds);
  const deleteCard = () => {
    const body = {
      leadIds: selectedCardIds,
    };

    axios
      .delete(MOVELEAD_TO_TRASH, {
        data: body,
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setSelectedCardIds([]);
    fetchLeadsData();
    setDeleteConfirmationVisible(false);
  };
  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={leadDropDownRef}>
              <div className="dropdown-header" onClick={toggleDropdown}>
                all Leads{" "}
                <i
                  className={`fa-sharp fa-solid ${
                    leadopen ? "fa-angle-up" : "fa-angle-down"
                  }`}
                ></i>
              </div>
              {leadopen && (
                <ul className="dropdown-menuLead">
                  <li>Leads 1</li>
                  <li>Leads 2</li>
                  <li>Leads 3</li>
                </ul>
              )}
            </div>
            <div className="view">
              <a href="#" className="grid-view--btn active-btn">
                <img src={chart} alt="chart" />
              </a>
              <a href="#" className="list-view--btn">
                <i className="fas fa-list-ul"></i>
              </a>
            </div>
          </div>
          <div className="right-side--btns">
            <p>sub total: ${totalValue.toLocaleString("en-IN")}</p>
            <button type="button" className="secondary-btn" onClick={openModal}>
              Create Lead
            </button>
            <div className="select action-select">
              <div className="dropdown-container" ref={pipeDropDownRef}>
                <div className="dropdown-header3" onClick={togglePipeDropdown}>
                  New Pipeline{" "}
                  <i
                    className={`fa-sharp fa-solid ${
                      pipeopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </div>
                {pipeopen && (
                  <ul className="pipelineMenu">
                    <li>Mass Delete</li>
                    <li>Mass Update</li>
                    <li>Mass Convert</li>
                    <li>Drafts</li>
                    <li>Mass Email</li>
                    <li>Export Filter Results</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="importDiv">
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="simple-btn"
                onClick={handleButtonClick}
              >
                import
              </button>
            </div>
            <div className="select action-select">
              <div className="dropdown-container" ref={actionDropDownRef}>
                <div
                  className="dropdown-header2"
                  onClick={toggleActionDropdown}
                >
                  Actions{" "}
                  <i
                    className={`fa-sharp fa-solid ${
                      actionopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </div>
                {actionopen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => toggleActionDropdown("Delete")}>
                      Mass Delete
                    </li>
                    <li>Mass Update</li>
                    <li>Mass Convert</li>
                    <li>Drafts</li>
                    <li>Mass Email</li>
                    <li>Export Filter Results</li>
                  </ul>
                )}
                {deleteConfirmationVisible && (
                  <div className="popup-container">
                    <div className="popup">
                      <p className="popupHead">Delete Selected Leads</p>
                      <p>Deleted leads will be in recycle bin for 90 days</p>
                      <p className="deleteMsg">
                        Are you sure you want to delete all selected leads?
                      </p>
                      <div className="popup-buttons">
                        <button
                          className="cancelBtn"
                          onClick={() => setDeleteConfirmationVisible(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirmBtn"
                          onClick={() => deleteCard()}
                        >
                          Delete Lead
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cards-body">
        {data.map((leadArray, index) => (
          <div key={keys[index]}>
            <LeadsColn
              key={keys[index]}
              leadArray={leadArray}
              leadKey={keys[index]}
              onLeadAdded={fetchLeadsData}
              onCardSelection={handleCardSelection} // Pass the handler function to the child component
              selectedCardIds={selectedCardIds} // Pass the selected card IDs to the child component
            />
          </div>
        ))}
      </section>
      <CreateLead
        isOpen={isModalOpen}
        onClose={closeModal}
        onLeadAdded={fetchLeadsData}
      />
    </div>
  );
};

export default LPleads;