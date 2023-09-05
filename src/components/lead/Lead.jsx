import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import Search from "../../assets/image/search.svg";
import Sort from "../../assets/image/sort.svg";
import axios from "axios";
import LeadCards from "./LeadCards";
import CreateLead from "./CreateLead";
import LeadDeletePopUp from "../DeleteComponent";
import {
  GET_LEAD,
  IMPORT_CSV,
  EXPORT_CSV,
  MOVELEAD_TO_TRASH,
  getDecryptedToken,
  GET_LABEL,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExcelJS from "exceljs";

const Lead = () => {
  const stages = ["New", "Unread", "Open", "In Progress"];
  const status = ["New", "Unread", "Open", "In Progress"];
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [pipeopen, setPipeOpen] = useState(false);
  const pipeDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionSortRef = useRef(null);
  const [deals, setDeals] = useState([]);
  const fileInputRef = useRef(null);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const [labelData, setLabelData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedStatusesData, setSelectedStatusesData] = useState({});
  const [statusTotalValues, setStatusTotalValues] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSortDropdown = () => {
    setSortOpen(!sortOpen);
  };
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

  const exportToExcel = async () => {
    // Check if you have data to export
    if (!deals || deals.length === 0) {
      console.log("No data to export.");
      return;
    }

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Leads");

    // Add data to the worksheet
    worksheet.columns = [
      { header: "Id", key: "id", width: 20, bold: true, alignment: { horizontal: 'center' } },
      { header: "Address 1", key: "address1", width: 20 },
      { header: "Address 2", key: "address2", width: 20 },
      { header: "City", key: "city", width: 20 },
      { header: "Company Name", key: "company_name", width: 20 },
      { header: "Country", key: "country", width: 20 },
      { header: "Date Created", key: "creation_date", width: 30 },
      { header: "Doc Number", key: "doc_number", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Employees", key: "employees", width: 20 },
      { header: "First Name", key: "first_name", width: 20 },
      { header: "Last Name", key: "last_name", width: 20 },
      { header: "Is Deleted", key: "is_deleted", width: 20 },
      { header: "Label Colour", key: "label_coloure", width: 20 },
      { header: "Label Id", key: "label_id", width: 20 },
      { header: "Label Name", key: "label_name", width: 20 },
      { header: "Lead Name", key: "lead_name", width: 20 },
      { header: "Owner", key: "owner", width: 20 },
      { header: "Owner Email", key: "owner_email", width: 20 },
      { header: "Owner Phone", key: "owner_phone", width: 20 },
      { header: "Owner First Name", key: "ownerf_name", width: 20 },
      { header: "Owner Last Name", key: "ownerl_name", width: 20 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Pin", key: "pin", width: 20 },
      { header: "Position", key: "position", width: 20 },
      { header: "Registration Number", key: "registration_no", width: 20 },
      { header: "Source", key: "source", width: 20 },
      { header: "State", key: "state", width: 20 },
      { header: "Status", key: "status", width: 20 },
      { header: "Type", key: "type", width: 20 },
      { header: "Update Date", key: "update_date", width: 30 },
      { header: "Value", key: "value", width: 20 },
      { header: "Website", key: "website", width: 20 },
      // Add more columns as needed
    ];

    deals.forEach((deal) => {
      worksheet.addRow({
        id: deal.id,
        address1: deal.address1,
        address2: deal.address2,
        city: deal.city,
        company_name: deal.company_name,
        country: deal.country,
        creation_date: deal.creation_date,
        doc_number: deal.doc_number,
        email: deal.email,
        employees: deal.employees,
        first_name: deal.first_name,
        last_name: deal.last_name,
        is_deleted: deal.is_deleted,
        label_coloure: deal.label_coloure,
        label_id: deal.label_id,
        label_name: deal.label_name,
        lead_name: deal.lead_name,
        owner: deal.owner,
        owner_email: deal.owner_email,
        owner_phone: deal.owner_phone,
        ownerf_name: deal.ownerf_name,
        ownerl_name: deal.ownerl_name,
        phone: deal.phone,
        pin: deal.pin,
        position: deal.position,
        registration_no: deal.registration_no,
        source: deal.source,
        state: deal.state,
        status: deal.status,
        update_date: deal.update_date,
        value: deal.value,
        website: deal.website,
        // Add more columns as needed
      });
    });

    // Generate a blob containing the Excel file
    const blob = await workbook.xlsx.writeBuffer();

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.xlsx";
    a.style.display = "none";

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
    fetchLabelData();
  };

  const handleDeletePopUpOpen = () => {
    setIsDelete(true);
  };
  const handleMassDeletePopUpClose = () => {
    setIsDelete(false);
  };

  useEffect(() => {
    fetchLeadsData();
    fetchLabelData();
  }, []);

  const filterDealData = deals?.filter((item)=>{
    
    const dealName= `${item?.lead_name}`.toLowerCase() || "";
    const dealValue= `${item?.value}`.toLowerCase() || "";
    const dealValue2= `$${item?.value}`.toLowerCase() || "";
    const ownerFirstName= `${item?.ownerf_name}`.toLowerCase() || "";
    const ownerLastName= `${item?.ownerl_name}`.toLowerCase() || "";
    const ownerFullName= `${item?.ownerf_name} ${item?.ownerl_name}`.toLowerCase() || "";
    const closureDate= `${item?.closure_date}`.split("T")[0].toLowerCase() || "";
    const labelName= `${item?.label_name}`.toLowerCase() || "";
    const searchDeal = searchQuery.toLowerCase();

    const matchQuery = dealName.includes(searchDeal) || dealValue.includes(searchDeal) || dealValue2.includes(searchDeal) || ownerFirstName.includes(searchDeal) || ownerLastName.includes(searchDeal) || ownerFullName.includes(searchDeal) || closureDate.includes(searchDeal) || labelName.includes(searchDeal) ;
    return matchQuery; 
  });

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

  useEffect(() => {
    const calculateStatusTotalValues = () => {
      const statusTotals = {};
      status.forEach((status) => {
        const totalValueForStatus = deals
          .filter((deal) => deal.status === status)
          .reduce((sum, deal) => sum + Number(deal.value), 0);
        statusTotals[status] = totalValueForStatus;
      });
      setStatusTotalValues(statusTotals);
    };
    calculateStatusTotalValues();
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
          position: "top-center",
          autoClose: 2000,
        });
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
    if (option === "Export") {
      // exportLeadsToCSV();
      exportToExcel();
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
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error exporting leads:", error);
      toast.error("Error exporting leads", {
        position: "top-center",
        autoClose: 2000,
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

    const handleOutsideClick4 = (event) => {
      if (
        actionSortRef.current &&
        !actionSortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick2);
    document.addEventListener("click", handleOutsideClick3);
    document.addEventListener("click", handleOutsideClick4);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick2);
      document.removeEventListener("click", handleOutsideClick3);
      document.removeEventListener("click", handleOutsideClick4);
    };
  }, []);

  const handleChildCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

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
    const idsWithStatus = deals
      .filter((deal) => deal.status === status)
      .map((deal) => deal.id);

    if (areAllChildCheckboxesChecked(status)) {
      setSelectedIds(selectedIds.filter((id) => !idsWithStatus.includes(id)));
      setSelectedStatusesData((prevData) => ({
        ...prevData,
        [status]: false,
      }));
    } else {
      setSelectedIds([...selectedIds, ...idsWithStatus]);
      setSelectedStatusesData((prevData) => ({
        ...prevData,
        [status]: true,
      }));
    }
  };

  const handleDeleteLead = () => {
    if (selectedIds) {
      const body = {
        leadIds: [selectedIds], // Use the stored ID
      };
      axios
        .delete(MOVELEAD_TO_TRASH, {
          data: body,
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success("Lead moved to trash successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      fetchLeadsData();
      setSelectedIds([]); // Reset the stored ID
      handleMassDeletePopUpClose();
    }
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
            <div className="recycle-search-box">
          <input
            type="text"
            className="recycle-search-input recycle-fonts"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="recycle-search-icon">
            <img src={Search} alt="" />
          </span>
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
                    {/* <li onClick={() => toggleActionDropdown("Delete")}>
                      Mass Delete
                    </li> */}
                    <li onClick={handleDeletePopUpOpen}>Mass Delete</li>
                    <li>Mass Update</li>
                    <li>Mass Convert</li>
                    <li>Drafts</li>
                    <li>Mass Email</li>
                    <li onClick={handleButtonClick}>Import</li>
                    <li onClick={() => toggleActionDropdown("Export")}>
                      Export Leads
                    </li>
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
            <div className="deal-sort">
              <img src={Sort} alt="" />
            </div>
            <div className="select action-select">
              <div className="dropdown-container" ref={actionSortRef}>
                <div
                  className="dropdown-header2"
                  onClick={toggleSortDropdown}
                >
                  Sort By
                  <i
                    className={`fa-sharp fa-solid ${
                      actionopen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </div>
                {sortOpen && (
                  <ul className="dropdown-menu">

                    <li >None</li>
                    <li>Amount</li>
                    <li>Closing Date</li>
                    <li>Contact Name</li>
                    <li>Created By</li>
                    <li>Deal Name</li>
                    <li>Deal Owner</li>
                    <li>Lead Source</li>
                    <li>Probability</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              className="helpBtn genral-refresh-icon"
              title="Refresh"
              onClick={resetData}
            >
              <i class="fa-sharp fa-solid fa-rotate "></i>
            </button>
          </div>
        </div>
      </section>
      <section className="cards-body">
        {status.map((item, index) => (
          <div className="card-column" key={index}>
            <div className="card-details">
              <div className="main-cards">
                <div className="cards-new">
                  <p className="DealName">
                    {stages[index]} ({statusCounts[item]})
                  </p>
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
                {filterDealData.map((obj) => {
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
              <div className="bottom-fixed">
                <p>
                  {" "}
                  Total Value: $
                  {statusTotalValues[item]?.toLocaleString("en-IN") || 0}
                </p>
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
      {isDelete && (
        <LeadDeletePopUp
          onClose={handleMassDeletePopUpClose}
          onDeleteConfirmed={handleDeleteLead}
        />
      )}
    </div>
  );
};

export default Lead;
