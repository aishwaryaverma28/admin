import React, { useState } from "react";
import { useParams } from "react-router";
import arrowLeft from "../../assets/image/arrow-left.svg";
import Building from "../../assets/image/building.svg";
import User from "../../assets/image/user-icon.svg";
import Calender from "../../assets/image/calendar-new.svg";
import Copy from "../../assets/image/copy.svg";
import Pen from "../../assets/image/building.svg";
import Dots from "../../assets/image/building.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import AddNotes from "../AddNotes.jsx";
import DealEmail from "../deal/DealEmail.jsx";
import DealActivity from "../deal/DealActivity.jsx";


const CompanyUpdate = () => {
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [ShowUpdateButton, setShowUpdateButton] = useState(false);
  const [stateBtn, setStateBtn] = useState(0);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isDealOpen, setIsDealsOpen] = useState(false);
  const [isLeadsOpen, setIsLeadssOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("notes");

  const handleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };
  const handleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const handleContacts = () => {
    setIsContactsOpen(!isContactsOpen);
  };
  const handleLeads = () => {
    setIsLeadssOpen(!isLeadsOpen);
  };
  const handleDeals = () => {
    setIsDealsOpen(!isDealOpen);
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate back in the browser history
  };

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setIsDisabled(!isDisabled);
    setShowUpdateButton(!ShowUpdateButton);
    setStateBtn(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCompanyDetails({
      ...companyDetails,
      [name]: value,
    });
    setStateBtn(1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const normalStylingInput = {
    color: "#1e2224",
    fontWeight: 400,
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    padding: "0.3rem",
    border: "1px solid transparent",
    height: "2rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  const editStylingInput = {
    color: "#1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    padding: "0.3rem",
    height: "2rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  const normalStyling = {
    textAlign: "left",
    fontFamily: "Lexend Deca",
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "#1e2224",
    lineHeight: "17px",
    border: "1px solid transparent",
    width: "100%",
    backgroundColor: "white",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  const editStyling = {
    border: "1px solid #dcdcdc",
    textAlign: "left",
    fontFamily: "Lexend Deca",
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "#1e2224",
    lineHeight: "17px",
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  const normalStylingSelect1 = {
    fontSize: " 0.8rem",
    fontFamily: '"Lexend Deca", sans-serif',
    fontWeight: 400,
    padding: "0.3rem",
    textTransform: "capitalize",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    border: "1px solid transparent",
    height: "2rem",
    width: "fit-content",
    color: " #1e2224",
    borderRadius: "5px",
  };

  const editStylingSelect1 = {
    width: "100%",
    color: " #1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    padding: "0.1rem",
    height: "2rem",
    borderRadius: "5px",
  };

  return (
    <div className="contact-cpu-container">
      <div className="cpu-left">
        <div className="go-back-btn cpu-back ">
          <button
            className="setting-font-style"
            onClick={handleGoBack}
            style={{ backgroundColor: "white" }}
          >
            <img src={arrowLeft} alt="" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="cpu-top-details">
          <div className="cpu-building">
            <img src={Building} alt="" />
          </div>

          <div className="cpu-input-container">
            <input
              type="text"
              value="Scotish Bridge Deal"
              style={isEditable ? editStyling : normalStyling}
              disabled={isDisabled}
            />
            <input
              type="text"
              value="websitelink.com"
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
            <input
              type="text"
              value="-917987803489"
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
          </div>

          <div className="cpu-icons">
            <i className="fa-solid fa-pen cpu-pen" onClick={toggleEditable}></i>
            <i className="fas fa-ellipsis-h cpu-dot"></i>
          </div>
        </div>

        <div className="summaryDiv cpu-section">
          <p className="dealSectionHead" onClick={handleSummary}>
            {isSummaryOpen ? (
              <i class="fa-sharp fa-solid fa-angle-up"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            )}
            About Company
          </p>
          <p className="addProduct cpu-add">
            <i class="fa-sharp fa-solid fa-plus"></i>Add
          </p>
        </div>
        {isSummaryOpen && (
          <div className="detailsContent cpu-content">
            <div className="dealsLeftContainer cpu-p">
              <p>Name</p>
              <p>Domain</p>
              <p>Valuation</p>
              <p>Industry</p>
            </div>

            <div className="detailsRightContainer">
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name=""
                      value="Abc inc"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="www.abc.com"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <select
                      name=""
                      onChange={handleInputChange}
                      disabled={isDisabled}
                      style={
                        isEditable ? editStylingSelect1 : normalStylingSelect1
                      }
                      className={`${isDisabled ? "disabled" : ""}`}
                      id="cpu-tech"
                    >
                      <option value="tech">Tech</option>
                      <option value="non tech">Non Tech</option>
                    </select>
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
        <div className="summaryDiv cpu-section">
          <p className="dealSectionHead" onClick={handleDetails}>
            {isDetailsOpen ? (
              <i class="fa-sharp fa-solid fa-angle-up"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            )}
            Details
          </p>
          <p className="addProduct cpu-add">
            <i class="fa-sharp fa-solid fa-plus"></i>Add
          </p>
        </div>
        {isDetailsOpen && (
          <div className="detailsContent cpu-content">
            <div className="dealsLeftContainer cpu-p">
              <p>Phone</p>
              <p>Email</p>
              <p>Country</p>
              <p>City</p>
              <p>Address 1</p>
              <p>Address 2</p>
              <p>Domain</p>
            </div>

            <div className="detailsRightContainer">
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name=""
                      value="Abc inc"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="www.abc.com"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>

              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="value"
                      value="10000"
                      onChange={handleInputChange}
                      style={isEditable ? editStylingInput : normalStylingInput}
                      disabled={isDisabled}
                      className="cpu-value"
                    />
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
        <div className="summaryDiv cpu-section">
          <p className="dealSectionHead" onClick={handleContacts}>
            {isContactsOpen ? (
              <i class="fa-sharp fa-solid fa-angle-up"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            )}
            Contacts (2)
          </p>
          <p className="addProduct cpu-add">
            <i class="fa-sharp fa-solid fa-plus"></i>Add
          </p>
        </div>
        {isContactsOpen && (
          <>
            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-name">Kevin doms</p>
                <p className="common-fonts cpu-manager">Manager at hertz </p>
                <p className="common-fonts cpu-mail">
                  kevin@mail.com <img src={Copy} alt="" />
                </p>
                <p className="common-fonts cpu-mail">
                  +62 8564239548 <img src={Copy} alt="" />
                </p>
                <div className="cpu-user-icon">
                  <img src={User} alt="" />
                </div>
                <div className="cpu-user-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>

            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-name">Kevin doms</p>
                <p className="common-fonts cpu-manager">Manager at hertz </p>
                <p className="common-fonts cpu-mail">
                  kevin@mail.com <img src={Copy} alt="" />
                </p>
                <p className="common-fonts cpu-mail">
                  +62 8564239548 <img src={Copy} alt="" />
                </p>
                <div className="cpu-user-icon">
                  <img src={User} alt="" />
                </div>
                <div className="cpu-user-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="summaryDiv cpu-section">
          <p className="dealSectionHead" onClick={handleLeads}>
            {isLeadsOpen ? (
              <i class="fa-sharp fa-solid fa-angle-up"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            )}
            Leads (2)
          </p>
          <p className="addProduct cpu-add">
            <i class="fa-sharp fa-solid fa-plus"></i>Add
          </p>
        </div>
        {isLeadsOpen && (
          <>
            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-lead">Hertz Deal</p>
                <p className="common-fonts cpu-amount">
                  Amount: <span>$120000</span>{" "}
                </p>
                <p className="common-fonts cpu-amount">
                  Close Date: <span>July 16, 2023</span>{" "}
                </p>
                <div className="cpu-stage">
                  <span className="common-fonts cpu-amount">stage:</span>
                  <select name="" id="" className="cpu-select">
                    <option value="">Select Stage</option>
                  </select>
                </div>

                <div className="cpu-lead-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>
            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-lead">Hertz Deal</p>
                <p className="common-fonts cpu-amount">
                  Amount: <span>$120000</span>{" "}
                </p>
                <p className="common-fonts cpu-amount">
                  Close Date: <span>July 16, 2023</span>{" "}
                </p>
                <div className="cpu-stage">
                  <span className="common-fonts cpu-amount">stage:</span>
                  <select name="" id="" className="cpu-select">
                    <option value="">Select Stage</option>
                  </select>
                </div>

                <div className="cpu-lead-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="summaryDiv cpu-section">
          <p className="dealSectionHead" onClick={handleDeals}>
            {isDealOpen ? (
              <i class="fa-sharp fa-solid fa-angle-up"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            )}
            Deals (2)
          </p>
          <p className="addProduct cpu-add">
            <i class="fa-sharp fa-solid fa-plus"></i>Add
          </p>
        </div>
        {isDealOpen && (
          <>
            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-lead">Hertz Deal</p>
                <p className="common-fonts cpu-amount">
                  Amount: <span>$120000</span>{" "}
                </p>
                <p className="common-fonts cpu-amount">
                  Close Date: <span>July 16, 2023</span>{" "}
                </p>
                <div className="cpu-stage">
                  <span className="common-fonts cpu-amount">stage:</span>
                  <select name="" id="" className="cpu-select">
                    <option value="">Select Stage</option>
                  </select>
                </div>

                <div className="cpu-lead-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>
            <div className="detailsContent cpu-content">
              <div className="cpu-contact-box">
                <p className="common-fonts cpu-contact-lead">Hertz Deal</p>
                <p className="common-fonts cpu-amount">
                  Amount: <span>$120000</span>{" "}
                </p>
                <p className="common-fonts cpu-amount">
                  Close Date: <span>July 16, 2023</span>{" "}
                </p>
                <div className="cpu-stage">
                  <span className="common-fonts cpu-amount">stage:</span>
                  <select name="" id="" className="cpu-select">
                    <option value="">Select Stage</option>
                  </select>
                </div>

                <div className="cpu-lead-cal">
                  <img src={Calender} alt="" />
                </div>
              </div>
            </div>
          </>
        )}
        {ShowUpdateButton && (
              <div className="deal-update-btn">
                {stateBtn === 0 ? (
                  <button disabled className="disabledBtn ">
                    Update
                  </button>
                ) : (
                  <button className="convertToDeal">
                    Update
                  </button>
                )}
              </div>
            )}
      </div>
      <div className="cpu-right">
          <div className="tab-navigation">
            <button
              className={activeTab === "notes" ? "active" : ""}
              onClick={() => handleTabClick("notes")}
            >
              <i className="fa-sharp fa-regular fa-note-sticky"></i>
              Notes (2)
            </button>
            <button
              className={activeTab === "email" ? "active" : ""}
              onClick={() => handleTabClick("email")}
            >
              <i className="fa-sharp fa-regular fa-envelope-open"></i>
              Email
            </button>
            <button
              className={activeTab === "whatsapp" ? "active" : ""}
              onClick={() => handleTabClick("whatsapp")}
            >
              <i className="fa-sharp fa-regular fab fa-whatsapp"></i>
              Whatsapp
            </button>
            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => handleTabClick("activity")}
            >
              <i className="fa-sharp fa-regular fa-calendar"></i>
              Activity (2)
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "notes" && (
              <div className="notes-tab-content">
                <AddNotes
                />
              </div>
            )}
            {activeTab === "email" && (
              <div className="email-tab-content">
                <DealEmail 
                  />
              </div>
            )}
            {activeTab === "activity" && (
              <div className="activity-tab-content">
                <DealActivity
                />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default CompanyUpdate;
