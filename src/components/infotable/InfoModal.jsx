import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfoModal = ({ onClose }) => {


  return (
    <>
      <div className="help-modal-container lead_modal_input">
        <div className="leftCreateClose2" onClick={onClose}></div>
        <div className="help-modal-box">

        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default InfoModal;
