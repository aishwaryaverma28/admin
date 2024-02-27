import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import chart from "../../assets/image/chart.svg";
import pound from "../../assets/image/british-pound-symbol.svg";
import Search from "../../assets/image/search.svg";
import Sort from "../../assets/image/sort.svg";
import axios from "axios";
import LeadCards from "./LeadCards";
import CreateLead from "./CreateLead";
import { cities } from "../utils/cities.js";
import LeadDeletePopUp from "../DeleteComponent";
import {
  IMPORT_CSV,
  MOVELEAD_TO_TRASH,
  getDecryptedToken,
  ACADMEY_SEARCH,
  GET_LABEL,
  GET_ACTIVE_TEAM_MEM,
  GET_OWNER_LEAD,
  LOG_RECORD,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExcelJS from "exceljs";
import Papa from "papaparse";
import MassUpdateModal from "./MassUpdateModal.jsx";

const Lead = () => {
  const [stages, setStages] = useState([
    {
      "id": 1,
      "stage": "new"
    },
    {
      "id": 2,
      "stage": "contact"
    },
    {
      "id": 3,
      "stage": "no contact"
    },
    {
      "id": 4,
      "stage": "profile complete"
    },
    {
      "id": 5,
      "stage": "profile not complete"
    },
    {
      "id": 6,
      "stage": "lead Shared"
    }
  ]
  );
  const orgId = localStorage.getItem('org_id');
  const [leadopen, setLeadOpen] = useState(false);
  const leadDropDownRef = useRef(null);
  const [pipeopen, setPipeOpen] = useState(false);
  const [actionopen, setActionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionSortRef = useRef(null);
  const actionOwnerRef = useRef(null);
  const [deals, setDeals] = useState([]);
  const fileInputRef = useRef(null);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const [labelData, setLabelData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedStatusesData, setSelectedStatusesData] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [sortOrder, setSortOrder] = useState("asc");
  const [csvData, setCsvData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [display, setDisplay] = useState("Select Owner");
  const role_name = localStorage.getItem("role_name");
  const [massUpdateModalOpen, setMassUpdateModalOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    first_name: "",
    last_name: "",
    id: 0,
  });
  const [data, setData] = useState("");
  const [sportsLead, setSportsLead] = useState('');
  const [cityLead, setCityLead] = useState('');
  const [fStageId, setFStageId] = useState(0);
  const [acadmey, setAcademy] = useState([])
  const [limit, setLimit] = useState(500);
  useEffect(() => {
    getAllAcademy();
  }, [limit]); 
  const handleSportsChange = (event) => {
    setSportsLead(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityLead(event.target.value);
  };
  const handleDataReceived = (newData) => {
    setData(newData);
  };
  const handleMassUpdate = () => {
    setMassUpdateModalOpen(true);
  };
  const handleMassUpdateClose = () => {
    setMassUpdateModalOpen(false);
    setSelectedIds([]);
  };

  const handleOwnerClick = (id, firstName, lastName) => {
    axios
      .get(GET_OWNER_LEAD + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setDeals(response?.data?.data);
        const fullName = `${firstName} ${lastName}`;
        setDisplay(fullName);
      })
      .catch((error) => {
        console.log(error);
      });

    setOwnerOpen(false);
  };
  //=========================================================get all acadmies
  const getAllAcademy = () => {
    axios.post(ACADMEY_SEARCH, {
      condition: "all",
      limit_from: "1",
      limit_to: limit.toString(),
    }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`
      }
    }
    ).then((response) => {
      console.log(response?.data?.data)
      setAcademy(response?.data?.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleLoadMore = () => {
    setLimit(prevLimit => prevLimit + 500); 
  }

  const userAdded = () => {
    axios
      .post(GET_ACTIVE_TEAM_MEM, { orgId: orgId }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const responseData = response?.data?.data;
        setUserData(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userAdded();
  }, [orgId])

  useEffect(() => {
    const counts = {};
    stages.forEach((item) => {
      counts[item.id] = acadmey.filter((obj) => obj.stage === item.id).length;
    });
    setStatusCounts(counts);
  }, [acadmey, stages]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSortDropdown = () => {
    setSortOpen(!sortOpen);
  };
  const toggleOwnerDropdown = () => {
    setOwnerOpen(!ownerOpen);
  };
  //======================================================================fetch lead data from api
  const logRecord = () => {
    const updatedFormData = {
      attr1: "lead:export",
      attr4: "lead exported",
    };
    axios
      .post(LOG_RECORD, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success("export successfull", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Some Error Occured", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportToExcel = async () => {
    if (!deals || deals.length === 0) {
      console.log("No data to export.");
      return;
    }
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Leads");
    worksheet.columns = [
      {
        header: "Id",
        key: "id",
        width: 20,
        bold: true,
        alignment: { horizontal: "center" },
      },
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
      });
    });

    const csv = Papa.unparse(deals);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    logRecord();
  };

  const fetchLabelData = async () => {
    const body = {
      org_id: orgId
    }
    try {
      const response = await axios.post(GET_LABEL, body, {
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
    getAllAcademy();
    fetchLabelData();
  };

  const handleDeletePopUpOpen = () => {
    setIsDelete(true);
  };
  const handleMassDeletePopUpClose = () => {
    setIsDelete(false);
  };

  useEffect(() => {
    fetchLabelData();
    getAllAcademy();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterDealData = deals?.filter((item) => {
    const dealName = `${item?.lead_name}`?.toLowerCase() || "";
    const dealValue = `${item?.value}`?.toLowerCase() || "";
    const dealValue2 = `$${item?.value}`?.toLowerCase() || "";
    const ownerFirstName = `${item?.ownerf_name}`?.toLowerCase() || "";
    const ownerLastName = `${item?.ownerl_name}`?.toLowerCase() || "";
    const ownerFullName =
      `${item?.ownerf_name} ${item?.ownerl_name}`?.toLowerCase() || "";
    const closureDate =
      `${item?.closure_date}`.split("T")[0].toLowerCase() || "";
    const labelName = `${item?.label_name}`.toLowerCase() || "";
    const searchDeal = searchQuery.toLowerCase();

    const matchQuery =
      dealName?.includes(searchDeal) ||
      dealValue?.includes(searchDeal) ||
      dealValue2?.includes(searchDeal) ||
      ownerFirstName?.includes(searchDeal) ||
      ownerLastName?.includes(searchDeal) ||
      ownerFullName?.includes(searchDeal) ||
      closureDate?.includes(searchDeal) ||
      labelName?.includes(searchDeal);
    return matchQuery;
  });

  const sortData = (data, option, order) => {
    switch (option) {
      case "Amount":
        return data?.slice()?.sort((a, b) => {
          const result = a?.value - b?.value;
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "LeadName":
        return data?.slice()?.sort((a, b) => {
          const result = a?.lead_name
            ?.toLowerCase()
            .localeCompare(b?.lead_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "Label":
        return data?.slice()?.sort((a, b) => {
          const result = a?.label_name
            ?.toLowerCase()
            .localeCompare(b?.label_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      case "Owner":
        return data?.slice()?.sort((a, b) => {
          const result = a.ownerf_name
            ?.toLowerCase()
            ?.localeCompare(b?.lead_name?.toLowerCase());
          return order === "asc" ? result : -result; // Toggle sorting order
        });
      default:
        return data?.slice()?.sort(() => {
          return order === "asc" ? 1 : -1; // Toggle sorting order
        });
    }
  };

  const sortedDealData = sortData(filterDealData, sortOption, sortOrder);


  //======================================================modal box
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleDropdown = () => {
    setLeadOpen(!leadopen);
  };
  const togglePipeDropdown = () => {
    setPipeOpen(!pipeopen);
  };
  const toggleActionDropdown = (option) => {
    if (option === "Export") {
      exportToExcel();
    }
    setActionOpen(!actionopen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        leadDropDownRef.current &&
        !leadDropDownRef.current.contains(event.target)
      ) {
        setLeadOpen(false);
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
    const handleOutsideClick5 = (event) => {
      if (
        actionOwnerRef.current &&
        !actionOwnerRef.current.contains(event.target)
      ) {
        setOwnerOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick3);
    document.addEventListener("click", handleOutsideClick4);
    document.addEventListener("click", handleOutsideClick5);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick3);
      document.removeEventListener("click", handleOutsideClick4);
      document.removeEventListener("click", handleOutsideClick5);
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
          toast.success("Lead moved to trash successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      getAllAcademy();
      setSelectedIds([]);
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

  const handleCsvFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const dataWithIntValues = result?.data.map((row) => ({
            ...row,
            value: parseInt(row?.value), // Parse the "value" field as an integer
            stage_id: parseInt(fStageId),
            org_id: parseInt(orgId)
          }));
          // Store CSV data in state
          const dataWithoutLastValue = dataWithIntValues?.slice(0, -1);
          setCsvData(dataWithoutLastValue);
          postCsvDataToAPI(dataWithoutLastValue);
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
  const postCsvDataToAPI = async (csvData) => {
    try {
      const response = await axios.post(
        IMPORT_CSV,
        {
          data: csvData,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      if (response.data.status === 1) {
        toast.success("Import successfull", {
          position: "top-center",
          autoClose: 2000,
        });
        getAllAcademy();
        // You can add further logic here if needed
      } else {
        toast.error("Some Error Occured", {
          position: "top-center",
          autoClose: 2000,
        });
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error posting CSV data:", error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={leadDropDownRef}>
              <div className="dropdown-header" onClick={toggleDropdown}>
                all Leads{" "}
                <i
                  className={`fa-sharp fa-solid ${leadopen ? "fa-angle-up" : "fa-angle-down"
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
            {role_name === "admin" && (
              <div className="dropdown-container" ref={actionOwnerRef}>
                <div className="dropdown-header2" onClick={toggleOwnerDropdown}>
                  {display}
                  <i
                    className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                  ></i>
                </div>
                {ownerOpen && (
                  <ul className="dropdown-menu owner-menu">
                    {userData
                      ?.slice()
                      ?.reverse()
                      ?.map((item) => (
                        <li
                          key={item?.id}
                          value={item?.id}
                          className="owner-val"
                          onClick={() =>
                            handleOwnerClick(
                              item.id,
                              item?.first_name.charAt(0).toUpperCase() +
                              item?.first_name?.slice(1),
                              item?.last_name?.charAt(0)?.toUpperCase() +
                              item?.last_name?.slice(1)
                            )
                          }
                        >
                          {`${item?.first_name?.charAt(0)?.toUpperCase() +
                            item?.first_name?.slice(1)
                            } ${item?.last_name?.charAt(0)?.toUpperCase() +
                            item?.last_name?.slice(1)
                            }`}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}

          </div>
          <div className="right-side--btns">
            <button type="button" className="secondary-btn" onClick={openModal}>
              Create Lead
            </button>
            <div className="select action-select">
              <label for="browserChoice">Sports:</label>
              <input list="sports_leads" name="sports_lead" id="sports_lead" value={sportsLead}
                onChange={handleSportsChange}></input>
              <datalist id="sports_leads">
                <option value="Archery"></option>
                <option value="Arts"></option>
                <option value="Athletics"></option>
                <option value="Badminton"></option>
                <option value="Basketball"></option>
                <option value="Billiards"></option>
                <option value="Boxing"></option>
                <option value="Chess"></option>
                <option value="Cricket"></option>
                <option value="Fencing"></option>
                <option value="Football"></option>
                <option value="Golf"></option>
                <option value="Hockey"></option>
                <option value="Kabaddi"></option>
                <option value="Karate"></option>
                <option value="Kho-Kho"></option>
                <option value="MMA"></option>
                <option value="Motorsports"></option>
                <option value="Rugby"></option>
                <option value="Shooting"></option>
                <option value="Skating"></option>
                <option value="Sports"></option>
                <option value="Squash"></option>
                <option value="Swimming"></option>
                <option value="Table-Tennis"></option>
                <option value="Taekwondo"></option>
                <option value="Tennis"></option>
                <option value="Volleyball"></option>
                <option value="Wrestling"></option>
                <option value="Yoga"></option>
                <option value="Bodybuilding"></option>
              </datalist>
            </div>
            <div className="select action-select">
              <label htmlFor="browserChoice">City:</label>
              <input list="city_leads" name="city_lead" id="city_lead" value={cityLead} onChange={handleCityChange}></input>
              <datalist id="city_leads">
                {cities.map((city, index) => (
                  <option key={index} value={city}></option>
                ))}
              </datalist>
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
                    className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                  ></i>
                </div>
                {actionopen && (
                  <ul className="dropdown-menu">
                    {/* <li onClick={() => toggleActionDropdown("Delete")}>
                      Mass Delete
                    </li> */}
                    <li onClick={handleDeletePopUpOpen}>Mass Delete</li>
                    <li onClick={handleMassUpdate}>Mass Update</li>
                    {/* <li>Mass Convert</li> */}
                    {/* <li>Drafts</li> */}
                    {/* <li>Mass Email</li> */}
                    <li onClick={handleImportClick}>Import</li>
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
            <div className="deal-sort" onClick={toggleSortOrder}>
              <img src={Sort} alt="" />
            </div>
            <div className="select action-select">
              <div className="dropdown-container" ref={actionSortRef}>
                <div className="dropdown-header2" onClick={toggleSortDropdown}>
                  Sort By
                  <i
                    className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                  ></i>
                </div>
                {sortOpen && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => {
                        setSortOption("None");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      None
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("LeadName");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Lead Name
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Amount");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Amount
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Label");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Label
                    </li>
                    <li
                      onClick={() => {
                        setSortOption("Owner");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                    >
                      Lead Owner
                    </li>
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
        {stages.map((item, index) => (
          <div className="card-column" key={index}>
            <div className="card-details">
              <div className="main-cards">
                <div className="cards-new">
                  <p className="DealName">
                    {item.stage}({statusCounts[item.id]})
                  </p>
                  {statusCounts[item.id] > 0 && (
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
                {acadmey.map((obj) => {
                  if (obj.stage === item.id) {
                    return (
                      <LeadCards
                        key={obj.id}
                        object={obj}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        onLeadAdded={getAllAcademy}
                        userData={userData}
                      />
                    );
                  }
                  return null;
                })}
                {statusCounts[item.id] > 0 && (
                 <button onClick={handleLoadMore}>Load More</button>
                )}
              </div>
              <div className="bottom-fixed">

              </div>
            </div>
          </div>
        ))}
      </section>

      <CreateLead
        isOpen={isModalOpen}
        onClose={closeModal}
        onLeadAdded={getAllAcademy}
        text="lead"
      />
      <ToastContainer />
      {isDelete && (
        <LeadDeletePopUp
          onClose={handleMassDeletePopUpClose}
          onDeleteConfirmed={handleDeleteLead}
        />
      )}

      {massUpdateModalOpen && (
        <MassUpdateModal
          onClose={handleMassUpdateClose}
          userData={userData}
          text="Lead"
          ids={selectedIds}
          handleDataReceived={handleDataReceived}
          getAllAcademy={getAllAcademy}
        />
      )}
    </div>
  );
};

export default Lead;
