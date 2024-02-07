import React, { useState } from "react";
import { ADD_BMP_LEADS, getDecryptedToken } from "./utils/Constants";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadModal = ({ onClose, getData }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [formData, setFormData] = useState({
    object_type: "academy",
    object_id: "",
    name: "",
    phone: "",
    description: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    setStateBtn(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
    };
    console.log(updatedFormData);
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];
    axios
      .post(ADD_BMP_LEADS, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.status !== false) {
          toast.success("Lead data added successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setFormData({
            object_type: "academy",
            object_id: "",
            name: "",
            phone: "",
            description: ""
          });
          setStateBtn(0);
          getData(startDate, endDate);
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancel() {
    setFormData({
      object_type: "",
      object_id: "",
      name: "",
      phone: "",
      description: ""
    });
    setStateBtn(0);
  }

  return (
    <>
      <div className="help-modal-container lead_modal_input">
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog"> Add a new Lead</p>
            </header>

            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Name</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Object Type</p>
                  <select name="object_type" id="" className="common-select" onChange={handleChange} value={formData?.object_type}>
                    <option value="academy">Academy</option>
                    <option value="player">Player</option>
                    <option value="coach">Coach</option>
                  </select>
                </div>
                <div>
                  <p className="helpTitle">Academy Id</p>
                  <input
                    type="text"
                    placeholder="Enter Academy Id"
                    name="object_id"
                    value={formData?.object_id}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Phone</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Phone"
                    name="phone"
                    value={formData?.phone}
                    className="common-input"
                    onChange={handleChange}
                  ></input>
                </div>

                <div className="lead_text_area">
                  <p className="helpTitle">
                    Description
                  </p>
                  <textarea
                    name="description"
                    type="textarea"
                    rows="3"
                    cols="3"
                    placeholder="Enter Lead Description"
                    className="common-input"
                    value={formData?.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* <div>
                  <p className="helpTitle">Type</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Type"
                    name="object_type"
                    value={formData?.object_type}
                    className="common-input"
                    onChange={handleChange}
                  ></input>
                </div> */}

                {/* <div>
                  <p className="helpTitle">Refer</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Refer"
                    name="name"
                    className="common-input"
                    onChange={handleChange}
                  ></input>
                </div> */}
              </div>
            </div>

            <div className="help-bottom-btn">
              <button className="common-fonts common-delete-button" onClick={handleCancel}>
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn" disabled>
                  Save
                </button>
              ) : (
                <button className="common-fonts common-save-button help-save" onClick={handleSubmit}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default LeadModal;
