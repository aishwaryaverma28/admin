import React, { useState,useEffect } from "react";
import { UPDATE_LEADS,EMAIL_PHONE, GET_ACADEMY, getDecryptedToken } from "./utils/Constants";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateLead = ({ onClose, selectedLead, getData }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [academyName, setAcademyName] = useState("");
  const [sport, setSport] = useState(null);
  const [phoneRed, setPhoneRed] = useState(false);
  const [emailRed, setEmailRed] = useState(false);
  const [formData, setFormData] = useState({
    object_type: selectedLead.object_type,
    address: selectedLead.address,
    email: selectedLead.email,
    object_id: selectedLead.object_id,
    name: selectedLead.name,
    phone: selectedLead.phone,
    description: selectedLead.description,
    sport: selectedLead.sport,
    source: selectedLead.source === null ? 'whatsapp' : selectedLead.source,
  })
  useEffect(() => {
    if (formData.object_id) {
      axios
        .post(GET_ACADEMY, { academy_id: formData.object_id }
          , {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
        .then((response) => {
          setAcademyName(response?.data?.data[0]?.name);
          setSport(response?.data?.data[0]?.sport)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData.object_id]);
  useEffect(() => {
    if (formData.phone) {
      axios
        .post(EMAIL_PHONE, { field: formData.phone, type: 'mobile' }, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          if(response?.data?.status === 1){
            setPhoneRed(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData.phone]);

  useEffect(() => {
    if (formData.email) {
      axios
        .post(EMAIL_PHONE, { field: formData.email, type: 'email' }, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          if(response?.data?.status === 1)
          {
            setEmailRed(true)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData.email]);

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
    console.log(updatedFormData)
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    axios
      .put(UPDATE_LEADS + selectedLead.id, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.status !== false) {
          toast.success("Lead updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setStateBtn(0);
          getData(startDate, formattedEndDate);
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

  function handleDelete(event) {
    event.preventDefault();
    const updatedFormData = {
      is_deleted: 1
    };
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    axios
      .put(UPDATE_LEADS + selectedLead.id, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.status !== false) {
          toast.success("Lead updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setStateBtn(0);
          getData(startDate, formattedEndDate);
          onClose();
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
  function handleRevoke(event) {
    event.preventDefault();
    const updatedFormData = {
      is_deleted: 0
    };
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    axios
      .put(UPDATE_LEADS + selectedLead.id, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.status !== false) {
          toast.success("Lead updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setStateBtn(0);
          getData(startDate, formattedEndDate);
          onClose();
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

  return (
    <>
      <div className="help-modal-container lead_modal_input">
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog"> Update Lead</p>
            </header>

            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Name <span className="common-fonts redAlert"> *</span></p>
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
                  <p className="helpTitle">Phone <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter Lead Phone"
                    name="phone"
                    value={formData?.phone}
                    className={`common-input ${phoneRed ? 'red-border' : ''}`}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Email</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    className={`common-input ${emailRed ? 'red-border' : ''}`}
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Address</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Name"
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Source</p>
                  <select name="object_type" id="" className="common-select" onChange={handleChange} value={formData?.source}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="website">Website</option>
                  </select>
                </div>
                <div className="lead_text_area">
                  <p className="helpTitle">
                    Description
                    <span className="common-fonts redAlert"> *</span>
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
                <div className="lead-object-flex">
                  <div>
                    <p className="helpTitle">Object Type</p>
                    <select name="object_type" id="" className="common-select reduce-width" onChange={handleChange} value={formData?.object_type}>
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
                      className="common-input reduce-width"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div className="academy_new_box">
              <p className="common-fonts academy_name_style">{academyName}</p>
            </div>

            <div className="help-bottom-btn">
              {selectedLead.is_deleted === 1 ? <button className="common-fonts common-save-button" onClick={handleRevoke}>
                Revoke
              </button> : <button className="common-fonts common-delete-button" onClick={handleDelete}>
                Delete
              </button>}

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
  )
}

export default UpdateLead