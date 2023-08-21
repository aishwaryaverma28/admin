import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import axios from "axios";
// import LeadsColn from "../LeadsColn";
import LeadCards from "./LeadCards";
import CreateLead from "../CreateLead";
import {
  GET_LEAD,
  IMPORT_CSV,
  EXPORT_CSV,
  MOVELEAD_TO_TRASH,
  getDecryptedToken,
  GET_LABEL
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lead = () => {
    const stages = [
        "New", "Unread", "Open", "InProgress"
      ];
      const status = [
        "New", "Unread", "Open", "InProgress"
      ];
      const [leadopen, setLeadOpen] = useState(false);
      const leadDropDownRef = useRef(null);
      const [pipeopen, setPipeOpen] = useState(false);
      const pipeDropDownRef = useRef(null);
      const [actionopen, setActionOpen] = useState(false);
      const actionDropDownRef = useRef(null);
      const [deals, setDeals] = useState([]);
      const fileInputRef = useRef(null);
      const [totalValue, setTotalValue] = useState(0);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const decryptedToken = getDecryptedToken();
      const [labelData, setLabelData] = useState([]);
      const [statusCounts, setStatusCounts] = useState({});
      const [selectedStatus, setSelectedStatus] = useState("");
      const [selectedIds, setSelectedIds] = useState([]);
      const [selectedStatusesData, setSelectedStatusesData] = useState({});
    
      //======================================================================fetch lead data from api
      const fetchLeadsData = () => {
        axios
          .get(GET_LEAD, {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
          .then((response) => {
            setDeals(response?.data?.data);
    console.log(response?.data?.data);
            // Calculate status counts
            const counts = {};
            status.forEach((status) => {
              counts[status] = response?.data?.data.filter(
                (obj) => obj.status === status
              ).length;
            });
            setStatusCounts(counts);
          })
          .catch((error) => {
            console.log(error);
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
          } else {
            if (response.data.message === "Token has expired") {
              alert(response.data.message);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const resetData = () => {
        fetchLeadsData();
      };
    
      useEffect(() => {
        fetchLeadsData();
        fetchLabelData();
      }, []);
    
      // ======================================================================calculate total value of all leads
      useEffect(() => {
        const calculateTotalValue = () => {
          let sum = 0;
          deals.forEach((lead) => {
            const value = Number(lead.value); // Parse value as a number
            if (!isNaN(value)) {
              sum += value;
            }
          });
          return sum;
        };
        setTotalValue(calculateTotalValue());
      }, [deals]);
      //======================================================modal box
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      const handleButtonClick = async () => {
        fileInputRef.current.click();
      };
    //===========================================================for bulk import
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", "125"); // Replace "yourUserId" with the actual user ID

      try {
        await axios.post(IMPORT_CSV, formData, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
        });
        toast.success("File uploaded successfully", {
          position:"top-center",
          autoClose:2000
        })
        // Handle the success case as needed
      } catch (error) {
        alert("File upload failed", error);
        // Handle the error case as needed
      }
    }
    fetchLeadsData();
  };

    
      // Function to toggle the dropdown menu
      const toggleDropdown = () => {
        setLeadOpen(!leadopen);
      };
      const togglePipeDropdown = () => {
        setPipeOpen(!pipeopen);
      };
      const toggleActionDropdown = (option) => {
        if (option === "Export"){
          exportLeadsToCSV();
        }
        setActionOpen(!actionopen);
      };

      const exportLeadsToCSV = async () => {
        try {
          const response = await axios.get(
            EXPORT_CSV, // Replace with your GET API endpoint
            {
              headers: {
                Authorization: `Bearer ${decryptedToken}`,
              },
              responseType: "blob", // Set response type to blob to handle binary data
              params: {
                leadIds: selectedIds.join(","), // Convert selected card IDs to a comma-separated string
              },
            }
          );
      
          // Create a Blob object from the response data
          const blob = new Blob([response.data], { type: "text/csv" });
      
          // Create a download link and trigger a click event to download the CSV file
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "leads.csv"; // Set the download attribute
          link.style.display = "none"; // Hide the link
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      
          toast.success("Leads exported successfully", {
            position: "top-center",
            autoClose:2000
          });
        } catch (error) {
          console.error("Error exporting leads:", error);
          toast.error("Error exporting leads", {
            position: "top-center",
            autoClose:2000
          });
        }
      };      
      // Effect hook to add click event listener when the component mounts
      useEffect(() => {
        const handleOutsideClick = (event) => {
          if (
            leadDropDownRef.current &&
            !leadDropDownRef.current.contains(event.target)
          ) {
            setLeadOpen(false);
          }
        };
        const handleOutsideClick2 = (event) => {
          if (
            pipeDropDownRef.current &&
            !pipeDropDownRef.current.contains(event.target)
          ) {
            setPipeOpen(false);
          }
        };
        const handleOutsideClick3 = (event) => {
          if (
            actionDropDownRef.current &&
            !actionDropDownRef.current.contains(event.target)
          ) {
            setActionOpen(false);
          }
        };
    
        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("click", handleOutsideClick2);
        document.addEventListener("click", handleOutsideClick3);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener("click", handleOutsideClick);
          document.removeEventListener("click", handleOutsideClick2);
          document.removeEventListener("click", handleOutsideClick3);
        };
      }, []);
    
      const handleChildCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
          setSelectedIds([...selectedIds, id]);
        }
      };
      console.log(selectedIds);
      
      const areAllChildCheckboxesChecked = (status) => {
        if (selectedStatusesData[status]) {
          const idsWithStatus = deals
            .filter((deal) => deal.status === status)
            .map((deal) => deal.id);
          return idsWithStatus.every((id) => selectedIds.includes(id));
        }
        return false;
      };
    
      const handleHeaderCheckboxChange = (status) => {
        if (selectedStatusesData[status]) {
          setSelectedStatusesData((prevData) => ({
            ...prevData,
            [status]: false,
          }));
          setSelectedIds(
            selectedIds.filter((id) =>
              deals.find((deal) => deal.status === status && deal.id === id)
            )
          );
        } else {
          setSelectedStatusesData((prevData) => ({
            ...prevData,
            [status]: true,
          }));
      
          // Get the IDs of deals with the selected status
          const ids = deals
            .filter((deal) => deal.status === status)
            .map((deal) => deal.id);
      
          // Merge the IDs with the current selectedIds array
          setSelectedIds([...selectedIds, ...ids]);
        }
      
        // Also handle child checkboxes for this status
        deals
          .filter((deal) => deal.status === status)
          .forEach((deal) => handleChildCheckboxChange(deal.id));
      };
      
      const mergedLabels = labelData
        .filter((item) => item?.entity?.includes("leads"))
        .map((item) => ({
          id: item?.id,
          name: item?.name,
          colour_code: item?.colour_code,
        }));

  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={leadDropDownRef}>
              <div className="dropdown-header" onClick={toggleDropdown}>
                all Leads{" "}
                <i
                  className={`fa-sharp fa-solid ${
                    leadopen ? "fa-angle-up" : "fa-angle-down"
                  }`}
                ></i>
              </div>
              {leadopen && (
                <ul className="dropdown-menuLead">
                  <li>Lead 1</li>
                  <li>Lead 2</li>
                  <li>Lead 3</li>
                </ul>
              )}
            </div>
            <div className="view">
              <a href="#" className="grid-view--btn active-btn">
                <img src={chart} alt="chart" />
              </a>
              <a href="#" className="list-view--btn">
                <i className="fas fa-list-ul"></i>
              </a>
            </div>
          </div>
          <div className="right-side--btns">
            <p>sub total: ${totalValue.toLocaleString("en-IN")}</p>
            <button type="button" className="secondary-btn" onClick={openModal}>
              Create Lead
            </button>
            <div className="select action-select">
              <div className="dropdown-container" ref={pipeDropDownRef}>
                <div className="dropdown-header3" onClick={togglePipeDropdown}>
                  New Pipeline{" "}
                  <i
                    className={`fa-sharp fa-solid ${
                      pipeopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </div>
                {pipeopen && (
                  <ul className="pipelineMenu">
                    <li>Pipeline 1</li>
                    <li>Pipeline 2</li>
                    <li>Pipeline 3</li>
                    <li>Pipeline 4</li>
                    <li>Pipeline 5</li>
                    <li>Pipeline 6</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="importDiv">
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="simple-btn"
                onClick={handleButtonClick}
              >
                import
              </button>
            </div>
            <div className="select action-select">
              <div className="dropdown-container" ref={actionDropDownRef}>
                <div
                  className="dropdown-header2"
                  onClick={toggleActionDropdown}
                >
                  Actions{" "}
                  <i
                    className={`fa-sharp fa-solid ${
                      actionopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </div>
                {actionopen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => toggleActionDropdown("Delete")}>
                      Mass Delete
                    </li>
                    <li>Mass Update</li>
                    <li>Mass Convert</li>
                    <li>Drafts</li>
                    <li>Mass Email</li>
                    <li onClick={() => toggleActionDropdown("Export")}>Export Leads</li>
                  </ul>
                )}

                {/* <div className="popup-container">
                    <div className="popup">
                      <p className="popupHead">Delete Selected Deals</p>
                      <p>Deleted deals will be in recycle bin for 90 days</p>
                      <p className="deleteMsg">
                        Are you sure you want to delete all selected deals?
                      </p>
                      <div className="popup-buttons">
                        <button
                          className="cancelBtn"
                        >
                          Cancel
                        </button>
                        <button
                          className="confirmBtn"
                        >
                          Delete Lead
                        </button>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cards-body">
  {status.map((item, index) => (
    <div className="card-column" key={index}>
      <div className="card-details">
        <div className="main-cards">
          <div className="cards-new">
            <p className="DealName">{stages[index]} ({statusCounts[item]})</p>
            {statusCounts[item] > 0 && (
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  className={`cb1 ${item}-header-checkbox`}
                  name="headerCheckBox"
                  checked={
                    selectedStatusesData[item] &&
                    areAllChildCheckboxesChecked(item)
                  }
                  onChange={() => handleHeaderCheckboxChange(item)}
                />
                <span className="checkmark"></span>
              </label>
            )}
          </div>
          {deals.map((obj) => {
            if (obj.status === item) {
              return (
                <LeadCards
                  key={obj.id}
                  object={obj}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  onLeadAdded={fetchLeadsData}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  ))}
</section>

      <CreateLead
        isOpen={isModalOpen}
        onClose={closeModal}
        onLeadAdded={fetchLeadsData}
        mergedLabels={mergedLabels}
      />
      <ToastContainer />
    </div>

  )
}

export default Lead