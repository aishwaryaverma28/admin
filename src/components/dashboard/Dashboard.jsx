import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import LeadCards from "../lead/LeadCards";
import CreateLead from "../lead/CreateLead.jsx";
import {
  ALL_BMP_USER,
  getDecryptedToken,
} from "../utils/Constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeadModal from "../LeadModal.jsx";
import DashboardCards from "./DashboardCards.jsx";
import UrlTable from "./UrlTable.jsx";

const Dashboard = () => {
  const [stages, setStages] = useState([
    {
      "id": 1,
      "stage": "new_academy",
      "name": "Academy"
    },
    {
      "id": 2,
      "stage": "new_coach",
      "name": "Coach"
    },
    {
      "id": 3,
      "stage": "new_player",
      "name": "Player"
    },
  ]);
  const [openLead, setOpenLead] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('academy');
  const [display, setDisplay] = useState("Select Category")
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionSortRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [acadmey, setAcademy] = useState([])
  const [coach, setCoach] = useState([]);
  const [player, setPlayer] = useState([]);
  const addLeadClick = () => {
    setOpenLead(true)
  }
  const addLeadClose = () => {
    setOpenLead(false)
  }
  const addUrlClick = () => {
    setOpenUrl(true)
  }
  const addUrlClose = () => {
    setOpenUrl(false)
  }


  const getAllAcademy = () => {
    axios.post(ALL_BMP_USER, { type_id: 2 }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      const filteredUser = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      setAcademy(filteredUser);
    }).catch((error) => {
      console.log(error);
    });
  }
  const getAllCoaches = () => {
    axios.post(ALL_BMP_USER, { type_id: 1 }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      const filteredData = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      setCoach(filteredData);
    }).catch((error) => {
      console.log(error);
    });
  }
  const getAllPlayers = () => {
    axios.post(ALL_BMP_USER, { type_id: 3 }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }).then((response) => {
      const filteredData = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      setPlayer(filteredData);
    }).catch((error) => {
      console.log(error);
    });
  }
  //=========================================================get all users
  const getAllUsers = (typeId) => {
    axios.post(ALL_BMP_USER, { type_id: typeId }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }).then((response) => {
      const filteredData = response?.data?.data.filter(obj => obj.parent_tbl !== null);
      switch (typeId) {
        case 1:
          setCoach(filteredData);
          break;
        case 2:
          setAcademy(filteredData);
          break;
        case 3:
          setPlayer(filteredData);
          break;
        default:
          break;
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    const counts = {
      "new_academy": acadmey?.length,
      "new_coach": coach?.length,
      'new_player': player?.length,
    };
    setStatusCounts(counts);
  }, [acadmey, coach, player]);

  const handleEntityChange = (entity) => {
    setDisplay(entity);
    setSelectedEntity(entity);
    setSearchQuery('');
    setOwnerOpen(false);
  };
  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value?.length === 0) {
      getAllUsers(1);
      getAllUsers(2);
      getAllUsers(3);
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';      
        apiUrl = toggleChecked
          ? `https://bmp.leadplaner.com/api/api/bmp/searchEntity/bmp_user/id/${value}`
          : `https://bmp.leadplaner.com/api/api/bmp/searchEntity/bmp_user/global/${value}`;
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

  const toggleOwnerDropdown = () => {
    setOwnerOpen(!ownerOpen);
  };
  const resetData = () => {
    getAllUsers(1);
    getAllUsers(2);
    getAllUsers(3);
  };

  useEffect(() => {
    getAllUsers(1);
    getAllUsers(2);
    getAllUsers(3);
  }, []);


  //======================================================modal box
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const toggleActionDropdown = () => {
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

    const handleOutsideClick4 = (event) => {
      if (
        actionSortRef.current &&
        !actionSortRef.current.contains(event.target)
      ) {
      }
    };
    const handleOutsideClick5 = (event) => {
      if (
        actionOwnerRef.current &&
        !actionOwnerRef.current.contains(event.target)
      ) {
        setOwnerOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick3);
    document.addEventListener("click", handleOutsideClick4);
    document.addEventListener("click", handleOutsideClick5);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick3);
      document.removeEventListener("click", handleOutsideClick4);
      document.removeEventListener("click", handleOutsideClick5);
    };
  }, []);

  return (

    openUrl ? 
      <UrlTable onClose={addUrlClose}/> :
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
            {/* <div className="dropdown-container" ref={actionOwnerRef}>
              <div className="dropdown-header2" onClick={toggleOwnerDropdown}>
                {display}
                <i
                  className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                ></i>
              </div>
              {ownerOpen && (
                <ul className="dropdown-menu owner-menu">
                  {stages?.map((item) => (
                    <li
                      key={item?.id}
                      value={item?.id}
                      className="owner-val"
                      onClick={() => handleEntityChange(item.stage)}
                    >
                      {item.stage}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}

          </div>
          <div className="right-side--btns">
            <button type="button" className="secondary-btn" onClick={addUrlClick}>
              Redirect
            </button>            
            <button type="button" className="secondary-btn" onClick={addLeadClick}>
              Add Leads
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
                )}
              </div>
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
                    case 'new_academy':
                      return acadmey?.map((obj) => (
                        <DashboardCards
                          key={obj?.id}
                          object={obj}
                          onLeadAdded={getAllAcademy}
                          itemName="academy"
                        />
                      ));
                    case 'new_player':
                      return player?.map((obj) => (
                        <DashboardCards
                          key={obj?.id}
                          object={obj}
                          onLeadAdded={getAllPlayers}
                          itemName="player"
                        />
                      ));
                    case 'new_coach':
                      return coach?.map((obj) => (
                        <DashboardCards
                          key={obj?.id}
                          object={obj}
                          onLeadAdded={getAllCoaches}
                          itemName="coach"
                        />
                      ));
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
      {
        openLead && (
          <LeadModal onClose={addLeadClose} />
        )
      }
    </div>
  );
};

export default Dashboard;
