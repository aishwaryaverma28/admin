import React, { useEffect, useState } from "react";
import "../styles/LPSetting.css";
import "../styles/bmp.css";
import { NavLink, useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/image/arrow-left.svg";
import Whatsapp from "../../assets/image/whatsapp.svg";
import axios from "axios";
import {
  GET_ACADEMY
} from "../utils/Constants";

const BmpSidebar = () => {
  const userRole = localStorage.getItem("role_name");
  const navigate = useNavigate();
  const id = localStorage.getItem("academy_id");
  const newId = localStorage.getItem("id");
  // console.log(newId)
const [details, setDetails]= useState(null);
  const handleBackToTable = () => {
    localStorage.removeItem("academy_id");
    navigate("/lp/bmp/admin");
  };



  const academyDetails = () => {
    axios
      .post(GET_ACADEMY, { academy_id: newId }
      //   , {
      //   headers: {
      //     Authorization: `Bearer ${decryptedToken}`,
      //   },
      // }
      )
      .then((response) => {
        console.log(response?.data?.data);
        setDetails(response?.data?.data[0])
    })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    academyDetails();
  }, []);

const sendWhatsAppMessage = () => {
  const message = `I need more details for ${userRole} ${details.name} ${details.url}`;
  const phoneNumber = "+447979100801";
  // const phoneNumber = "+917558269998";
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, "_blank");
};
  return (
    <>
    <section className="setting-side-panel">
      {userRole === "Academy_admin" && (
        <div className="back-to-user general-refresh blog-back">
          <button className="common-fonts" onClick={handleBackToTable}>
            <img src={LeftArrow} alt="" />
            <span>Back To Table</span>
          </button>
        </div>
      )}
      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        Profile
      </p>
      <p className="prefrence-options setting-font-style">

      {
        userRole === "Academy_admin" ? (
          <NavLink exact to={`/lp/bmp/overview/${id}`}>
          Overview
        </NavLink>
        ) : (
          <NavLink exact to={`/lp/bmp/overview`}>
          Overview
        </NavLink>
        )
      }
      </p>
      {/* <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/fees">
          Fees and Batches
        </NavLink>
      </p> */}
      {/* <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/training">
          Training Strategy
        </NavLink>
      </p> */}
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/gallery">
          Photos & Video
        </NavLink>
      </p>

      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        System
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/leads">
          Leads
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/reviews">
          Reviews
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/approval">
          Approval Status
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/support">
          Contact Support
        </NavLink>
      </p>
      {/* <p className="prefrence-options setting-font-style">
        <NavLink exact to="/lp/bmp/help">
          Help
        </NavLink>
      </p> */}
      
    <div className="whatsapp_btn" onClick={sendWhatsAppMessage}>
     <img src={Whatsapp} loadaing="lazy" alt="loading" width="14" height="14"></img>
    </div>
    </section>

    </>
  );
};

export default BmpSidebar;
