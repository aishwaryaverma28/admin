import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADD_DEAL, getDecryptedToken } from "../utils/Constants";
import { countryPhoneCodes, worldCurrencies } from "../utils/CodeCurrency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import rectangleFill from "../../assets/image/Rectangle 70 Fill.svg";
// import rectangle from "../../assets/image/Rectangle 70.svg";
// import rectangle71 from "../../assets/image/Rectangle 71.svg";
// import rectangle74 from "../../assets/image/Rectangle 74.svg";

const CreateDeal = ({ isOpen, onClose, onLeadAdded, mergedLabels, selectedItem, stages, newStatus }) => {
  const [status, setStatus] = useState("enquiry_received");
  // const [name, setName] = useState("");
  // const [fname, setfName] = useState("");
  // const [lname, setlName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [isDisable, setIsDisable] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [leadData, setLeadData] = useState({
    probability: "",
    deal_name: "",
    organization: "",
    mobile: "",
    email: "",
    value: 0,
    label_id: 0,
    closure_date: "",
    status: "enquiry_received",
    pipeline_id: 1,
    lead_id: 0,
  });

  useEffect(() => {
    if (selectedItem) {
      setLeadData({
        lead_id: selectedItem.id,
        deal_name: selectedItem.lead_name,
        organization: selectedItem.company_name,
        mobile: selectedItem.phone,
        email: selectedItem.email,
        value: selectedItem.value,
        label_id: selectedItem.label_id,
        status: selectedItem.status,
        pipeline_id: 1,
      });
    }
  }, [selectedItem]);

  if (!isOpen) {
    return null;
  }

  // function handleChangeName(event) {
  //   setIsDisable(false);
  //   const empName = event.target.value;
  //   setName(empName);
  //   let arr = empName.split(" ");
  //   if (arr.length >= 1) {
  //     setfName(arr[0]);
  //     setlName(arr[arr.length - 1]);
  //   }
  // }

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
    const updateData = {
      ...leadData,
      status: status,
    };
    axios
      .post(ADD_DEAL, updateData, {
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
          probability: "",
          deal_name: "",
          organization: "",
          mobile: "",
          email: "",
          value: 0,
          label_id: 0,
          closure_date: "",
          status: "enquiry_received",
          pipeline_id: 1,
          lead_id: 0,
        });
        // setName("");
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
                <label htmlFor="deal_name" className="lead-label">
                  Title
                </label>
                <input
                  id="deal_name"
                  type="text"
                  name="deal_name"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.deal_name} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="organization">
                  organization
                </label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.organization} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="name">
                  Deal Owner
                </label>
                <input
                  id="name"
                  type="text"
                  className="lead-input"
                  placeholder="Please Enter Name"
                // onChange={handleChangeName}
                // value={name} // Add value prop for controlled input
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
                    value={leadData.value}
                  />
                  <select name="" id="" className="currency-value">
                    {worldCurrencies.map((currency, index) => (
                      <option key={index} value={currency.code}>
                        {`${currency.code} ${currency.currency}`}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="lead-label" htmlFor="probability">
                  Probability
                </label>
                <input
                  id="probability"
                  type="text"
                  className="lead-input"
                  name="probability"
                  onChange={handleChange}
                  value={leadData.probability}
                />
                <label className="lead-label" htmlFor="pipeline_id">
                  Pipeline
                </label>
                <select className="lead-input">
                  <option value=""></option>
                  <option value=""></option>
                </select>
                <label className="lead-label" htmlFor="closure_date">
                  Expected Closing Date
                </label>
                <input
                  id="closure_date"
                  type="date"
                  className="lead-input"
                  name="closure_date"
                  onChange={handleChange}
                  value={leadData.closure_date}
                />
              </div>

              <div className="form-section-2">
                <label className="lead-label" htmlFor="mobile">
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
                    id="mobile"
                    className="phone-input"
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    value={leadData.mobile}
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
                  value={leadData.email}
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
                <label className="lead-label" htmlFor="label_id">
                  Stages
                </label>
                <select
                  name="label_id"
                  id="label_id"
                  className="lead-priority"
                  onChange={handleChange}
                >

                  {stages?.map((item, index) => {
                    return (
                      <option key={index} value={newStatus?.[index]}>
                        {item}
                      </option>
                    );
                  })}

                </select>

              </div>
            </section>

            <section>
              <div className="lead-status">
                <p>Deal Stage</p>
                {/* <div className="elements">
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
                </div> */}
                {/* <div className="elements">
                  <span
                    className={`status-value new-element ${selectedStatus === "New" ? "selected-status" : ""}`}
                    onClick={() => handleStatus("New")}
                  >
                    <span>New</span>
                  </span>
                  <span
                     className={`status-value open-element ${selectedStatus === "Open" ? "selected-status" : ""}`}
                    onClick={() => handleStatus("Open")}
                  >
                    <span>Open</span>
                  </span>
                  <span
                    className={`status-value progress-element ${selectedStatus === "In Progress" ? "selected-status" : ""}`}
                    onClick={() => handleStatus("In Progress")}
                  >
                    <span>In Progress</span>
                  </span>
                  <span
                     className={`status-value deal-element ${selectedStatus === "Open Deal" ? "selected-status" : ""}`}
                    onClick={() => handleStatus("Open Deal")}
                  >
                    <span>Open Deal</span>
                  </span>
                  <span
                    className={`status-value unread-element ${selectedStatus === "Unread" ? "selected-status" : ""}`}
                    onClick={() => handleStatus("Unread")}
                  >
                    <span>unread</span>
                  </span>
                </div> */}
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
