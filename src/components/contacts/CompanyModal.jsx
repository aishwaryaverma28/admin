import React, { useState } from "react";
import axios from "axios";
import { getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyModal = ({ onClose, getCall }) => {
  const decryptedToken = getDecryptedToken();
  const [company, setCompany] = useState({
    "name": "",
    "orgid": "ORG123",
    "address1": "",
    "address2": "",
    "city": "",
    "country": "",
    "postcode": "",
    "email": "",
    "phone": "",
    "valuation":0,
    "valuation_in": "",
    "domain": "",
    "industry": ""
  });
  const [stateBtn, setStateBtn] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevState) => ({ ...prevState, [name]: value }));
    setStateBtn(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(company)
    axios
      .post("http://core.leadplaner.com:3001/api/contact/company/add", company, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Company is added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setCompany({
            "name": "",
            "orgid": "ORG123",
            "address1": "",
            "address2": "",
            "city": "",
            "country": "",
            "postcode": "",
            "email": "",
            "phone": "",
            "valuation":0,
            "valuation_in": "",
            "domain": "",
            "industry": ""
        });
        setStateBtn(0);
        getCall(); 
        onClose();
         })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="popup-wrapper">
      <div className="product-popup-container">
        <div className="product-popup-box">
          <p className="common-fonts add-product-heading">Add Company</p>
          <div className="product-popup-content">
            <form action="">
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Company Name
                </label>
                <input type="text" className="common-input" name="name"
                  onChange={handleChange}
                  value={company.name}  />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Company Domain
                </label>
                <input type="text" className="common-input" name="domain"
                  onChange={handleChange}
                  value={company.domain}/>
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Company Owner
                </label>
                <select name="" id="" className="common-select">
                    <option value="">Select Owner</option>
                </select>
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Industry
                </label>
                <select name="industry" id="" className="common-select" value={company.industry}>
                    <option value="">Select Industry</option>
                    <option value="tech">Tech</option>
                    <option value="non-tech">Non-Tech</option>
                </select>
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Value
                </label>
                <div className="product-two-input">
                  <input
                    type="text"
                    className="common-input product-popup-input"
                    name="valuation"
                  onChange={handleChange}
                  value={company.valuation}
                  />
                  <select
                    name="valuation_in"
                    id=""
                    className="common-input product-popup-select"
                    value={company.valuation_in}
                  >
                  <option value="">Select Currency</option>
                    <option value="usd">US Dollar (USD)</option>
                  </select>
                </div>
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  City
                </label>
                <input type="text" className="common-input" />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Address 1
                </label>
                <input type="text" className="common-input" name="address1" value={company.address1} />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Address 2
                </label>
                <input type="text" name="address2" className="common-input" value={company.address2} />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Postal Code
                </label>
                <input type="text" name="postcode" className="common-input" value={company.postcode} />
              </div>
            </form>
            <div className="product-popup-bottom">
              {/* <button className='common-white-button' onClick={handleCancel}>Cancel</button> */}
              {stateBtn === 0 ? (
                <button className="disabledBtn" disabled>
                  Save
                </button>
              ) : (
                <button
                  className="common-save-button product-popup-save"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="help-cross" onClick={onClose}>
        X
      </div>
    </div>
  );
};

export default CompanyModal;
