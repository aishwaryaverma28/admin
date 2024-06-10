import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import {
  LEADS_CITY,
  getDecryptedToken,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllLeadsCards from "./AllLeadsCards.jsx";
import InfoTable from "../infotable/InfoTable.jsx";
import CityTable from "../infotable/CityTable.jsx";

const AllLeads = () => {
  const [toggleChecked, setToggleChecked] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [acadmeyLeads, setAcademyLeads] = useState([])
  const [selectedOption, setSelectedOption] = useState("last_seven_days");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    let startDate, endDate;
    const today = new Date();
    switch (e.target.value) {
      case "today":
        startDate = today.toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = yesterday.toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "this_week":
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        startDate = firstDayOfWeek.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "last_week":
        const lastWeekEndDate = new Date();
        lastWeekEndDate.setDate(
          lastWeekEndDate.getDate() - lastWeekEndDate.getDay() - 1
        );
        const lastWeekStartDate = new Date(lastWeekEndDate);
        lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 6);
        startDate = lastWeekStartDate.toISOString().split("T")[0];
        endDate = lastWeekEndDate.toISOString().split("T")[0];
        break;
      case "last_seven_days":
        endDate = today.toISOString().split("T")[0];
        const lastSevenDaysStartDate = new Date(today);
        lastSevenDaysStartDate.setDate(lastSevenDaysStartDate.getDate() - 6);
        startDate = lastSevenDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_fourteen_days":
        endDate = today.toISOString().split("T")[0];
        const lastFourteenDaysStartDate = new Date(today);
        lastFourteenDaysStartDate.setDate(
          lastFourteenDaysStartDate.getDate() - 13
        );
        startDate = lastFourteenDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_twenty_eight_days":
        endDate = today.toISOString().split("T")[0];
        const lastTwentyEightDaysStartDate = new Date(today);
        lastTwentyEightDaysStartDate.setDate(
          lastTwentyEightDaysStartDate.getDate() - 27
        );
        startDate = lastTwentyEightDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_thirty_days":
        endDate = today.toISOString().split("T")[0];
        const lastThirtyDaysStartDate = new Date(today);
        lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
        startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_sixty_days":
        endDate = today.toISOString().split("T")[0];
        const lastSixtyDaysStartDate = new Date(today);
        lastSixtyDaysStartDate.setDate(lastSixtyDaysStartDate.getDate() - 59);
        startDate = lastSixtyDaysStartDate.toISOString().split("T")[0];
        break;
      default:
        startDate = "";
        endDate = "";
        break;
    }

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    const formattedEndDate = adjustedEndDate.toISOString().split("T")[0];

    getAllLeads(startDate, formattedEndDate);
  };
  const getAllLeads = (startDate, endDate) => {
    axios.post(LEADS_CITY, {
      startDate: startDate,
      endDate: endDate,
    }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setAcademyLeads(response?.data?.data)
      total(response?.data?.data)
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 6);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    getAllLeads(startDate, formattedEndDate);
  }, []);
  const total = (data) => {
    const sportTotals = {};
    data.forEach((cityData) => {
      const sportName = cityData.sport;
      const cityName = cityData.cities;
      cityData.cities.forEach((academy) => {
        academy.academies.forEach((sportData) => {
          if (!sportTotals[sportName]) {
            sportTotals[sportName] = 0;
          }
          sportTotals[sportName] += sportData?.cnt;
        });
      });
    });
    setStatusCounts(sportTotals);
  }

  const handleToggleChange = () => {
  };
  const handleSearchChange = (event) => {

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
    openUrl ?
      <InfoTable onClose={addUrlClose} /> : openCity ? <CityTable onClose={addCityClose} /> :
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
                  <div>
                    <select
                      className="selectSec"
                      onChange={handleSelectChange}
                      value={selectedOption}
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="this_week">This Week</option>
                      <option value="last_week">Last Week</option>
                      <option value="last_seven_days">Last 7 days</option>
                      <option value="last_fourteen_days">Last 14 days</option>
                      <option value="last_twenty_eight_days">Last 28 days</option>
                      <option value="last_thirty_days">Last 30 days</option>
                      <option value="last_sixty_days">Last 60 days</option>
                    </select>
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
                  <button type="button" className="secondary-btn" onClick={addCityClick}>
                    City
                  </button>
                  <button type="button" className="secondary-btn" onClick={addUrlClick}>
                    Details
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
                </div>
              </div>
            </section>
            <section className="cards-body">
              {acadmeyLeads?.map((item, index) => (
                <div className="card-column" key={index}>
                  <div className="card-details">
                    <div className="main-cards">
                      <div className="cards-new">
                        <p className="DealName">
                          {item?.sport}({statusCounts[item.sport] || 0})
                        </p>
                      </div>
                      {item?.cities?.map((obj) => <AllLeadsCards obj={obj} sport={item?.sport} getAllLeads={getAllLeads} />)}
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <ToastContainer />
          </div>
        </>
  );
};

export default AllLeads;
