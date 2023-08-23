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

      <main className="dealcontainer">
        <div className="dealLeftSection">
          <section>
            <div className="summaryDiv">
              <p className="dealSectionHead">
                <i class="fa-sharp fa-solid fa-angle-up"></i>
                {/* <i class="fa-sharp fa-solid fa-angle-down"></i> */}
                Summary
              </p>
              <p className="addProduct">
                <i class="fa-sharp fa-solid fa-plus"></i>Add Product
              </p>
            </div>
            <div className="detailsContent">
              <div className="detailsLeftContainer">
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
                    <span>{dealDetails.value}</span>
                  )}
                </p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span
                      style={{ backgroundColor: dealDetails.label_coloure }}
                    >
                      {dealDetails.label_name === null
                        ? "-"
                        : dealDetails.label_name}
                    </span>
                  )}
                </p>
                <p>-</p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>{dealDetails.organization}</span>
                  )}
                </p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      {dealDetails.ownerf_name + " " + dealDetails.ownerl_name}
                    </span>
                  )}
                </p>
              </div>
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
    </>
  );
};

export default DealUpdate;
