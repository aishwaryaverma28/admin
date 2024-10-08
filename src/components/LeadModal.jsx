import React, { useState, useEffect } from "react";
import { ADD_BMP_LEADS, EMAIL_PHONE, SEARCH_API, GET_ACADEMY, getDecryptedToken } from "./utils/Constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadModal = ({ onClose, getData }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [academyName, setAcademyName] = useState("");
  const [formData, setFormData] = useState({
    object_type: "academy",
    address: "",
    email: "",
    object_id: null,
    name: "",
    phone: "",
    description: "",
    source: "whatsapp",
    loc_id: null,
    sport_id: null,
    lat: "",
    lng: "",
  });
  const [phoneRed, setPhoneRed] = useState(false);
  const [emailRed, setEmailRed] = useState(false);

  useEffect(() => {
    if (formData?.object_id) {
      let apiCall;
      if (formData.object_type === "academy") {
        apiCall = axios.post(GET_ACADEMY, { academy_id: formData?.object_id }, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        });
      } else if (formData.object_type === "coach") {
        apiCall = axios.get(`${SEARCH_API}bmp_coach_details/id/${formData?.object_id}`, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        });
      } else if (formData.object_type === "player") {
        apiCall = axios.get(`${SEARCH_API}bmp_player_details/id/${formData?.object_id}`, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        });
      }

      if (apiCall) {
        apiCall
          .then((response) => {
            const data = response?.data?.data[0];
            setAcademyName(data);
            setFormData(prevState => ({
              ...prevState,
              loc_id: data?.loc_id,
              sport_id: data?.sport_id,
              lat: data?.lat,
              lng: data?.lng,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [formData?.object_id, formData?.object_type]);

  useEffect(() => {
    if (formData?.phone) {
      axios
        .post(EMAIL_PHONE, { field: formData?.phone, type: "mobile" }, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          if (response?.data?.status === 1) {
            setPhoneRed(true);
          } else {
            setPhoneRed(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData?.phone]);

  useEffect(() => {
    if (formData?.email) {
      axios
        .post(EMAIL_PHONE, { field: formData?.email, type: "email" }, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          if (response?.data?.status === 1) {
            setEmailRed(true);
          } else {
            setEmailRed(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData?.email]);

  const capitalizeFirstLetterOfEachWord = (string) => {
    return string?.replace(/\b\w/g, char => char?.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "name") {
      updatedValue = capitalizeFirstLetterOfEachWord(updatedValue);
    } else if (name === "email") {
      updatedValue = updatedValue?.toLowerCase();
    }

    setFormData((prev) => {
      return { ...prev, [name]: updatedValue };
    });
    setStateBtn(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = {
      object_type: formData?.object_type,
      object_id: formData?.object_id?.trim(),
      name: formData?.name?.trim(),
      phone: formData?.phone?.trim(),
      address: formData?.address?.trim(),
      email: formData?.email?.trim(),
      description: formData?.description?.trim(),
      source: formData?.source,
      sport_id: formData?.sport_id,
      loc_id: formData?.loc_id,
      lat: formData?.lat,
      lng: formData?.lng,
    };
    console.log(updatedFormData);
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 6);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    axios
      .post(ADD_BMP_LEADS, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
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
            address: "",
            email: "",
            description: "",
            source: "whatsapp",
            loc_id: null,
            sport_id: null,
            lat: "",
            lng: "",
          });
          setStateBtn(0);
          setEmailRed(false);
          setPhoneRed(false);
          setAcademyName("");
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
  };

  const handleCancel = () => {
    setFormData({
      object_type: "academy",
      object_id: "",
      name: "",
      phone: "",
      address: "",
      email: "",
      source: "whatsapp",
      loc_id: null,
      sport_id: null,
      description: "",
      lat: "",
      lng: "",
    });
    setStateBtn(0);
  };

  return (
    <>
      <div className="help-modal-container lead_modal_input">
        <div className="leftCreateClose2" onClick={onClose}></div>
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog"> Add a new Lead</p>
            </header>

            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Name </p>
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
                  <p className="helpTitle">Email</p>
                  <input
                    type="email"
                    placeholder="Enter Lead Email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    className={`common-input ${emailRed ? "red-border" : ""}`}
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Phone </p>
                  <input
                    type="text"
                    placeholder="Enter Lead Phone"
                    name="phone"
                    value={formData?.phone}
                    className={`common-input ${phoneRed ? "red-border" : ""}`}
                    onChange={handleChange}
                  ></input>
                </div>

                <div>
                  <p className="helpTitle">Address</p>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Source</p>
                  <select
                    name="object_type"
                    id=""
                    className="common-select"
                    onChange={handleChange}
                    value={formData?.source}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="website">Website</option>
                  </select>
                </div>
                <div className="lead_text_area">
                  <p className="helpTitle">Description</p>
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
                    <select
                      name="object_type"
                      id=""
                      className="common-select reduce-width"
                      onChange={handleChange}
                      value={formData?.object_type}
                    >
                      <option value="academy">Academy</option>
                      <option value="player">Player</option>
                      <option value="coach">Coach</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  <div>
                    <p className="helpTitle">Academy/Coach Id</p>
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
            <br />
            {academyName ? (
              <div className="academy_new_box">
                <p className="common-fonts academy_name_style">
                  {academyName?.name}, {academyName?.city}, {academyName?.state}
                </p>
              </div>
            ) : (
              <></>
            )}
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
