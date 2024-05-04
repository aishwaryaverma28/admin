import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import {
  MOST_LEADS,
  GET_COACH,
  getDecryptedToken,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllLeadsCards from "./AllLeadsCards.jsx";
import LeadsCardsCopy from "./LeadsCardCopy.jsx";

const AllLeads = () => {
  const [stages, setStages] = useState([
    {
      "id": 0,
      "stage": "swimming",
      "name": "Swimming",
      "count": 7
    },
    {
      "id": 1,
      "stage": "cricket",
      "name": "Cricket",
      "count": 5
    },
    {
      "id": 2,
      "stage": "football",
      "name": "Football",
      "count": 2
    },
    {
      "id": 3,
      "stage": "hockey",
      "name": "Hockey",
      "count": 0
    }
  ]);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [coach, setCoach] = useState([]);
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [acadmeyLeads, setAcademyLeads] = useState([])
  const [academyLogs, setAcademyLogs] = useState([]);
  const [verified, setVerified] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const handleToggleChange = () => {
  };
  const handleSearchChange = (event) => {
  
  };

  //======================================================modal box
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const toggleActionDropdown = (option) => {
    setActionOpen(!actionopen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        leadDropDownRef.current &&
        !leadDropDownRef.current.contains(event.target)
      ) {
        setLeadOpen(false);
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

    const handleOutsideClick5 = (event) => {
      if (
        actionOwnerRef.current &&
        !actionOwnerRef.current.contains(event.target)
      ) {
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick3);
    document.addEventListener("click", handleOutsideClick5);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick3);
      document.removeEventListener("click", handleOutsideClick5);
    };
  }, []);

  
  return (
    <>
      <div>
        <section className="lead-body">
          <div className="top-head">
            <div className="left-side--btns">
              <div className="dropdown-container" ref={leadDropDownRef}>
                <div className="dropdown-header" onClick={toggleDropdown}>
                  all Leads{" "}
                  <i
                    className={`fa-sharp fa-solid ${leadopen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                  ></i>
                </div>
                {leadopen && (
                  <ul className="dropdown-menuLead">
                    <li>Lead 1</li>
                    <li>Lead 2</li>
                    <li>Lead 3</li>
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
              <div className="recycle-search-box">
                <input
                  type="text"
                  className="recycle-search-input recycle-fonts"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span className="recycle-search-icon">
                  <div>
                    <label className="password-switch lead-switch">
                      <input
                        type="checkbox"
                        checked={toggleChecked}
                        onChange={handleToggleChange}
                      />
                      <span className="password-slider lead-slider password-round"></span>
                    </label>
                  </div>
                </span>
              </div>
            </div>
            <div className="right-side--btns">
              <div className="select action-select">
                <div className="dropdown-container" ref={actionDropDownRef}>
                  <div
                    className="dropdown-header2"
                    onClick={toggleActionDropdown}
                  >
                    Actions{" "}
                    <i
                      className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                        }`}
                    ></i>
                  </div>
                  {actionopen && (
                    <ul className="dropdown-menu">
                      <li>Mass Delete</li>
                      <li>Mass Update</li>
                      <li>Import</li>
                      <li>
                        Export Leads
                      </li>
                    </ul>
                  )}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="cards-body">
          {stages?.map((item, index) => (
            <div className="card-column" key={index}>
              <div className="card-details">
                <div className="main-cards">
                  <div className="cards-new">
                    <p className="DealName">
                      {item?.name}({item?.count})
                    </p>
                  </div>
                  {(() => {
                    switch (item?.stage) {
                      case 'swimming':
                        return (
                        <>
                        <AllLeadsCards/>
                        <LeadsCardsCopy/>
                        </>
                        )
                      case 'coach_logs':
                        if (academyLogs && academyLogs.length > 0) {
                          return academyLogs.map((obj) => (
                            <></>
                            // <CoachCard
                            //   key={obj?.id}
                            //   object={obj}
                            //   onLeadAdded={getAllLogs}
                            //   itemName={"coach_logs"}
                            // />
                          ));
                        } else {
                          return <p>Loading...</p>;
                        };
                      case 'coach_with_leads':
                        if (acadmeyLeads && acadmeyLeads.length > 0) {
                          return acadmeyLeads.map((obj) => (
                            <></>
                            // <CoachCard
                            //   key={obj?.id}
                            //   object={obj}
                            //   onLeadAdded={getAllLeads}
                            //   itemName={"coach_with_leads"}
                            // />
                          ));
                        } else {
                          return <p>Loading...</p>;
                        }
                      case 'verified_coach':
                        if (verified && verified.length > 0) {
                          return verified.map((obj) => (
                            <></>
                            // <CoachCard
                            //   key={obj?.id}
                            //   object={obj}
                            //   onLeadAdded={getAllLogs}
                            //   itemName={"verified_coach"}
                            // />
                          ));
                        } else {
                          return
                          // return <p>Loading...</p>;
                        };
                      default:
                        return null;
                    }
                  })()}

                </div>
              </div>
            </div>
          ))}
        </section>
        <ToastContainer />
        {/* {isModalOpen && (
          <AddCoach
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )} */}
      </div>
    </>
  );
};

export default AllLeads;
