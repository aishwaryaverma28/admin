import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/DealUpdate.css";
import LeftArrow from "../../assets/image/arrow-left.svg";
import GreaterLeft from "../../assets/image/greater-left.svg";
import GreaterRight from "../../assets/image/greater-right.svg";
import axios from "axios";
import {
  GETNOTEDEAL,
  GET_DEAL_ID,
  handleLogout,
  getDecryptedToken,
  GET_LABEL,
} from "../utils/Constants";
import AddNotes from "../AddNotes";

const DealUpdate = () => {
  const { id } = useParams();
  const decryptedToken = getDecryptedToken();
  const [labelData, setLabelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dealDetails, setDealDetails] = useState({});
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
  }
  const handleCompany = () => {
    setIsCompanyOpen(!isCompanyOpen);
  }
  const handleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  }

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
    "completion",
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

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleStages = stages.slice(currentIndex, currentIndex + 4);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const canShowPrev = currentIndex > 0;

  const lastVisibleStageIndex = currentIndex + visibleStages.length - 1;
  const lastStageIndex = stages.length - 1;
  const canShowLeftScrollArrow = lastVisibleStageIndex < lastStageIndex;

  const fetchLead = () => {
    axios
      .get(GET_DEAL_ID + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setDealDetails(response?.data?.data[0]);
        console.log(response.data.data[0]);
        console.log("helo");
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
  // console.log(notes);

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setIsDisabled(!isDisabled);
  };

  const handleNameChange = (e) => {
    setValue(e.target.value);
    setStateBtn(1);
  };

  const mergedLabels = labelData
    .filter((item) => item?.entity?.includes("deals"))
    .map((item) => ({
      id: item?.id,
      name: item?.name,
      colour_code: item?.colour_code,
    }));

  const normalStylingSelect1 = {
    backgroundColor: dealDetails?.label_coloure,
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

    if (name === "label") {
      const selectedLabelData = mergedLabels.find(
        (label) => label.id === parseInt(value)
      );
      setEditedItem({
        ...editedItem,
        label_id: selectedLabelData.id,
      });
    } else {
      setEditedItem({
        ...editedItem,
        [name]: value,
      });
    }

    setStateBtn(1);
  };
  return (
    <>
      <div className="backToDeal">
        <Link to={"/lp/deals"}>
          <button className="common-fonts">
            <img src={LeftArrow} alt="" />
          </button>
        </Link>
        <p className="dealName">{dealDetails.deal_name}</p>
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
          {visibleStages.map((cards, index) => {
            return (
              <div
                className={` arrow-pointer ${
                  cards === "Enquiry received" ? "arrow-blue" : ""
                }`}
                style={{
                  backgroundColor:
                    cards === "Enquiry received" ? "#2b74da" : "#f3f3f3",
                  color: cards === "Enquiry received" ? "green" : "#1e2224",
                }}
                key={index}
              >
                <p
                  className="common-fonts arrow-text"
                  style={{
                    color: cards === "Enquiry received" ? "white" : "#1e2224",
                  }}
                >
                  {" "}
                  {cards} (3 days)
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
        <select name="" id="" className="common-fonts ud-select">
          {stages.map((stages, index) => {
            return (
              <option value={status[index]} key={index}>
                {stages}
              </option>
            );
          })}
        </select>
      </div>

      <main className="dealcontainer">
        <div className="dealLeftSection">
          <section>
            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleSummary}>
              {
                isSummaryOpen ? <i class="fa-sharp fa-solid fa-angle-up"></i> : <i class="fa-sharp fa-solid fa-angle-down"></i>
              }
    
                Summary
              </p>
              <p className="addProduct">
                <i class="fa-sharp fa-solid fa-plus"></i>Add Product
              </p>
            </div>
            {
              isSummaryOpen && (

                <div className="detailsContent">
              <div className="dealsLeftContainer">
                <p>Value</p>
                <p>Lable</p>
                <p>Contact Person</p>
                <p>Organization</p>
                <p>Owner</p>
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
                          isEditable ? editStylingSelect1 : normalStylingSelect1
                        }
                        className={isDisabled ? "disabled" : ""}
                      >
                        {dealDetails.label_name && (
                          <option value={dealDetails.label_name}>
                            {dealDetails.label_name}
                          </option>
                        )}
                        {mergedLabels.map((item) => (
                          <option key={item?.id} value={item?.id}>
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
                        value={"-"}
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
                        value={
                          dealDetails?.ownerf_name +
                          " " +
                          dealDetails?.ownerl_name
                        }
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
                        value={
                          dealDetails?.closure_date
                            ? formatDate(dealDetails.closure_date)
                            : ""
                        }
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

              )
            }


            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleCompany}>
              {
                isCompanyOpen ? <i class="fa-sharp fa-solid fa-angle-up"></i> : <i class="fa-sharp fa-solid fa-angle-down"></i>
              }
                Company
              </p>
            </div>

            {
              isCompanyOpen && (

                
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
                        value={"-"}
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

              )
            }


            <div className="summaryDiv">
              <p className="dealSectionHead" onClick={handleDetails}>
              {
                isDetailsOpen ? <i class="fa-sharp fa-solid fa-angle-up"></i> : <i class="fa-sharp fa-solid fa-angle-down"></i>
              }
                Details
              </p>
            </div>

            {
              isDetailsOpen && (
                
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
                        value={"-"}
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
              )
            }

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
    </>
  );
};

export default DealUpdate;
