import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import Sort from "../../assets/image/sort.svg";
import axios from "axios";
import { cities } from "../utils/cities.js";
import {
  getDecryptedToken,
  ACADMEY_SEARCH,
  ACADMEY_SEARCH_API,
  GET_ACTIVE_TEAM_MEM,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeadCards from "../lead/LeadCards.jsx";

const Acadmey = () => {
  const [stages, setStages] = useState([
    {
      "id": 1,
      "stage": "academy"
    },
    {
      "id": 2,
      "stage": "Acadmey with Leads"
    },
    {
      "id": 3,
      "stage": "Acadmey without Leads"
    }
  ]);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('academy');
  const [display, setDisplay] = useState("Select Category")
  const orgId = localStorage.getItem('org_id');
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionSortRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const [deals, setDeals] = useState([]);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedStatusesData, setSelectedStatusesData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [sportsLead, setSportsLead] = useState('');
  const [cityLead, setCityLead] = useState('');
  const [acadmey, setAcademy] = useState([])
  const [limit, setLimit] = useState(500);

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
  const userAdded = () => {
    axios
      .post(GET_ACTIVE_TEAM_MEM, { orgId: orgId }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const responseData = response?.data?.data;
        setUserData(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userAdded();
  }, [orgId])

  useEffect(() => {
    const counts = {
      academy: acadmey?.length,
    };
    setStatusCounts(counts);
  }, [acadmey]);
  
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
      } 
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      if (selectedEntity === 'academy' || selectedEntity === '') {
        apiUrl = toggleChecked
          ? `https://bmp.leadplaner.com/api/api/bmp/academy/search/id/${value}`
          : `${ACADMEY_SEARCH_API}${value}`;
      } 
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then(response => {
        if (selectedEntity === 'academy' || selectedEntity === '') {
          setAcademy(response?.data?.data);
        } 
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
    getAllAcademy();
  };
  useEffect(() => {
    getAllAcademy();
  }, []);

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

  return (
    <>
    {/* <div>
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
              <div className="select action-select">
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
              <input list="city_leads" name="city_lead" id="city_lead" value={cityLead} placeholder="City" onChange={handleCityChange}></input>
              <datalist id="city_leads">
                {cities?.map((city, index) => (
                  <option key={index} value={city}></option>
                ))}
              </datalist>
            </div>

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
                    onLeadAdded={getAllAcademy}
                    itemName={"academy"}
                    userData={userData}
                  />
                ));
              // case 'player':
              //   return player?.map((obj) => (
              //     <LeadCards
              //       key={obj?.id}
              //       object={obj}
              //       onLeadAdded={getAllPlayers}
              //       itemName={"player"}
              //       userData={userData}
              //     />
              //   ));
              // case 'coach':
              //   return coach?.map((obj) => (
              //     <LeadCards
              //       key={obj?.id}
              //       object={obj}
              //       onLeadAdded={getAllCoaches}
              //       itemName={"coach"}
              //       userData={userData}
              //     />
              //   ));
              // case 'user':
              //   return user?.map((obj) => (
              //     <LeadCards
              //       key={obj?.id}
              //       object={obj}
              //       onLeadAdded={getAllUsers}
              //       itemName={"user"}
              //       userData={userData}
              //     />
              //   ));
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
</div> */}
</>
  );
};

export default Acadmey;
