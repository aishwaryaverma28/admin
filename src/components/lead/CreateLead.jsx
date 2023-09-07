import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_LEAD, getDecryptedToken, GET_ALL_STAGE } from "../utils/Constants";
import { countryPhoneCodes, worldCurrencies } from "../utils/CodeCurrency";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLead = ({ isOpen, onClose, onLeadAdded, mergedLabels }) => {
  const [name, setName] = useState("");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [isDisable, setIsDisable] = useState(true);
  const [stages, setStages] = useState([]);
  const [stageId, setStageId] = useState([]);
  const [selectedStageName, setSelectedStageName] = useState("");

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
    stage_id: 1,
  });



  const fetchStages = () => {
    axios
      .get(GET_ALL_STAGE + "/lead", {
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

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStages();
  }, []);

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
      status:"New"
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
          stage_id: 1,
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
          <p>Create Lead</p>
          <p className="close-icon" onClick={onClose}>
            X
          </p>
        </div>
        <div className="create-lead-form">
          <form>
            <section class="form-area">
              <div className="form-section-1">
                <div>
                  <p className="lead-label2">Lead Image</p>
                  <i className="fa-solid fa-plus"></i>
                </div>

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
                  Lead Owner
                </label>
                <input
                  id="name"
                  type="text"
                  className="lead-input"
                  placeholder="Please Enter Name"
                  onChange={handleChangeName}
                  value={name} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="position">
                  Position
                </label>
                <input
                  id="position"
                  type="text"
                  className="lead-input"
                  name="position"
                  onChange={handleChange}
                  value={leadData.position} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="source">
                  Lead source
                </label>
                <input
                  id="source"
                  type="text"
                  className="lead-input"
                  name="source"
                  onChange={handleChange}
                  value={leadData.source} // Add value prop for controlled input
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
                <label className="lead-label" htmlFor="employees">
                  Employees
                </label>
                <input
                  id="employees"
                  type="text"
                  name="employees"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.employees} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="registration_no">
                  Registration No
                </label>
                <input
                  id="registration_no"
                  type="text"
                  name="registration_no"
                  className="lead-input"
                  onChange={handleChange}
                  value={leadData.registration_no} // Add value prop for controlled input
                />
                <label className="lead-label" htmlFor="">
                  Contact Person
                </label>
                <input
                  id=""
                  type="text"
                  name=""
                  className="lead-input"
                  // onChange={handleChange}
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
                  Create Lead
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

export default CreateLead;
