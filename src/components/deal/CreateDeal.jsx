import React, { useState } from "react";
import axios from "axios";
import { ADD_LEAD, getDecryptedToken } from "../utils/Constants";
import { countryPhoneCodes, worldCurrencies } from "../utils/CodeCurrency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rectangleFill from "../../assets/image/Rectangle 70 Fill.svg";
import rectangle from "../../assets/image/Rectangle 70.svg";
import rectangle71 from "../../assets/image/Rectangle 71.svg";
import rectangle74 from "../../assets/image/Rectangle 74.svg";

const CreateDeal = ({ isOpen, onClose, onLeadAdded, mergedLabels }) => {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [isDisable, setIsDisable] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [leadData, setLeadData] = useState({
    position: "",
    lead_name: "",
    company_name: "",
    registration_no: "",
    employees: "",
    type: "",
    phone: "",
    email: "",
    value: 0,
    label_id: 0,
    source: "",
  });

  if (!isOpen) {
    return null;
  }

  function handleChangeName(event) {
    setIsDisable(false);
    const empName = event.target.value;
    setName(empName);
    let arr = empName.split(" ");
    if (arr.length >= 1) {
      setfName(arr[0]);
      setlName(arr[arr.length - 1]);
    }
  }

  function handleStatus(status) {
    setStatus(status);
    setIsDisable(false);
    setSelectedStatus(status);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({ ...prevState, [name]: value }));
    setIsDisable(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...leadData,
      first_name: fname,
      last_name: lname,
      status: status,
    };

    axios
      .post(ADD_LEAD, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Lead data added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setLeadData({
          position: "",
          lead_name: "",
          company_name: "",
          registration_no: "",
          employees: "",
          type: "",
          phone: "",
          email: "",
          value: 0,
          label_id: 0,
          source: "",
        });
        setName("");
        onLeadAdded(); // Call the onLeadAdded function from props
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div class="create-lead-top">
          <p>Create Deal</p>
          <p className="close-icon" onClick={onClose}>
            &times;
          </p>
        </div>
        <div className="create-lead-form">
          <form>
            <section class="form-area">
              <div className="form-section-1">
                <label htmlFor="lead_name" className="lead-label">
                  Title
                </label>
                <input
                  id="lead_name"
                  type="text"
                  name="lead_name"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.lead_name} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="company_name">
                  organization
                </label>
                <input
                  id="company_name"
                  type="text"
                  name="company_name"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.company_name} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="name">
                  Deal Owner
                </label>
                <input
                  id="name"
                  type="text"
                  className="lead-input"
                  placeholder="Please Enter Name"
                  onChange={handleChangeName}
                  value={name} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="value">
                  Value
                </label>
                <div className="currency-section">
                  <input
                    id="value"
                    type="text"
                    className="currency-input"
                    name="value"
                    onChange={handleChange}
                    value={leadData.value} // Add value prop for controlled input
                  />
                  <select name="" id="" className="currency-value">
                    {worldCurrencies.map((currency, index) => (
                      <option key={index} value={currency.code}>
                        {`${currency.code} ${currency.currency}`}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="lead-label" htmlFor="position">
                  Probability
                </label>
                <input
                  id="position"
                  type="text"
                  className="lead-input"
                  name=""
                  // onChange={handleChange}
                />
                <label className="lead-label" htmlFor="source">
                  Expected Closing Date
                </label>
                <input
                  id="source"
                  type="date"
                  className="lead-input"
                  name="source"
                  onChange={handleChange}
                  value={leadData.source} // Add value prop for controlled input
                />
              </div>

              <div className="form-section-2">
                <label className="lead-label" htmlFor="phone">
                  Phone Number
                </label>
                <div className="phone-input-section">
                  {/* <select name="" id="" class="country-code">
                  {countryPhoneCodes.map((countryPhoneCode) => (
                    <option
                      key={countryPhoneCode.code}
                      value={countryPhoneCode.code}
                    >
                      {`${countryPhoneCode.code} ${countryPhoneCode.country}`}
                    </option>
                  ))}
                </select> */}
                  <input
                    id="phone"
                    className="phone-input"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    value={leadData.phone} // Add value prop for controlled input
                  />
                </div>

                <label className="lead-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="lead-input email-case"
                  onChange={handleChange}
                  value={leadData.email} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="label_id">
                  Lables
                </label>
                <select
                  name="label_id"
                  id="label_id"
                  className="lead-priority"
                  onChange={handleChange}
                >
                  {mergedLabels.map((item) => {
                    return (
                      <option key={item?.id} value={item?.id}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </section>

            <section>
              <div className="lead-status">
                <p>Deal Stage</p>
                <div className="elements">
                <img
                      src={rectangleFill}
                      alt=""
                    />
                    <img
                      src={rectangle71}
                      alt=""
                    />
                    <img
                      src={rectangle71}
                      alt=""
                    />
                    <img
                      src={rectangle71}
                      alt=""
                    />
                    <img
                      src={rectangle71}
                      alt=""
                    />
                    <img
                      src={rectangle74}
                      alt=""
                    />
                </div>
              </div>
            </section>

            <section className="bottom-section font-style">
              <div>
                <button className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>

              <div>
                {/* <button className="add-btn">Create And Add another</button> */}
                <button
                  className={
                    isDisable ? "common-inactive-button" : "create-lead-btn"
                  }
                  onClick={handleSubmit}
                  disabled={isDisable}
                >
                  Create Deal
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateDeal;
