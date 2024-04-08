import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import Sort from "../../assets/image/sort.svg";
import axios from "axios";
import LeadCards from "./LeadCards";
import CreateLead from "./CreateLead";
import { cities } from "../utils/cities.js";
import LeadDeletePopUp from "../DeleteComponent";
import {
  GET_COACH,
  ALL_BMP_USER,
  getDecryptedToken,
  ACADMEY_SEARCH,
  SEARCH_ACADMEY_ID,
  ACADMEY_SEARCH_API
} from "../utils/Constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MassUpdateModal from "./MassUpdateModal.jsx";

const Lead = () => {
  const [stages, setStages] = useState([
    {
      "id": 1,
      "stage": "academy"
    },
    {
      "id": 2,
      "stage": "coach"
    },
    {
      "id": 3,
      "stage": "player"
    },
    {
      "id": 4,
      "stage": "user"
    },
  ]);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('academy');
  const [display, setDisplay] = useState("Select Category")
  const orgId = localStorage.getItem('org_id');
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [pipeopen, setPipeOpen] = useState(false);
  const [actionopen, setActionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionSortRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const [deals, setDeals] = useState([]);
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedStatusesData, setSelectedStatusesData] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userData, setUserData] = useState([]);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [massUpdateModalOpen, setMassUpdateModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [sportsLead, setSportsLead] = useState('');
  const [cityLead, setCityLead] = useState('');
  const [acadmey, setAcademy] = useState([])
  const [limit, setLimit] = useState(500);
  const [coach, setCoach] = useState([]);
  const [player, setPlayer] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAllAcademy();
  }, [limit]);
  const handleSportsChange = (event) => {
    setSportsLead(event.target.value);
    getAllAcademy(event.target.value, cityLead);
  };
  const handleCityChange = (event) => {
    setCityLead(event.target.value);
    getAllAcademy(sportsLead, event.target.value);
  };
  const handleDataReceived = (newData) => {
    setData(newData);
  };
  const handleMassUpdate = () => {
    setMassUpdateModalOpen(true);
  };
  const handleMassUpdateClose = () => {
    setMassUpdateModalOpen(false);
    setSelectedIds([]);
  };

  
  //=========================================================get all acadmies
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
    setCoach(response?.data?.data);
  }).catch((error) => {
    console.log(error);
  });
}
//=========================================================get all players
const getAllPlayers = () => {
  const requestBody = {
    "entity": "bmp_player_details",
    "limit_from": "0",
    "limit_to": "1000"
};
  axios.post(GET_COACH, requestBody, {
    headers: {
      Authorization: `Bearer ${decryptedToken}`
    }
  }
  ).then((response) => {
    setPlayer(response?.data?.data);
  }).catch((error) => {
    console.log(error);
  });
}
//=========================================================get all users
const getAllUsers = () => {
  axios.post(ALL_BMP_USER, {}, {
    headers: {
      Authorization: `Bearer ${decryptedToken}`
    }
  }
  ).then((response) => {
    setUser(response?.data?.data);
  }).catch((error) => {
    console.log(error);
  });
}

  useEffect(() => {
    const counts = {
      academy: acadmey?.length,
      coach: coach?.length,
      player:player?.length,
      user: user?.length,
    };
    setStatusCounts(counts);
  }, [acadmey, coach,player,user]);
  
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
      if (selectedEntity === 'academy' || selectedEntity === '') {
        getAllAcademy();
      } else if (selectedEntity === 'coach') {
        getAllCoaches();
      } else if (selectedEntity === 'user') {
        getAllUsers();
      }else if (selectedEntity === 'player') {
        getAllPlayers();
      }
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      if (selectedEntity === 'academy' || selectedEntity === '') {
        apiUrl = toggleChecked
          ? `${SEARCH_ACADMEY_ID}${value}`
          : `${ACADMEY_SEARCH_API}${value}`;
      } else {
        const entityMap = {
          coach: 'bmp_coach_details',
          player: 'bmp_player_details',
          user: 'bmp_user',
        };
        const entity = entityMap[selectedEntity] || selectedEntity;
        apiUrl = toggleChecked
          ? `https://bmp.leadplaner.com/api/api/bmp/searchEntity/${entity}/id/${value}`
          : `https://bmp.leadplaner.com/api/api/bmp/searchEntity/${entity}/global/${value}`;
      }
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then(response => {
        if (selectedEntity === 'academy' || selectedEntity === '') {
          setAcademy(response?.data?.data);
        } else if (selectedEntity === 'coach') {
          setCoach(response?.data?.data);
        }else if (selectedEntity === 'user') {
          setUser(response?.data?.data);
        }else if (selectedEntity === 'player') {
          setPlayer(response?.data?.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  };
    const toggleSortDropdown = () => {
    setSortOpen(!sortOpen);
  };
  const toggleOwnerDropdown = () => {
    setOwnerOpen(!ownerOpen);
  };
  const resetData = () => {
    getAllAcademy();
  };

  const handleDeletePopUpOpen = () => {
    setIsDelete(true);
  };
  const handleMassDeletePopUpClose = () => {
    setIsDelete(false);
  };

  useEffect(() => {
    getAllAcademy();
    getAllCoaches();
    getAllPlayers();
    getAllUsers();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterDealData = deals?.filter((item) => {
    const dealName = `${item?.lead_name}`?.toLowerCase() || "";
    const dealValue = `${item?.value}`?.toLowerCase() || "";
    const dealValue2 = `$${item?.value}`?.toLowerCase() || "";
    const ownerFirstName = `${item?.ownerf_name}`?.toLowerCase() || "";
    const ownerLastName = `${item?.ownerl_name}`?.toLowerCase() || "";
    const ownerFullName =
      `${item?.ownerf_name} ${item?.ownerl_name}`?.toLowerCase() || "";
    const closureDate =
      `${item?.closure_date}`.split("T")[0].toLowerCase() || "";
    const labelName = `${item?.label_name}`.toLowerCase() || "";
    const searchDeal = searchQuery.toLowerCase();

    const matchQuery =
      dealName?.includes(searchDeal) ||
      dealValue?.includes(searchDeal) ||
      dealValue2?.includes(searchDeal) ||
      ownerFirstName?.includes(searchDeal) ||
      ownerLastName?.includes(searchDeal) ||
      ownerFullName?.includes(searchDeal) ||
      closureDate?.includes(searchDeal) ||
      labelName?.includes(searchDeal);
    return matchQuery;
  });

  const sortData = (data, option, order) => {
    switch (option) {
      case "Amount":
        return data?.slice()?.sort((a, b) => {
          const result = a?.value - b?.value;
          return order === "asc" ? result : -result;
        });
      case "LeadName":
        return data?.slice()?.sort((a, b) => {
          const result = a?.lead_name
            ?.toLowerCase()
            .localeCompare(b?.lead_name?.toLowerCase());
          return order === "asc" ? result : -result;
        });
      case "Label":
        return data?.slice()?.sort((a, b) => {
          const result = a?.label_name
            ?.toLowerCase()
            .localeCompare(b?.label_name?.toLowerCase());
          return order === "asc" ? result : -result;
        });
      case "Owner":
        return data?.slice()?.sort((a, b) => {
          const result = a.ownerf_name
            ?.toLowerCase()
            ?.localeCompare(b?.lead_name?.toLowerCase());
          return order === "asc" ? result : -result;
        });
      default:
        return data?.slice()?.sort(() => {
          return order === "asc" ? 1 : -1;
        });
    }
  };

  //======================================================modal box
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const togglePipeDropdown = () => {
    setPipeOpen(!pipeopen);
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
        setSortOpen(false);
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

  const handleChildCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds?.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const areAllChildCheckboxesChecked = (status) => {
    if (selectedStatusesData[status]) {
      const idsWithStatus = deals
        ?.filter((deal) => deal.status === status)
        ?.map((deal) => deal.id);
      return idsWithStatus.every((id) => selectedIds.includes(id));
    }
    return false;
  };

  const handleHeaderCheckboxChange = (status) => {
    const idsWithStatus = deals
      ?.filter((deal) => deal.status === status)
      ?.map((deal) => deal.id);

    if (areAllChildCheckboxesChecked(status)) {
      setSelectedIds(selectedIds?.filter((id) => !idsWithStatus.includes(id)));
      setSelectedStatusesData((prevData) => ({
        ...prevData,
        [status]: false,
      }));
    } else {
      setSelectedIds([...selectedIds, ...idsWithStatus]);
      setSelectedStatusesData((prevData) => ({
        ...prevData,
        [status]: true,
      }));
    }
  };

  const handleDeleteLead = () => {
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
            <div className="dropdown-container" ref={actionOwnerRef}>
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
            </div>

          </div>
          <div className="right-side--btns">
            <button type="button" className="secondary-btn" onClick={openModal}>
            Add Academy
            </button>
            <div className="select action-select">
              {/* <label for="browserChoice">Sports:</label> */}
              <input list="sports_leads" name="sports_lead" id="sports_lead" value={sportsLead}
                placeholder="Sports"
                onChange={handleSportsChange}></input>
              <datalist id="sports_leads">
                <option value="archery"></option>
                <option value="arts"></option>
                <option value="athletics"></option>
                <option value="badminton"></option>
                <option value="basketball"></option>
                <option value="billiards"></option>
                <option value="boxing"></option>
                <option value="chess"></option>
                <option value="cricket"></option>
                <option value="fencing"></option>
                <option value="football"></option>
                <option value="golf"></option>
                <option value="gym"></option>
                <option value="hockey"></option>
                <option value="kabaddi"></option>
                <option value="karate"></option>
                <option value="kho-kho"></option>
                <option value="mma"></option>
                <option value="motorsports"></option>
                <option value="rugby"></option>
                <option value="shooting"></option>
                <option value="skating"></option>
                <option value="sports"></option>
                <option value="squash"></option>
                <option value="swimming"></option>
                <option value="table-tennis"></option>
                <option value="taekwondo"></option>
                <option value="tennis"></option>
                <option value="volleyball"></option>
                <option value="wrestling"></option>
                <option value="yoga"></option>
                <option value="bodybuilding"></option>
              </datalist>
            </div>
            <div className="select action-select">
              {/* <label htmlFor="browserChoice">City:</label> */}
              <input list="city_leads" name="city_lead" id="city_lead" value={cityLead} placeholder="City" onChange={handleCityChange}></input>
              <datalist id="city_leads">
                {cities?.map((city, index) => (
                  <option key={index} value={city}></option>
                ))}
              </datalist>
            </div>

            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
            />

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
                    {/* <li onClick={() => toggleActionDropdown("Delete")}>
                      Mass Delete
                    </li> */}
                    <li onClick={handleDeletePopUpOpen}>Mass Delete</li>
                    <li onClick={handleMassUpdate}>Mass Update</li>
                    {/* <li>Mass Convert</li> */}
                    {/* <li>Drafts</li> */}
                    {/* <li>Mass Email</li> */}
                    <li>Import</li>
                    <li onClick={() => toggleActionDropdown("Export")}>
                      Export Leads
                    </li>
                  </ul>
                )}

                {/* <div className="popup-container">
                    <div className="popup">
                      <p className="popupHead">Delete Selected Deals</p>
                      <p>Deleted deals will be in recycle bin for 90 days</p>
                      <p className="deleteMsg">
                        Are you sure you want to delete all selected deals?
                      </p>
                      <div className="popup-buttons">
                        <button
                          className="cancelBtn"
                        >
                          Cancel
                        </button>
                        <button
                          className="confirmBtn"
                        >
                          Delete Lead
                        </button>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
            <div className="deal-sort" onClick={toggleSortOrder}>
              <img src={Sort} alt="" />
            </div>
            <div className="select action-select">
              <div className="dropdown-container" ref={actionSortRef}>
                <div className="dropdown-header2" onClick={toggleSortDropdown}>
                  Sort By
                  <i
                    className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                  ></i>
                </div>
                {sortOpen && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => {
                        setSortOption("None");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      None
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("LeadName");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Lead Name
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Amount");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Amount
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Label");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Label
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Owner");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Lead Owner
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
              {item?.stage}({statusCounts[item.stage]})
            </p>
            {statusCounts[item?.id] > 0 && (
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  className={`cb1 ${item}-header-checkbox`}
                  name="headerCheckBox"
                  checked={
                    selectedStatusesData[item] &&
                    areAllChildCheckboxesChecked(item)
                  }
                  onChange={() => handleHeaderCheckboxChange(item)}
                />
                <span className="checkmark"></span>
              </label>
            )}
          </div>
          {(() => {
            switch (item?.stage) {
              case 'academy':
                return acadmey?.map((obj) => (
                  <LeadCards
                    key={obj?.id}
                    object={obj}
                    // selectedIds={selectedIds}
                    // setSelectedIds={setSelectedIds}
                    onLeadAdded={getAllAcademy}
                    itemName={"academy"}
                    userData={userData}
                  />
                ));
              case 'player':
                return player?.map((obj) => (
                  <LeadCards
                    key={obj?.id}
                    object={obj}
                    onLeadAdded={getAllPlayers}
                    itemName={"player"}
                    userData={userData}
                  />
                ));
              case 'coach':
                return coach?.map((obj) => (
                  <LeadCards
                    key={obj?.id}
                    object={obj}
                    onLeadAdded={getAllCoaches}
                    itemName={"coach"}
                    userData={userData}
                  />
                ));
              case 'user':
                return user?.map((obj) => (
                  <LeadCards
                    key={obj?.id}
                    object={obj}
                    onLeadAdded={getAllUsers}
                    itemName={"user"}
                    userData={userData}
                  />
                ));
              default:
                return null;
            }
          })()}
        </div>
        {/* <div className="bottom-fixed">
          {statusCounts[item.id] > 0 && (
            <button onClick={handleLoadMore} className="common-save-button">Load More</button>
          )}
        </div> */}
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
      {isDelete && (
        <LeadDeletePopUp
          onClose={handleMassDeletePopUpClose}
          onDeleteConfirmed={handleDeleteLead}
        />
      )}

      {massUpdateModalOpen && (
        <MassUpdateModal
          onClose={handleMassUpdateClose}
          userData={userData}
          text="Lead"
          ids={selectedIds}
          handleDataReceived={handleDataReceived}
          getAllAcademy={getAllAcademy}
        />
      )}
    </div>
  );
};

export default Lead;
