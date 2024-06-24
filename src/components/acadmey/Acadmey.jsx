import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import {
  ALL_BMP_USER,
  ACADMEY_SEARCH,
  MOST_LEADS,
  ACADMEY_VEREFIED,
  SEARCH_ACADMEY_ID,
  ACADMEY_SEARCH_API,
  getDecryptedToken,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AcadmeyCard from "./AcadmeyCard.jsx";
import LeadCards from "../lead/LeadCards.jsx";
import DashboardCards from "../dashboard/DashboardCards.jsx";
import CreateLead from "../lead/CreateLead.jsx";
import InfoTable from "../infotable/InfoTable.jsx";
import City from "../infotable/City.jsx";

const Acadmey = () => {
  const [stages, setStages] = useState([
    {
      "id": 0,
      "stage": "academy",
      "name": "Academy"
    },
    {
      "id": 1,
      "stage": "new_academy",
      "name": "New Academy"
    },
    {
      "id": 2,
      "stage": "verified_acadmey",
      "name": "Verified Academy"
    },
    {
      "id": 3,
      "stage": "archive",
      "name": "Archive Academy"
    },
    {
      "id": 4,
      "stage": "acadmey_logs",
      "name": "Academy Logs"
    },
    {
      "id": 5,
      "stage": "acadmey_with_leads",
      "name": "Academy with Leads"
    }
  ]);
  const [academy, setAcademy] = useState([])
  const [toggleChecked, setToggleChecked] = useState(false);
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [acadmeyLeads, setAcademyLeads] = useState([])
  const [academyLogs, setAcademyLogs] = useState([]);
  const [verified, setVerified] = useState([]);
  const [newacadmey, setNewAcademy] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addCityClick = () => {
    setOpenCity(true)
  }
  const addCityClose = () => {
    setOpenCity(false)
  }
  const addUrlClick = () => {
    setOpenUrl(true)
  }
  const addUrlClose = () => {
    setOpenUrl(false)
  }
  //=========================================================get all acadmies
  const getNewAcademy = () => {
    axios.post(ALL_BMP_USER, { type_id: 2 }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      const filteredUser = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      setNewAcademy(filteredUser);
    }).catch((error) => {
      console.log(error);
    });
  }
  const getAllAcademy = (sport, city) => {
    const hasSportOrCity = sport || city;

    const requestBody = hasSportOrCity ? {
      ...(sport && { sport }),
      ...(city && { location: city }),
      condition: "conditions",
      limit_from: "0",
      limit_to: "1000",
    } : {
      sport: "football",
      condition: "conditions",
      limit_from: "0",
      limit_to: "1000"
    };
    axios.post(ACADMEY_SEARCH, requestBody, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setAcademy(response?.data?.data);
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
      "entity": "academy"
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
    getAllAcademy();
    getNewAcademy();
    getAllLeads();
    getAllLogs();
    getAllVerify();
  }, []);
  //=========================================================get all acadmey logs
  const getAllLogs = () => {
    const requestBody = {
      "condition": "hits",
      "limit_from": "0",
      "limit_to": "200",
      "entity": "academy"
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
      "entity": "academy"
    };

    const requestBodyAnyone = {
      "condition": "anyone",
      "entity": "academy"
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
      academy: academy?.length,
      new_academy: newacadmey?.length,
      acadmey_logs: academyLogs?.length,
      acadmey_with_leads: acadmeyLeads?.length,
      verified_acadmey: verified?.length,
    };
    setStatusCounts(counts);
  }, [academy, acadmeyLeads, academyLogs, verified]);

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value?.length === 0) {
      getAllAcademy();
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      apiUrl = toggleChecked
        ? `${SEARCH_ACADMEY_ID}${value}`
        : `${ACADMEY_SEARCH_API}${value}`;
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setAcademy(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const resetData = () => {
    getAllLeads();
    getAllLogs();
    getAllVerify();
  };

  //======================================================modal box
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
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
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    openUrl ?
      <InfoTable onClose={addUrlClose} /> : openCity ? <City onClose={addCityClose} /> :
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
                    Add Academy
                  </button>
                  <button type="button" className="secondary-btn" onClick={addCityClick}>
                    City
                  </button>
                  <button type="button" className="secondary-btn" onClick={addUrlClick}>
                    Details
                  </button>
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
                          case 'academy':
                            return academy?.map((obj) => (
                              <LeadCards
                                key={obj?.id}
                                object={obj}
                                onLeadAdded={getAllAcademy}
                                itemName={"academy"}
                              />
                            ));
                          case 'new_academy':
                            return newacadmey?.map((obj) => (
                              <DashboardCards
                                key={obj?.id}
                                object={obj}
                                onLeadAdded={getNewAcademy}
                                itemName="academy"
                              />
                            ));
                          case 'acadmey_logs':
                            if (academyLogs && academyLogs.length > 0) {
                              return academyLogs.map((obj) => (
                                <AcadmeyCard
                                  key={obj?.id}
                                  object={obj}
                                  onLeadAdded={getAllLogs}
                                  itemName={"academyLogs"}
                                />
                              ));
                            } else {
                              return <p>Loading...</p>;
                            };
                          case 'acadmey_with_leads':
                            if (acadmeyLeads && acadmeyLeads.length > 0) {
                              return acadmeyLeads.map((obj) => (
                                <AcadmeyCard
                                  key={obj?.id}
                                  object={obj}
                                  onLeadAdded={getAllLeads}
                                  itemName={"academyLeads"}
                                />
                              ));
                            } else {
                              return <p>Loading...</p>;
                            }
                          case 'verified_acadmey':
                            if (verified && verified.length > 0) {
                              return verified.map((obj) => (
                                <AcadmeyCard
                                  key={obj?.id}
                                  object={obj}
                                  onLeadAdded={getAllLogs}
                                  itemName={"verified_acadmey"}
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
            {isModalOpen && (
              <CreateLead
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            )}
            <ToastContainer />
          </div>
        </>
  );
};

export default Acadmey;
