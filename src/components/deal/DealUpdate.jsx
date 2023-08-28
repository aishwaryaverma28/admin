import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/DealUpdate.css";
import LeftArrow from "../../assets/image/arrow-left.svg";
import GreaterLeft from "../../assets/image/greater-left.svg";
import GreaterRight from "../../assets/image/greater-right.svg";
import axios from "axios";
import {
  GETNOTEDEAL,
  GET_DEAL_ID,
  UPDATE_DEAL,
  handleLogout,
  getDecryptedToken,
  GET_LABEL,
  GET_ALL_STAGE,
} from "../utils/Constants";
import AddNotes from "../AddNotes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealUpdate = () => {
  const { id } = useParams();
  const decryptedToken = getDecryptedToken();
  const [labelData, setLabelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLabelColor, setSelectedLabelColor] = useState("");
  const [stages, setStages] = useState([]);
  const [actionopen, setActionOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const [selectedStageId, setSelectedStageId] = useState(null);

  const handleStageClickFromList = (event, stageId) => {
    setSelectedStageId(stageId);
  };

  const handleChangeStatusClick = () => {
    if (selectedStageId !== null) {
      console.log("Selected Stage ID:", selectedStageId);
    }
  };

  const toggleActionDropdownStatic = () => {
    setActionOpen(!actionopen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        actionDropDownRef.current &&
        !actionDropDownRef.current.contains(event.target)
      ) {
        setActionOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchStages = () => {
    axios
      .get(GET_ALL_STAGE, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const displayNames = response.data.message.map(
          (item) => item.display_name
        );

        // Sort displayNames based on item.id in ascending order
        const sortedDisplayNamesAsc = [...displayNames].sort((a, b) => {
          const itemA = response.data.message.find(
            (item) => item.display_name === a
          );
          const itemB = response.data.message.find(
            (item) => item.display_name === b
          );
          return itemA.id - itemB.id;
        });

        setStages(sortedDisplayNamesAsc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStages();
  }, []);



  const [dealDetails, setDealDetails] = useState({
    closure_date: "",
    contact: "",
    deal_name: "",
    doc_number: "",
    document_verified: 0,
    email: "",
    is_deleted: 0,
    // label_coloure: "",
    label_id: null,
    // label_name: "",
    mobile: "",
    organization: "",
    // ownerf_name: "",
    // ownerl_name: "",
    pipeline_id: 1,
    probability: "",
    status: "",
    value: null,
    introducer_name: "",
    introducer_firm_name: "",
    data_enquiry_receive: "",
    borrower_entry: "",
    security_value: null,
    loan_amount: null,
    deposit: null,
    type_of_security: "",
    loan_type: "",
    lender: null,
    lead_source: "",
    engagement_fee: null,
    engagement_fee_paid: null,
    broker_fee: null,
    broker_fee_paid: null,
    procuration_fee: null,
    procuration_fee_paid: null,
    deal_commission: null,
    completion_date: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [activeTab, setActiveTab] = useState("notes"); // Initial active tab
  const [notes, setNotes] = useState();
  const [value, setValue] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const [editedItem, setEditedItem] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };
  const handleCompany = () => {
    setIsCompanyOpen(!isCompanyOpen);
  };
  const handleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

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
    "completion",
  ];

  const normalStylingInput = {
    color: "#1e2224",
    fontWeight: 400,
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.3rem",
    border: "1px solid transparent",
    height: "2rem",
  };

  const editStylingInput = {
    color: "#1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.3rem",
    height: "2rem",
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
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleStages = stages?.slice(currentIndex, currentIndex + 4);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const canShowPrev = currentIndex > 0;

  const lastVisibleStageIndex = currentIndex + visibleStages?.length - 1;
  const lastStageIndex = stages?.length - 1;
  const canShowLeftScrollArrow = lastVisibleStageIndex < lastStageIndex;

  const fetchLead = () => {
    axios
      .get(GET_DEAL_ID + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        const details = response?.data?.data[0];
        setDealDetails({
          ...dealDetails,
          closure_date: details.closure_date?.split("T")[0],
          contact: details.contact,
          deal_name: details.deal_name,
          doc_number: details.doc_number,
          document_verified: details.document_verified,
          email: details.email,
          is_deleted: details.is_deleted,
          // label_coloure: details.label_coloure,
          label_id: details.label_id,
          // label_name: details.label_name,
          mobile: details.mobile,
          organization: details.organization,
          // ownerf_name: details.ownerf_name,
          // ownerl_name: details.ownerl_name,
          pipeline_id: 1,
          probability: details.probability,
          status: details.status,
          value: details.value,
          introducer_name: details.introducer_name,
          introducer_firm_name: details.introducer_firm_name,
          data_enquiry_receive: details.data_enquiry_receive,
          borrower_entry: details.borrower_entry,
          security_value: details.security_value,
          loan_amount: details.loan_amount,
          deposit: details.deposit,
          type_of_security: details.type_of_security,
          loan_type: details.loan_type,
          lender: details.lender,
          lead_source: details.lead_source,
          engagement_fee: details.engagement_fee,
          engagement_fee_paid: details.engagement_fee_paid,
          broker_fee: details.broker_fee,
          broker_fee_paid: details.broker_fee_paid,
          procuration_fee: details.procuration_fee,
          procuration_fee_paid: details.procuration_fee_paid,
          deal_commission: details.deal_commission,
          completion_date: details.completion_date?.split("T")[0],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const fetchLabelData = async () => {
    try {
      const response = await axios.get(GET_LABEL, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });
      if (response.data.status === 1) {
        setLabelData(response.data.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Invalid or expired token.") {
        alert(error?.response?.data?.message);
        handleLogout();
      }
    }
  };
  useEffect(() => {
    fetchLead();
    fetchLabelData();
    fetchNotes();
  }, []);

  const handleUpdateClick = (event) => {
    event.preventDefault();
    console.log(dealDetails);
    axios
      .put(UPDATE_DEAL + id, dealDetails, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response?.data);
        toast.success("Deal data updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setIsEditable(false);
    setIsDisabled(!isDisabled);
    setStateBtn(0);
    fetchLead();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchNotes = () => {
    axios
      .get(GETNOTEDEAL + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          setNotes(response?.data?.data?.length);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
          handleLogout();
        }
      });
  };

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setIsDisabled(!isDisabled);
    setStateBtn(0);
  };

  const mergedLabels = labelData
    ?.filter((item) => item?.entity?.includes("deals"))
    ?.map((item) => ({
      id: item?.id,
      name: item?.name,
      colour_code: item?.colour_code,
    }));

  const normalStylingSelect1 = {
    backgroundColor:
      selectedLabelColor === ""
        ? dealDetails?.label_id
          ? mergedLabels.find((label) => label.id === dealDetails?.label_id)
              ?.colour_code
          : ""
        : selectedLabelColor,
    color: "white !important",
    fontSize: " 0.8rem",
    fontFamily: '"Lexend Deca", sans-serif',
    fontWeight: 400,
    padding: "0.3rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    border: "1px solid transparent",
    height: "2rem",
    width: "fit-content",
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
    borderRadius: "0.3125rem",
    padding: "0.1rem",
    height: "2rem",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "label_name") {
      const selectedLabel = mergedLabels.find((label) => label.name === value);
      if (selectedLabel) {
        setSelectedLabelColor(selectedLabel.colour_code);
      }
    }
    setDealDetails({
      ...dealDetails,
      [name]: value,
    });
    setStateBtn(1);
  };

  const handleStageClick = (event) => {
    // Remove active class from all li elements
    const liElements = document.querySelectorAll('.dropdown-menu li');
    liElements.forEach((li) => {
      li.classList.remove('active-stage');
    });

    // Add active class to the clicked li element
    event.target.classList.add('active-stage');
  };

  return (
    <>
      <div className="backToDeal">
        <Link to={"/lp/deals"}>
          <button className="common-fonts">
            <img src={LeftArrow} alt="" />
          </button>
        </Link>
        <p>
          {isLoading ? (
            <span>-</span>
          ) : (
            <>
              {" "}
              <input
                type="text"
                name="deal_name"
                value={dealDetails?.deal_name}
                onChange={handleInputChange}
                style={isEditable ? editStyling : normalStyling}
                disabled={isDisabled}
              />
              <br />
            </>
          )}
        </p>
        <i className="fa-solid fa-pen" onClick={toggleEditable}></i>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="dealHead"></div>

      <div className="arrow-container">
        <div className="arrow-section">
          <button
            className="arrow-scroll-left"
            onClick={handlePrevClick}
            disabled={!canShowPrev}
          >
            <img src={GreaterLeft} alt="" class="deals-arrow-left" />
          </button>

          {/* <div className="arrow-pointer">
            <p className="common-fonts arrow-text">enquiry received (888 days)</p>
          </div>
          <div className="arrow-pointer arrow-pointer-2">
            <p className="common-fonts arrow-text arrow-text-2">contact made (888 days)</p>
          </div> */}
          {visibleStages?.map((stage, index) => {
            const isActive =
              status[currentIndex + index] === dealDetails.status;
            const activeIndex = status.indexOf(dealDetails.status);

            const backgroundColor = isActive
              ? "#2b74da"
              : activeIndex >= currentIndex + index
              ? "#077838" //
              : "#f3f3f3";
            const textColor =
              isActive ||
              backgroundColor === "#077838" ||
              backgroundColor === "#2b74da"
                ? "white"
                : "#1e2224";

            const arrowClass = isActive
              ? "arrow-blue"
              : backgroundColor === "#077838"
              ? "arrow-green"
              : "";
            return (
              <div
                className={`arrow-pointer ${arrowClass}`}
                style={{ backgroundColor, color: textColor }}
                key={index}
              >
                <p
                  className="common-fonts arrow-text"
                  style={{ color: textColor }}
                >
                  {stage} (3 days)
                </p>
              </div>
            );
          })}

          <button
            className="arrow-scroll-right"
            onClick={handleNextClick}
            disabled={!canShowLeftScrollArrow}
          >
            <img src={GreaterRight} alt="" class="deals-arrow-right" />
          </button>
          <div className="arrow-btn">
            <button className="arrow-won common-fonts">Won</button>
            <button className="arrow-lost common-fonts">Lost</button>
          </div>
        </div>
      </div>

      <div className="ud-stages">
        <p className="common-fonts ud-stage-name">Stage: </p>
        <div className="select action-select">
          <div className="dropdown-container" ref={actionDropDownRef}>
            <div
              className="dropdown-header2 pipeline-dropdown"
              onClick={toggleActionDropdownStatic}
            >
              Select Stages
              <i
                className={`fa-sharp fa-solid ${
                  actionopen ? "fa-angle-up" : "fa-angle-down"
                }`}
              ></i>
            </div>
            {actionopen && (
          <ul className="dropdown-menu stage-position" id="stage-list">
            {stages?.map((stage, index) => (
              <li key={index} onClick={(e) => handleStageClickFromList(e, index + 1)}>{stage}</li>
            ))}
            <li>
              <button className="common-save-button stage-save-btn" onClick={handleChangeStatusClick}>
                Change Status
              </button>
            </li>
          </ul>
        )}
          </div>
        </div>
      </div>

      <main className="dealcontainer">
        <div className="dealLeftSection">
          <section>
            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleSummary}>
                {isSummaryOpen ? (
                  <i class="fa-sharp fa-solid fa-angle-up"></i>
                ) : (
                  <i class="fa-sharp fa-solid fa-angle-down"></i>
                )}
                Summary
              </p>
              <p className="addProduct">
                <i class="fa-sharp fa-solid fa-plus"></i>Add Product
              </p>
            </div>
            {isSummaryOpen && (
              <div className="detailsContent">
                <div className="dealsLeftContainer">
                  <p>Value</p>
                  <p>Lable</p>
                  <p>Contact Person</p>
                  <p>Organization</p>
                  <p>Owner First Name</p>
                  <p>Owner Last Name</p>
                  <p>Closing Date</p>
                </div>

                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="value"
                          value={dealDetails?.value}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                        <select
                          name="label_name"
                          id="label_name"
                          value={dealDetails?.label_name || ""}
                          onChange={handleInputChange}
                          disabled={isDisabled}
                          style={
                            isEditable
                              ? editStylingSelect1
                              : normalStylingSelect1
                          }
                          className={isDisabled ? "disabled" : ""}
                        >
                          {mergedLabels?.map((item) => (
                            <option key={item?.id} value={item?.name}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
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
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="organization"
                          value={dealDetails?.organization}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="ownerf_name"
                          value={dealDetails?.ownerf_name}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="ownerl_name"
                          value={dealDetails?.ownerl_name}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="date"
                          value={dealDetails?.closure_date.split("T")[0]}
                          name="closure_date"
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleCompany}>
                {isCompanyOpen ? (
                  <i class="fa-sharp fa-solid fa-angle-up"></i>
                ) : (
                  <i class="fa-sharp fa-solid fa-angle-down"></i>
                )}
                Company
              </p>
            </div>

            {isCompanyOpen && (
              <div className="detailsContent">
                <div className="dealsLeftContainer">
                  <p>Name</p>
                  <p>Address</p>
                  <p>Phone No</p>
                </div>

                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="organization"
                          value={dealDetails?.organization}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          value={dealDetails?.mobile}
                          onChange={handleInputChange}
                          name="mobile"
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleDetails}>
                {isDetailsOpen ? (
                  <i class="fa-sharp fa-solid fa-angle-up"></i>
                ) : (
                  <i class="fa-sharp fa-solid fa-angle-down"></i>
                )}
                Details
              </p>
            </div>

            {isDetailsOpen && (
              <div className="detailsContent">
                <div className="dealsLeftContainer">
                  <p>Introducer Name</p>
                  <p>Introducer Firm Name</p>
                  <p>Data Enquiry Recieve</p>
                  <p>Borrower Entry</p>
                  <p>Security Value</p>
                  <p>Loan Amount</p>
                  <p>Deposit</p>
                  <p>Type Of Security</p>
                  <p>Loan Type</p>
                  <p>Lender</p>
                  <p>Lead Source</p>
                  <p>Engagement Fee</p>
                  <p>Engagement Fee Paid</p>
                  <p>Broker Fee</p>
                  <p>Broker Fee Paid</p>
                  <p>Procuration Fee</p>
                  <p>Procuration Fee Paid</p>
                  <p>Deal Commission</p>
                  <p>Completion Date</p>
                  <p>Commercial Finance-File Completion Checklist</p>
                </div>

                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="introducer_name"
                          value={dealDetails.introducer_name}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="introducer_firm_name"
                          value={dealDetails.introducer_firm_name}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="data_enquiry_receive"
                          value={dealDetails.data_enquiry_receive}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="borrower_entry"
                          value={dealDetails.borrower_entry}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="security_value"
                          value={dealDetails.security_value}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="loan_amount"
                          value={dealDetails.loan_amount}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="deposit"
                          value={dealDetails.deposit}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="type_of_security"
                          value={dealDetails.type_of_security}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="loan_type"
                          value={dealDetails.loan_type}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="lender"
                          value={dealDetails.lender}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          name="lead_source"
                          value={dealDetails.lead_source}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="engagement_fee"
                          value={dealDetails.engagement_fee}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="engagement_fee_paid"
                          value={dealDetails.engagement_fee_paid}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="broker_fee"
                          value={dealDetails.broker_fee}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="broker_fee_paid"
                          value={dealDetails.broker_fee_paid}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="procuration_fee"
                          value={dealDetails.procuration_fee}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="procuration_fee_paid"
                          value={dealDetails.procuration_fee_paid}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="number"
                          name="deal_commission"
                          value={dealDetails.deal_commission}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          type="date"
                          name="completion_date"
                          value={dealDetails?.completion_date?.split("T")[0]}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
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
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
            <div className="deal-update-btn">
              {stateBtn === 0 ? (
                <button disabled className="disabledBtn ">
                  Update
                </button>
              ) : (
                <button className="convertToDeal" onClick={handleUpdateClick}>
                  Update
                </button>
              )}
            </div>
          </section>
        </div>
        <div className="divRightSection">
          <div className="tab-navigation">
            <button
              className={activeTab === "notes" ? "active" : ""}
              onClick={() => handleTabClick("notes")}
            >
              <i className="fa-sharp fa-regular fa-note-sticky"></i>
              Notes ({notes})
            </button>
            <button
              className={activeTab === "email" ? "active" : ""}
              onClick={() => handleTabClick("email")}
            >
              <i className="fa-sharp fa-regular fa-envelope-open"></i>
              Email
            </button>
            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => handleTabClick("activity")}
            >
              <i className="fa-sharp fa-regular fa-calendar"></i>
              Activity
            </button>
            <button
              className={activeTab === "attachment" ? "active" : ""}
              onClick={() => handleTabClick("attachment")}
            >
              <i className="fa-sharp fa-solid fa-paperclip"></i>
              Attachment
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "notes" && (
              <div className="notes-tab-content">
                <AddNotes
                  item={dealDetails}
                  onNotesNum={fetchNotes}
                  type="deal"
                  id={id}
                />
              </div>
            )}
            {activeTab === "email" && (
              <div className="email-tab-content">
                <p>Email</p>
              </div>
            )}
            {activeTab === "activity" && (
              <div className="activity-tab-content">
                <p>Activity</p>
              </div>
            )}
            {activeTab === "attachment" && (
              <div className="attachment-tab-content">
                <p>Attachments</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default DealUpdate;
