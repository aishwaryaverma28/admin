import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADD_DEAL, getDecryptedToken, GET_LABEL } from "../utils/Constants";
import { countryPhoneCodes, worldCurrencies } from "../utils/CodeCurrency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateDeal = ({ isOpen, onClose, onLeadAdded, selectedItem}) => {
  const stages = [
    "Enquiry received",
    "contact made",
    "illustration sent",
    "all docs received",
    "compliance",
    "sourced",
    "application received",
    "valuation",
    "formal offer",
    "compliance check",
    "legal",
    "completion"
  ];
  const status = [
    "enquiry_received",
    "contact_made",
    "illustration_sent",
    "all_docs_received",
    "compliance",
    "sourced",
    "application_received",
    "valuation",
    "formal_offer_sent",
    "compliance_check",
    "legals",
    "completion"
  ];

  // const [name, setName] = useState("");
  // const [fname, setfName] = useState("");
  // const [lname, setlName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [isDisable, setIsDisable] = useState(true);
  const [labelData, setLabelData] = useState([]);
const navigate = useNavigate();
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
        pipeline_id: 1,
      });
    }
  }, [selectedItem]);

  const fetchLabelData = async () => {
    try {
      const response = await axios.get(GET_LABEL, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });
      if (response.data.status === 1) {
        setLabelData(response.data.data);
      } else {
        if (response.data.message === "Token has expired") {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLabelData();
  }, []);


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({ ...prevState, [name]: value }));
    setIsDisable(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post(ADD_DEAL, leadData, {
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
        onLeadAdded();
        navigate("/lp/deals");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mergedLabels = labelData
  .filter((item) => item?.entity?.includes("deals"))
  .map((item) => ({
    id: item?.id,
    name: item?.name,
    colour_code: item?.colour_code,
  }));

  
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
                    type="number"
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
                <label className="lead-label" htmlFor="status">
                  Stages
                </label>
                <select
                  name="status"
                  id="status"
                  className="lead-priority"
                  onChange={handleChange}
                >

                  {stages?.map((item, index) => {
                    return (
                      <option key={index} value={status?.[index]}>
                        {item}
                      </option>
                    );
                  })}

                </select>

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
