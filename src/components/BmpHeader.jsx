import React, { useState, useEffect, useRef, useContext } from "react";
import { LPContext } from "./LPContext";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./styles/LPheader.css";
import line from "../assets/image/Line.png";
import user from "../assets/image/user-img.png";
import logo_bmp from "../assets/image/logo_bmp.svg";
import axios from "axios";
import {
  BMP_USER,
  getDecryptedToken,
  getDecryptedUserPath,
} from "./utils/Constants";
import HelpModal from "./HelpModal";
import NotificationModal from "./NotificationModal.jsx";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/userInfoSlice.js";
import ChangePassword from "./ChangePassword.jsx";
const BmpHeader = () => {
  const { name } = useContext(LPContext);
  const landingUrl = localStorage.getItem("landingUrl");
  const userId = localStorage.getItem("id");
  const academyId = localStorage.getItem("academy_id");
  const role_name = localStorage.getItem("role_name");
  const url = localStorage.getItem("url");
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [clientData, setClientData] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [pathAddress, setPathAddress] = useState(null);
  const [modal, setModal] = useState(false);
  // const decryptedToken = getDecryptedToken();
  const decryptedUserPath = getDecryptedUserPath();
  const [number, setNumber] = useState(null);
  let allowed = decryptedUserPath.split(",");
  if (landingUrl === "/lp/admin") {
    allowed = allowed.filter((path) => path !== "/lp/home");
  } else if (landingUrl === "/lp/home") {
    allowed = allowed.filter((path) => path !== "/lp/admin");
  }

  useEffect(() => {
    if (landingUrl === "/lp/admin") {
      setPathAddress("/lp/settings/viewProfile/employeeProfile");
    } else {
      setPathAddress("/lp/settings/general");
    }
  }, []);

  const openModal = () => {
    setModal(true);
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleBell = () => {
    setIsNotifyModalOpen(true);
  };
  const handleBellCLose = () => {
    setIsNotifyModalOpen(false);
  };

  async function getBMPUser() {
    let body = {};
    // if(role_name === "Academy Admin")
    // {
    // body =  {
    //   userId: userId,
    // }}else{
    //   body =  {
    //     userId: academyId,
    //   }
    // }
    body = {
      userId: userId,
    };
    try {
      const response = await axios.post(BMP_USER, body
      //   , {
      //   headers: {
      //     Authorization: `Bearer ${decryptedToken}`,
      //   },
      // }
      );
      const data = response?.data?.user;
      // console.log(data);
      localStorage.setItem("org_id", data.org_id);
      if (response.data.status === 1) {
        setClientData(data);
        setNumber(1);
        dispatch(addItem(data));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Invalid or expired token.") {
        alert(error?.response?.data?.message);
        handleLogout();
      }
    }
  }

  useEffect(() => {
    getBMPUser();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleHelpModalOpen = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    // window.location.href = "https://www.bookmyplayer.com/login";
    window.location.href = "https://www.bookmyplayer.com/front/logout";
  };
  const handleViewSite = (e) => {
    e.preventDefault();
    const siteUrl = url;
    if (siteUrl) {
      window.open(siteUrl, "_blank");
    } else {
      alert("Site URL is not available");
    }
  };

  return (
    <>
      <div className="nav">
        <div className="navHeader">
          <img src={logo_bmp} alt="" className="BMPlogo" />
        </div>
        <div className="navBtn">
          <label htmlFor="navCheck" onClick={handleNavToggle}>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <input type="checkbox" id="navCheck" checked={isNavOpen} />
        <div className={`navLinks ${isNavOpen ? "open" : ""}`}>
          <div className="searchBox">
            <button className="searchBtn">
              <i className="fas fa-search"></i>
            </button>
            <input
              className="searchInput"
              type="text"
              placeholder="Search lead, contact and more"
            />
          </div>
          <div>
            <button type="button" className="plusBtn" title="Create Lead">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <ul className="icons">
            <li>
              <button type="button" className="bellBtn" title="Notification">
                <i className="far fa-bell" onClick={handleBell}></i>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="helpBtn"
                title="Help"
                onClick={handleHelpModalOpen}
              >
                <i className="far fa-question-circle"></i>
              </button>
            </li>
            <li>
              <Link to={pathAddress}>
                <button type="button" className="settingBtn" title="Settings">
                  <i className="fa-sharp fa-solid fa-gear"></i>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="userDropdownContainer" ref={dropdownRef}>
          <div className="userImg" onClick={toggleDropdown}>
            <img className="borderLeft" src={line} alt="border-left" />
            <img src={user} alt="user" />
            {clientData ? (
              <p>
                {number === 0
                  ? `${clientData?.first_name} ${clientData?.last_name}`
                  : `${clientData?.name}`}
                <br />
                <span>{clientData?.type}</span>
              </p>
            ) : (
              <p>
                John Wick
                <br />
                <span>admin</span>
              </p>
            )}
          </div>
          {isOpen && (
            <div className="logoutDropdown">
              <div className="logUserInfo">
                <img src={user} alt="user" />
                <div className="crmUserInfo">
                  <h5 className="crmUserInfoName">
                    {number === 0
                      ? `${clientData?.first_name} ${clientData?.last_name}`
                      : `${clientData?.name}`}
                  </h5>
                  <p className="email-case">{clientData?.email}</p>
                  {landingUrl === "/lp/bmp/overview" ||
                  landingUrl === "/lp/bmp/admin" ? (
                    <p>{clientData?.type}</p>
                  ) : (
                    <p>{clientData?.job_title}</p>
                  )}
                </div>
              </div>
              {landingUrl === "/lp/bmp/overview" ? (
                <div className="profileNPref" onClick={handleViewSite}>
                  View Profile
                </div>
              ) : (
                <></>
              )}

              <div className="pass_flex">
                <div className="userId">
                  User Id:{" "}
                  {landingUrl === "/lp/bmp/overview" ||
                  landingUrl === "/lp/bmp/admin"
                    ? clientData?.id
                    : 123456789}
                </div>
                <p className="common-fonts" onClick={openModal}>
                  Change Password
                </p>
              </div>

              <div className="userId new_li">
                <p>Invite & earn rewards</p>
                <p>Account & Billing </p>
                <p>Price & Features</p>
                <p>Training & Services</p>
                <p>About this application</p>
              </div>
              <div className="signOutDiv">
                <p onClick={handleLogout}>Sign Out</p>
                <p>Privacy policy</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Top Navigation End  */}

      {isHelpModalOpen && <HelpModal onClose={closeHelpModal} />}
      {isNotifyModalOpen && <NotificationModal onClose={handleBellCLose} />}

      {modal && <ChangePassword onClose={closeModal} />}
    </>
  );
};

export default BmpHeader;
