import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import {
  ALL_BMP_USER,
  ACADMEY_VEREFIED,
  MOST_LEADS,
  SEARCH_API,
  GET_COACH,
  getDecryptedToken,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachCard from "./CoachCard.jsx";
import AddCoach from "./AddCoach.jsx";
import LeadCards from "../lead/LeadCards.jsx";
import DashboardCards from "../dashboard/DashboardCards.jsx";

const Coach = () => {
  const [stages, setStages] = useState([
    {
      "id": 0,
      "stage": "coach",
      "name": "Coach"
    },
    {
      "id": 1,
      "stage": "new_coach",
      "name": "New Coach"
    },
    {
      "id": 2,
      "stage": "verified_coach",
      "name": "Verified Coach"
    },
    {
      "id": 3,
      "stage": "archive",
      "name": "Archive Coach"
    },
    {
      "id": 4,
      "stage": "coach_logs",
      "name": "Coach Logs"
    },
    {
      "id": 5,
      "stage": "coach_with_leads",
      "name": "Coach with Leads"
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
  const [newcoach, setNewCoach] = useState([]);
  const [deleted, setDeleted] = useState([]);
  //======================================================modal box
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //=========================================================get all coaches
  const getAllCoaches = () => {
    const requestBody = {
      "entity": "bmp_coach_details",
      "limit_from": "0",
      "limit_to": "1000"
    };
    axios.post(GET_COACH, requestBody, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      console.log(response?.data?.data)
      setCoach(response?.data?.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getNewCoaches = () => {
    axios.post(ALL_BMP_USER, { type_id: 1 }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      const filteredUser = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      const newUser = filteredUser?.filter(obj => obj?.is_deleted !== 1);
      const deleteUser = filteredUser?.filter(obj => obj?.is_deleted === 1);
      setNewCoach(newUser);
      setDeleted(deleteUser);
    }).catch((error) => {
      console.log(error);
    });
  }
 
  //=========================================================get all acadmey leads
  const getAllLeads = () => {
    const requestBody = {
      "condition": "leads",
      "limit_from": "0",
      "limit_to": "1000",
      "entity": "coach"
    };
    axios.post(MOST_LEADS, requestBody, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setAcademyLeads(response?.data?.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getAllCoaches();
    getNewCoaches();
    getAllLeads();
    getAllLogs();
    getAllVerify();
  }, []);
  //=========================================================get all acadmey logs
  const getAllLogs = () => {
    const requestBody = {
      "condition": "hits",
      "limit_from": "0",
      "limit_to": "1000",
      "entity": "coach"
    };
    axios.post(MOST_LEADS, requestBody, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setAcademyLogs(response?.data?.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  //=========================================================get all acadmey verifeid
  const getAllVerify = () => {
    const requestBodyBoth = {
      "condition": "both",
      "entity": "coach"
    };

    const requestBodyAnyone = {
      "condition": "anyone",
       "entity": "coach"
    };

    Promise.all([
      axios.post(ACADMEY_VEREFIED, requestBodyBoth, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`
        }
      }),
      axios.post(ACADMEY_VEREFIED, requestBodyAnyone, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`
        }
      })
    ]).then(([bothResponse, anyoneResponse]) => {
      const bothData = bothResponse?.data?.data || [];
    const anyoneData = anyoneResponse?.data?.data || [];
    const combinedData = [...bothData, ...anyoneData];
    const uniqueIds = new Set();
    const filteredData = combinedData.filter(item => {
      if (uniqueIds.has(item.id)) {
        return false;
      } else {
        uniqueIds.add(item.id);
        return true;
      }
    });

    setVerified(filteredData);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const counts = {
      coach: coach?.length,
      new_coach: newcoach?.length,
      archive: deleted?.length,
      coach_logs: academyLogs?.length,
      coach_with_leads: acadmeyLeads?.length,
      verified_coach: verified?.length,
    };
    setStatusCounts(counts);
  }, [coach, acadmeyLeads, newcoach,academyLogs]);

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value?.length === 0) {
      getAllCoaches();
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      apiUrl = toggleChecked
        ? `${SEARCH_API}bmp_coach_details/id/${value}`
        : `${SEARCH_API}bmp_coach_details/global/${value}`;
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setCoach(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const resetData = () => {
    getAllCoaches();
    getNewCoaches();
    getAllLeads();
    getAllLogs();
    getAllVerify();
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
              <button type="button" className="secondary-btn" onClick={openModal}>
                Add Coach
              </button>
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
              <button
                type="button"
                className="helpBtn genral-refresh-icon"
                title="Refresh"
                onClick={resetData}
              >
                <i class="fa-sharp fa-solid fa-rotate "></i>
              </button>
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
                      {item?.name}({statusCounts[item.stage]})
                    </p>
                  </div>
                  {(() => {
                    switch (item?.stage) {
                      case 'coach':
                        return coach?.map((obj) => (
                          <LeadCards
                            key={obj?.id}
                            object={obj}
                            onLeadAdded={getAllCoaches}
                            itemName={"coach"}
                          />
                        ));
                        case 'new_coach':
                        if (newcoach && newcoach.length > 0) {
                          return newcoach.map((obj) => (
                            <DashboardCards
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getNewCoaches}
                              itemName="coach"
                            />
                          ));
                        } else {
                          return <p>Loading...</p>;
                        };
                        case 'archive':
                          return deleted?.map((obj) => (
                            <DashboardCards
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getNewCoaches}
                              itemName="coach"
                            />
                          ));
                      case 'coach_logs':
                        if (academyLogs && academyLogs.length > 0) {
                          return academyLogs.map((obj) => (
                            <CoachCard
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getAllLogs}
                              itemName={"coach_logs"}
                            />
                          ));
                        } else {
                          return <p>Loading...</p>;
                        };
                      case 'coach_with_leads':
                        if (acadmeyLeads && acadmeyLeads.length > 0) {
                          return acadmeyLeads.map((obj) => (
                            <CoachCard
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getAllLeads}
                              itemName={"coach_with_leads"}
                            />
                          ));
                        } else {
                          return <p>Loading...</p>;
                        }
                      case 'verified_coach':
                        if (verified && verified.length > 0) {
                          return verified.map((obj) => (
                            <CoachCard
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getAllVerify}
                              itemName={"verified_coach"}
                            />
                          ));
                        } else {
                          return <p>Loading...</p>;
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
        {isModalOpen && (
          <AddCoach
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default Coach;
