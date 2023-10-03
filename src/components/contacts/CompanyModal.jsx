import React, { useState } from "react";
import axios from "axios";
import { getDecryptedToken, ADD_COMPANY } from "../utils/Constants";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyModal = ({ onClose, fetchCompany }) => {
  const decryptedToken = getDecryptedToken();
  const [company, setCompany] = useState({
    "name": "",
    "orgid": "",
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



  const resetForm = () => {
    setCompany({
        "name": "",
        "orgid": "",
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
  }

  const handleClose = () => {
    resetForm();
    onClose();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(ADD_COMPANY, company, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if(response.data.status===1){
            toast.success("Company is added successfully", {
                position: "top-center",
                autoClose: 2000,
              });
              fetchCompany();
              onClose();
        }else{
            toast.error(response.data.message, {
                position: "top-center",
                autoClose: 2000,
              });
        }

        setCompany({
            "name": "",
            "orgid": "",
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
         })
      .catch((error) => {
        console.log(error);
        toast.error("some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
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
              {/* <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Company Owner
                </label>
                <select name="" id="" className="common-select">
                    <option value="">Select Owner</option>
                </select>
              </div> */}
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Organization Id
                </label>
                <input type="text" className="common-input" name="orgid"
                  onChange={handleChange}
                  value={company.orgid}  />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                 Industry
                </label>
                <select name="industry" id="" className="common-select" onChange={handleChange} value={company.industry}>
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
                    type="number"
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
                    onChange={handleChange}
                  >
                  <option value="">Select Currency</option>
                    {/* <option value="usd">US Dollar (USD)</option> */}
                     <option value="Gbp">GBP</option>
                  </select>
                </div>
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Phone
                </label>
                <input type="number" name="phone" value={company.phone} onChange={handleChange} className="common-input" />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Email
                </label>
                <input type="email" name="email" value={company.email} onChange={handleChange} className="common-input" />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  City
                </label>
                <input type="text" className="common-input" onChange={handleChange} value={company.city} name="city" />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Country
                </label>
                <input type="text" className="common-input" onChange={handleChange} value={company.country} name="country" />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Address 1
                </label>
                <input type="text" className="common-input" onChange={handleChange} name="address1" value={company.address1} />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Address 2
                </label>
                <input type="text" name="address2" onChange={handleChange} className="common-input" value={company.address2} />
              </div>
              <div className="product-popup-fields">
                <label htmlFor="" className="common-fonts">
                  Postal Code
                </label>
                <input type="number" name="postcode" onChange={handleChange} className="common-input" value={company.postcode} />
              </div>
            </form>
            <div className="product-popup-bottom">
              <button className='common-white-button' onClick={handleClose}>Cancel</button>
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
      <div className="help-cross" onClick={handleClose}>
        X
      </div>
    </div>
  );
};

export default CompanyModal;
