import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
import {
  ALL_BMP_USER,GET_ARCHIVED,
  ACADMEY_VEREFIED,
  GET_COACH,SEARCH_API,
  getDecryptedToken,
} from "../utils/Constants.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeadCards from "../lead/LeadCards.jsx";
import AddPlayer from "./AddPlayer.jsx";
import DashboardCards from "../dashboard/DashboardCards.jsx";
import PlayerCard from "./PlayerCard.jsx";

const Player = () => {
  const [stages, setStages] = useState([
    {
      "id": 0,
      "stage": "player",
      "name": "Player"
    },
    {
      "id": 1,
      "stage": "new_player",
      "name": "New Player"
    },
      {
        "id": 2,
        "stage": "verified_player",
        "name": "Verified Player"
      },
      {
        "id": 3,
        "stage": "archive",
        "name": "Archive Player"
      },
  ]);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [player, setPlayer] = useState([]);
  const [newplayer, setNewPlayer] = useState([]);
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const decryptedToken = getDecryptedToken();
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [verified, setVerified] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const limit = 30;
  const [archCount, setArchCount] = useState(null);
  const [unArchCount, setUnArchCount] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //=========================================================get all players
  const getNewAcademy = (page, limit) => {
    const body = {
      page: page,
      limit: limit,
      sort: "id desc",
      cond: "is_deleted is null",
      tbl: "bmp_player_details"
    }
    axios.post(GET_ARCHIVED, body, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setNewPlayer(response?.data?.data?.result)
      setUnArchCount(response?.data?.data?.count_result[0]?.unarchive);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getDeletedAcademy = (page2, limit) => {
    const body = {
      page: page2,
      limit: limit,
      sort: "id desc",
      cond: "is_deleted =1",
      tbl: "bmp_player_details"
    }
    axios.post(GET_ARCHIVED, body, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      setDeleted(response?.data?.data?.result);
      setArchCount(response?.data?.data?.count_result[0]?.archive);
    }).catch((error) => {
      console.log(error);
    });
  }
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

  const getAllVerify = () => {
    const requestBodyBoth = {
      "condition": "both",
      "entity": "player"
    };

    const requestBodyAnyone = {
      "condition": "anyone",
       "entity": "player"
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
    getAllPlayers();
    getNewAcademy(page, limit);
    getDeletedAcademy(page2, limit);
    getAllVerify();
  }, []);

  useEffect(() => {
    const counts = {
      player: player?.length,
      new_player: unArchCount,
      archive: archCount,
      verified_player: verified?.length,
    };
    setStatusCounts(counts);
  }, [player, newplayer, verified]);

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value?.length === 0) {
      getAllPlayers();
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      apiUrl = toggleChecked
        ? `${SEARCH_API}bmp_player_details/id/${value}`
        : `${SEARCH_API}bmp_player_details/global/${value}`;
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setPlayer(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const resetData = () => {
    getAllPlayers();
    getNewAcademy(page, limit);
    getDeletedAcademy(page2, limit);
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

  const addPage = (name) => {
    let num = page
    let num2 = page2
    if (name === "new_player") {
      num = num + 1;
      setPage(num);
      getNewAcademy(num, limit);
    } else if (name === "archive") {
      num2 = num2 + 1;
      setPage2(num2);
      getDeletedAcademy(num2, limit);
    }
  }
  const subPage = (name) => {
    let num = page;
    let num2 = page2;
    if (name === "new_player") {
      if (num > 1) {
        num = num - 1;
        setPage(num);
        getNewAcademy(num, limit);
      }
    }
    if (name === "archive") {
      if (num2 > 1) {
        num2 = num2 - 1;
        setPage2(num2);
        getDeletedAcademy(num2, limit);
      }
    }
  };

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
                Add Player
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
                      case 'player':
                        return player?.map((obj) => (
                          <LeadCards
                            key={obj?.id}
                            object={obj}
                            onLeadAdded={getAllPlayers}
                            itemName={"player"}
                          />
                        ));
                      case 'new_player':
                        return newplayer?.map((obj) => (
                          <DashboardCards
                            key={obj?.id}
                            object={obj}
                            onLeadAdded={getNewAcademy}
                              page={page}
                              limit={limit}
                              itemName="unarcPlayer"
                          />
                        ));
                        case 'archive':
                          return deleted?.map((obj) => (
                            <DashboardCards
                              key={obj?.id}
                              object={obj}
                              onLeadAdded={getDeletedAcademy}
                              page={page2}
                              limit={limit}
                              itemName="unarcPlayer"
                            />
                          ));
                        case 'verified_player':
                          return verified.map((obj) => (
                            <PlayerCard
                              key={obj?.id}
                              object={obj}
                              itemName={"verified_player"}
                            />
                          ));
                      default:
                        return null;
                    }
                  })()}

                </div>
                {(item?.stage === 'new_player' || item?.stage === 'archive') ?
                  <div className="bottom-fixed flexBox" >
                    <p onClick={() => subPage(item?.stage)}>Prev Page</p><p onClick={() => addPage(item?.stage)}>Next Page</p>
                  </div>
                  : <></>
                }
              </div>
            </div>
          ))}
        </section>
        {isModalOpen && (
          <AddPlayer
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Player