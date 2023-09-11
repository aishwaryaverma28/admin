import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ELIGIBLE_LOANS,
  ADD_DEAL,
  getDecryptedToken,
  GET_LABEL,
  GET_ALL_STAGE,
  handleLogout,
} from "../utils/Constants";
import { countryPhoneCodes, worldCurrencies } from "../utils/CodeCurrency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateDeal = ({ isOpen, onClose, onLeadAdded, selectedItem }) => {
  const [stages, setStages] = useState([]);
  const [status, setStatus] = useState([]);
  const [stageId, setStageId] = useState([]);
  const [loan, setLoan] = useState([]);
  // const [name, setName] = useState("");
  // const [fname, setfName] = useState("");
  // const [lname, setlName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [isDisable, setIsDisable] = useState(true);
  const [labelData, setLabelData] = useState([]);
  const navigate = useNavigate();
  const [loanDetails, setLoanDetails] = useState({
    age_of_business: null,
    company_type: "",
    industry_type: "",
    turnover: null,
    location_of_company_or_individual:"",
    duration:"",
    individual_or_company:"",
    loan_amount: null,
    loan_type: "",
  });
  const [leadData, setLeadData] = useState({
    probability: "",
    deal_name: "",
    organization: "",
    mobile: "",
    email: "",
    // value: 0,
    label_id: 36,
    closure_date: "",
    stage_id: 1,
    pipeline_id: 1,
    lead_id: 0,
    age_of_business: 0,
    company_type: "",
    industry_type: "",
    turnover: 0,
    location_of_company_or_individual:"",
    duration:"",
    individual_or_company:"",
    loan_amount: 0,
    loan_type: "",
  });
  
  const fetchCall = () => {
    axios
      .get(ELIGIBLE_LOANS, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setLoan(response?.data?.data);
      })

      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
          handleLogout();
        }
      });
  };

  const fetchStages = () => {
    axios
      .get(GET_ALL_STAGE + "/deal", {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const stageNames = response?.data?.message?.map(
          (item) => item.display_name
        );
        const stageIdArray = response?.data?.message?.map((item) => item.id);

        if (stageNames && stageNames.length > 0) {
          setStages(stageNames.reverse());
          setStageId(stageIdArray.reverse());
        }
        const statusNames = response?.data?.message?.map(
          (item) => item.stage_name
        );
        if (statusNames && statusNames.length > 0) {
          setStatus(statusNames.reverse());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStages();
    fetchCall();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setLeadData({
        lead_id: selectedItem.id,
        deal_name: selectedItem.lead_name,
        organization: selectedItem.company_name,
        mobile: selectedItem.phone,
        email: selectedItem.email,
        // value: selectedItem.value,
        label_id: selectedItem.label_id,
        pipeline_id: 1,
        stage_id: selectedItem.stage_id,
        loan_amount:selectedItem.value,
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
    setLoanDetails((prevState) => ({...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(loanDetails);

  // Find objects in the loan array that match all key-value pairs in loanDetails
  const matchingLoans = loan.filter((loanItem) => {
    for (const key in loanDetails) {
      if (loanDetails[key] !== loanItem[key]) {
        return false; // If any key-value pair doesn't match, return false
      }
    }
    return true; // All key-value pairs match
  });
  console.log("Matching Loans:", matchingLoans);
  // Now you can do something with the matchingLoans array, such as sending it to the server.



    // axios
    //   .post(ADD_DEAL, leadData, {
    //     headers: {
    //       Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
    //     },
    //   })
    //   .then((response) => {
    //     toast.success("Deal data added successfully", {
    //       position: "top-center",
    //       autoClose: 2000,
    //     });
    //     setLeadData({
    //       probability: "",
    //       deal_name: "",
    //       organization: "",
    //       mobile: "",
    //       email: "",
    //       // value: 0,
    //       label_id: 36,
    //       closure_date: "",
    //       stage_id: 1,
    //       pipeline_id: 1,
    //       lead_id: 0,
    //       age_of_business: 0,
    //       company_type: "",
    //       industry_type: "",
    //       turnover: 0,
    //       location_of_company_or_individual:"",
    //       duration:"",
    //       individual_or_company:"",
    //       loan_amount: 0,
    //       loan_type: "",
    //     });
    //     // setName("");
    //     onLeadAdded();
    //     navigate("/lp/deals");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
            X
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
                Loan Amount
                </label>
                <div className="currency-section">
                  <input
                    id="loan_amount"
                    type="number"
                    className="currency-input"
                    name="loan_amount"
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
                {/* <label className="lead-label" htmlFor="pipeline_id">
                  Pipeline
                </label>
                <select className="lead-input">
                  <option value=""></option>
                  <option value=""></option>
                </select> */}
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
                <label className="lead-label" htmlFor="status">
                  Stages
                </label>
                <select
                  name="stage_id"
                  id="stage_id"
                  className="lead-priority"
                  onChange={handleChange}
                >
                  {stages?.map((item, index) => {
                    return (
                      <option key={index} value={stageId[index]}>
                        {item}
                      </option>
                    );
                  })}
                </select>

                <label className="lead-label" htmlFor="pipeline_id">
                  Loan Type
                </label>
                <select className="lead-input" name="loan_type" onChange={handleChange}>
                  <option value="Home loan">Home loan</option>
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                  <option value="car finance">car finance</option>
                  <option value="business loan">business loan</option>
                  <option value="term loan">term loan</option>
                  <option value="secured loan">secured loan</option>
                </select>

                <div className="deal-bottom-radio">
                  <div className="deal-radio-input">
                    <input
                      type="radio"
                      id="individual"
                      name="individual_or_company"
                      value="individual"
                      onChange={handleChange}
                    />
                    <label className="deal-label" htmlFor="individual">
                      Individual
                    </label>
                  </div>
                  <div className="deal-radio-input">
                    <input
                      type="radio"
                      id="company"
                      name="individual_or_company"
                      value="company"
                      onChange={handleChange}
                    />
                    <label className="deal-label" htmlFor="company">
                      Company
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section-2">
                <label className="lead-label" htmlFor="mobile">
                  Phone Number
                </label>
                <div className="phone-input-section">
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

                <label className="lead-label" htmlFor="pipeline_id">
                  Company Type
                </label>
                <select
                  className="lead-input"
                  name="company_type"
                  onChange={handleChange}
                >
                  <option value="Corporation">corporation</option>
                  <option value="limited company">limited company</option>
                  <option value="private limited">private limited</option>
                  <option value="public company">public company</option>
                  <option value="joint venture">joint venture</option>
                  <option value="Sole Proprietorship">"Sole Proprietorship"</option>
                  <option value="LLC">LLC</option>
                </select>

                <label className="lead-label" htmlFor="pipeline_id">
                  Duration
                </label>
                <select
                  className="lead-input"
                  name="duration"
                  onChange={handleChange}
                >
                 <option value="Short-term">Short term</option>
                 <option value="Medium-term">Medium term</option>
                 <option value="Long-term">Long term</option>
                </select>
                <label className="lead-label" htmlFor="pipeline_id">
                  Location of Company/Individual
                </label>
                <input id="location_of_company_or_individual" type="text" className="lead-input email-case" name="location_of_company_or_individual" onChange={handleChange}/>
                <label className="lead-label" htmlFor="age_of_business">
                  Age of Business
                </label>
                {/* <select
                  className="lead-input"
                  name="age_of_business"
                  onChange={handleChange}
                >
                  <option value="1">0-1</option>
                  <option value="2">1-2</option>
                  <option value="3">2-3</option>
                  <option value="4">3-4</option>
                  <option value="5">4-5</option>
                  <option value="6">5-6</option>
                  <option value="7">6-7</option>
                  <option value="8">7-8</option>
                  <option value="9">8-9</option>
                  <option value="10">9-10</option>
                  <option value="11">10+</option>
                </select> */}
                <input
                  id="age_of_business"
                  type="number"
                  name="age_of_business"
                  className="lead-input"
                  onChange={handleChange}
                />


                <label className="lead-label" htmlFor="turnover">
                  Turnover
                </label>
                <input
                  id="turnover"
                  type="number"
                  name="turnover"
                  className="lead-input"
                  onChange={handleChange}
                />

                <label className="lead-label" htmlFor="industry_type">
                  Industry Type
                </label>
                <select
                  className="lead-input"
                  name="industry_type"
                  onChange={handleChange}
                >
                  <option value="Textile">Textile</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Finance">Finance</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Mining">Mining</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Retail">Retail</option>
                  <option value="Aerospace">Aerospace</option>
                  <option value="Technology">Technology</option>
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
