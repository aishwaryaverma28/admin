import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_CITY, getDecryptedToken } from "../utils/Constants";
const AddCity = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0)
  const [formData, setFormData] = useState({
    locality_name: "",
    locality: "",
    city: "",
    state: "",
    city_id: "",
    lat: "",
    lng: "",
    type: "",
    country: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setStateBtn(1);
  };
  const handleCancel = () => {

  }
  const handleSubmit = () => {
    const updatedFormData = {
      locality_name: formData?.locality_name?.trim(),
      locality: formData?.locality?.trim(),
      city: formData?.city?.trim(),
      state: formData?.state?.trim(),
      city_id: formData?.city_id?.trim(),
      lat: parseFloat(formData?.lat?.trim()),
      lng: parseFloat(formData?.lng?.trim()),
      type: formData?.type?.trim(),
      country: formData?.country?.trim(),
      postcode: formData?.postcode?.trim(),
    }
    axios
      .post(ADD_CITY, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response)
        if (response?.data?.status === 1) {
          toast.success("City added successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setFormData({
            locality_name: "",
            locality: "",
            city: "",
            state: "",
            city_id: "",
            lat: "",
            lng: "",
            type: "",
            country: "",
            postcode: "",
          })
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
        <div className="leftCreateClose2" onClick={onClose}></div>
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog"> Add City</p>
            </header>
            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Locality Name <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter Locality Name"
                    name="locality_name"
                    value={formData?.locality_name}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Locality<span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter Locality"
                    name="locality"
                    value={formData?.locality}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">City <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    value={formData?.city}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">State <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter State"
                    name="state"
                    value={formData?.state}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">City Id <span className="common-fonts redAlert"> *</span> </p>
                  <input
                    type="number"
                    placeholder="Enter City Id"
                    name="city_id"
                    value={formData?.city_id}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Latitude <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter Latitude"
                    name="lat"
                    value={formData?.lat}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Longitude <span className="common-fonts redAlert"> *</span> </p>
                  <input
                    type="text"
                    placeholder="Enter Longitude"
                    name="lng"
                    value={formData?.lng}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Type <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter Type"
                    name="type"
                    value={formData?.type}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Country <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={formData?.country}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">PostCode <span className="common-fonts redAlert"> *</span></p>
                  <input
                    type="number"
                    placeholder="Enter postcode"
                    name="postcode"
                    value={formData?.postcode}
                    onChange={handleChange}
                    className="common-input"
                  ></input>
                </div>
              </div>
            </div>
            <div className="city-bottom-btn">
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

export default AddCity;
