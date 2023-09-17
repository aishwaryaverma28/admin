import React, { useEffect, useState, useRef } from "react";
import chart from "../../assets/image/chart.svg";
import Search from "../../assets/image/search.svg";
import Sort from "../../assets/image/sort.svg";
import axios from "axios";
import {
  GET_ALL_DEAL,
  MOVEDEAL_TO_TRASH,
  GET_ALL_STAGE,
  getDecryptedToken,
  GET_LABEL,
  GET_TEAM_MEM,
  USER_INFO,
  handleLogout
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DealsColn from "./DealsColn";
import CreateDeal from "./CreateDeal";
import DealDeletePopUp from "../DeleteComponent";
import ExcelJS from "exceljs";
import Papa from "papaparse"; 

const Deal = () => {
  const [stages, setStages] = useState([]);
  const [status, setStatus] = useState([]);
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [pipeopen, setPipeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const pipeDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None"); 
  const [sortOrder, setSortOrder] = useState("asc");
    const [csvData, setCsvData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [adminInfo, setAdminInfo] = useState({
      first_name: "",
      last_name: "",
      id: 0,
    });
  

    const userAdded = () => {
      axios
        .get(GET_TEAM_MEM, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          const responseData = response?.data?.data;
          const combinedData = [adminInfo, ...responseData];
          setUserData(combinedData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    async function getUser() {
      try {
        const response = await axios.get(USER_INFO, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
        });

        if (response.data.status === 1) {
          adminInfo.first_name = response?.data?.data[0]?.first_name || "";
          adminInfo.last_name = response?.data?.data[0]?.last_name || "";
          adminInfo.id = response?.data?.data[0]?.id || "";
         
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
          handleLogout();
        }
      }
    }

    useEffect(()=>{
     userAdded();
     getUser();
    },[])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  //======================================================================fetch lead data from api
  const fetchStatus = () => {
    axios
      .get(GET_ALL_STAGE+"/deal", {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const stageNames = response?.data?.message?.map(
          (item) => item.display_name
        );
        if (stageNames && stageNames.length > 0) {
          setStages(stageNames.reverse());
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

  const fetchLeadsData = () => {
    axios
      .get(GET_ALL_DEAL, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const filteredDeals = response?.data?.data.filter(
          (obj) => obj.status !== ""
        );
        setDeals(filteredDeals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Calculate status counts
    const counts = {};
    status.forEach((status) => {
      counts[status] = deals.filter((obj) => obj.status === status).length;
    });
    setStatusCounts(counts);
  }, [deals, status]);

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

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const resetData = () => {
    fetchLeadsData();
    fetchLabelData();
    fetchStatus();
  };

  useEffect(() => {
    fetchLeadsData();
    fetchLabelData();
    fetchStatus();
  }, []);

  const filterDealData = deals?.filter((item)=>{
    
    const dealName= `${item?.deal_name}`?.toLowerCase() || "";
    const dealValue= `${item?.value}`?.toLowerCase() || "";
    const dealValue2= `$${item?.value}`?.toLowerCase() || "";
    const ownerFirstName= `${item?.ownerf_name}`?.toLowerCase() || "";
    const ownerLastName= `${item?.ownerl_name}`?.toLowerCase() || "";
    const ownerFullName= `${item?.ownerf_name} ${item?.ownerl_name}`?.toLowerCase() || "";
    const closureDate= `${item?.closure_date}`.split("T")[0]?.toLowerCase() || "";
    const labelName= `${item?.label_name}`?.toLowerCase() || "";
    const searchDeal = searchQuery?.toLowerCase();

    const matchQuery = dealName.includes(searchDeal) || dealValue.includes(searchDeal) || dealValue2.includes(searchDeal) || ownerFirstName.includes(searchDeal) || ownerLastName.includes(searchDeal) || ownerFullName.includes(searchDeal) || closureDate.includes(searchDeal) || labelName.includes(searchDeal) ;
    return matchQuery; 
  });
  
  const sortData = (data, option, order) => {
    switch (option) {
      case "Amount":
        return data.slice().sort((a, b) => {
          const result = a.value - b.value;
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "LeadName":
        return data.slice().sort((a, b) => {
          const result =a.deal_name?.toLowerCase().localeCompare(b?.deal_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "Label":
        return data.slice().sort((a, b) => {
          const result =a?.label_name?.toLowerCase().localeCompare(b?.label_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "Owner":
        return data.slice().sort((a, b) => {
          const result =a?.ownerf_name?.toLowerCase().localeCompare(b?.lead_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "Closure":
        return data.slice().sort((a, b) => {
          const result =a?.closure_date?.toLowerCase().localeCompare(b?.closure_date?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      default:
        return data.slice().sort(() => {
          
          return order === "asc" ? 1 : -1; // Toggle sorting order
        }); 
    }
  };
  
  const sortedDealData = sortData(filterDealData, sortOption, sortOrder);


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
  }, [deals, status]);
  //======================================================modal box
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //===========================================================for bulk import

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const togglePipeDropdown = () => {
    setPipeOpen(!pipeopen);
  };
  const toggleSortDropdown = () => {
    setSortOpen(!sortOpen);
  };

  const exportToExcel = async () => {
    // Check if you have data to export
    if (!deals || deals.length === 0) {
      console.log("No data to export.");
      return;
    }

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Deals");

    // Add data to the worksheet
    worksheet.columns = [
      { header: "Id", key: "id", width: 20 },
      { header: "Borrower Entry", key: "borrower_entry", width: 30 },
      { header: "Broker Fee", key: "broker_fee", width: 20 },
      { header: "Broker Fee Paid", key: "broker_fee_paid", width: 20 },
      { header: "Closure Date", key: "closure_date", width: 30 },
      { header: "Completion Date", key: "completion_date", width: 30 },
      { header: "Contact", key: "contact", width: 20 },
      { header: "Creation Date", key: "creation_date", width: 30 },
      { header: "Currency", key: "currency", width: 20 },
      {
        header: "Data Enquiry Recieve",
        key: "data_enquiry_receive",
        width: 30,
      },
      { header: "Deal Comission", key: "deal_commission", width: 20 },
      { header: "Deal Name", key: "deal_name", width: 20 },
      { header: "Deposite", key: "deposit", width: 20 },
      { header: "Doc Number", key: "doc_number", width: 20 },
      { header: "Document Verified", key: "document_verified", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Engagement Fee", key: "engagement_fee", width: 20 },
      { header: "Engagement Fee Paid", key: "engagement_fee_paid", width: 20 },
      {
        header: "Introducer Firm Name",
        key: "introducer_firm_name",
        width: 20,
      },
      { header: "Introducer Name", key: "introducer_name", width: 20 },
      { header: "Is Deleted", key: "is_deleted", width: 20 },
      { header: "Label Colour", key: "label_coloure", width: 20 },
      { header: "Label Id", key: "label_id", width: 20 },
      { header: "Label Name", key: "label_name", width: 20 },
      { header: "Lead Id", key: "lead_id", width: 20 },
      { header: "Lead Source", key: "lead_source", width: 20 },
      { header: "Lender", key: "lender", width: 20 },
      { header: "Loan Amount", key: "loan_amount", width: 20 },
      { header: "Loan Type", key: "loan_type", width: 20 },
      { header: "Mobile", key: "mobile", width: 20 },
      { header: "Organization", key: "organization", width: 20 },
      { header: "Owner", key: "owner", width: 20 },
      { header: "Owner First Name", key: "ownerf_name", width: 20 },
      { header: "Owner Last Name", key: "ownerl_name", width: 20 },
      { header: "Pipeline Id", key: "pipeline_id", width: 20 },
      { header: "Probability", key: "probability", width: 20 },
      { header: "Procuration Fee", key: "procuration_fee", width: 20 },
      {
        header: "Procuration Fee Paid",
        key: "procuration_fee_paid",
        width: 20,
      },
      { header: "Security Value", key: "security_value", width: 20 },
      { header: "Stage Id", key: "stage_id", width: 20 },
      { header: "Stage Name", key: "stage_name", width: 20 },
      { header: "Status", key: "status", width: 20 },
      { header: "Type Of Security", key: "type_of_security", width: 20 },
      { header: "Update Date", key: "update_date", width: 30 },
      { header: "Value", key: "value", width: 20 },
    ];

    deals.forEach((deal) => {
      worksheet.addRow({
        id: deal.id,
        borrower_entry: deal.borrower_entry,
        broker_fee: deal.broker_fee,
        broker_fee_paid: deal.broker_fee_paid,
        closure_date: deal.closure_date,
        completion_date: deal.completion_date,
        contact: deal.contact,
        creation_date: deal.creation_date,
        currency: deal.currency,
        data_enquiry_receive: deal.data_enquiry_receive,
        deal_commission: deal.deal_commission,
        deal_name: deal.deal_name,
        deposit: deal.deposit,
        doc_number: deal.doc_number,
        document_verified: deal.document_verified,
        email: deal.email,
        engagement_fee: deal.engagement_fee,
        engagement_fee_paid: deal.engagement_fee_paid,
        introducer_firm_name: deal.introducer_firm_name,
        introducer_name: deal.introducer_name,
        is_deleted: deal.is_deleted,
        label_coloure: deal.label_coloure,
        label_id: deal.label_id,
        label_name: deal.label_name,
        lead_id: deal.lead_id,
        lead_source: deal.lead_source,
        lender: deal.lender,
        loan_amount: deal.loan_amount,
        loan_type: deal.loan_type,
        mobile: deal.mobile,
        organization: deal.organization,
        owner: deal.owner,
        ownerf_name: deal.ownerf_name,
        ownerl_name: deal.ownerl_name,
        pipeline_id: deal.pipeline_id,
        probability: deal.probability,
        procuration_fee: deal.procuration_fee,
        procuration_fee_paid: deal.procuration_fee_paid,
        security_value: deal.security_value,
        stage_id: deal.stage_id,
        stage_name: deal.stage_name,
        status: deal.status,
        type_of_security: deal.type_of_security,
        update_date: deal.update_date,
        value: deal.value,
      });
    });

    // Generate a blob containing the Excel file
    const blob = await workbook.xlsx.writeBuffer();

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "deals.xlsx";
    a.style.display = "none";

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleActionDropdown = (option) => {
    if (option === "Export") {
      // exportLeadsToCSV();
      exportToExcel();
    }
    setActionOpen(!actionopen);
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

  console.log(selectedIds);
  const handleDeleteLead = () => {
    if (selectedIds) {
      const body = {
        dealIds: selectedIds, // Use the stored ID
      };
      axios
        .delete(MOVEDEAL_TO_TRASH, {
          data: body,
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          toast.success("Deal moved to trash successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          fetchLeadsData();
          setSelectedIds([]); // Reset the stored ID
          handleDeleteClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCsvFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assume the first row contains headers
        complete: (result) => {
          // Store CSV data in state
          setCsvData(result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    }
  };
  // Function to handle "Import" menu item click
  const handleImportClick = () => {
    // Trigger a click event on the hidden file input element
    fileInputRef.current.click();
  };


  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={leadDropDownRef}>
              <div className="dropdown-header" onClick={toggleDropdown}>
                all Deals{" "}
                <i
                  className={`fa-sharp fa-solid ${
                    leadopen ? "fa-angle-up" : "fa-angle-down"
                  }`}
                ></i>
              </div>
              {leadopen && (
                <ul className="dropdown-menuLead">
                  <li>All Won Deals</li>
                  <li>All Lost Deals</li>
                  <li>All Open Deals</li>
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
        <div>
          <select name="" id="" className="common-fonts lead-nav-select">
          {userData.map((item) => (
                            <option
                              key={item?.id}
                              value={item?.id}
                              className="owner-val"
                            >
                              {`${
                                item?.first_name.charAt(0).toUpperCase() +
                                item?.first_name.slice(1)
                              } ${
                                item?.last_name.charAt(0).toUpperCase() +
                                item?.last_name.slice(1)
                              }`}
                            </option>
                          ))}
          </select>
        </div>
          </div>
          <div className="right-side--btns">
            <p>sub total: ${totalValue.toLocaleString("en-IN")}</p>
            <button type="button" className="secondary-btn" onClick={openModal}>
              Create Deal
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
            <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleCsvFileImport}
      />
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
                    <li onClick={handleDeleteOpen}>Mass Delete</li>
                    <li>Mass Update</li>
                    <li>Mass Convert</li>
                    <li>Drafts</li>
                    <li>Mass Email</li>
                    <li onClick={handleImportClick}>Import</li>
                    <li onClick={() => toggleActionDropdown("Export")}>
                      Export Deals
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="deal-sort" onClick={toggleSortOrder}>
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

                  <li onClick={() => { setSortOption("None"); setSortOrder("asc"); setSortOpen(false); }}>None</li>
                  <li onClick={() => { setSortOption("LeadName"); setSortOrder("asc"); setSortOpen(false); }}>Deal Name</li>
                    <li onClick={() => { setSortOption("Amount"); setSortOrder("asc"); setSortOpen(false); }}>Amount</li>
                    <li onClick={() => { setSortOption("Label"); setSortOrder("asc"); setSortOpen(false); }}>Label</li>
                    <li onClick={() => { setSortOption("Owner"); setSortOrder("asc"); setSortOpen(false); }}>Deal Owner</li>
                    <li onClick={() => { setSortOption("Closure"); setSortOrder("asc"); setSortOpen(false); }}>Closure Date</li>
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
                {sortedDealData.map((obj) => {
                  if (obj.status === item) {
                    return (
                      <DealsColn
                        key={obj.id}
                        object={obj}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        // status={item} // Pass the status as a prop
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

      <CreateDeal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLeadAdded={fetchLeadsData}
      />
      <ToastContainer />
      {isDeleteOpen && (
        <DealDeletePopUp
          onClose={handleDeleteClose}
          onDeleteConfirmed={handleDeleteLead}
        />
      )}
    </div>
  );
};

export default Deal;
