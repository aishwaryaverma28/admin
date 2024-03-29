import React, { useEffect, useState } from "react";
import Back from "../assets/image/arrow-left.svg";
import LeadModal from "./LeadModal.jsx";
import axios from "axios";
import { GET_STATS,getDecryptedToken } from "./utils/Constants";
import UpdateLead from "./UpdateLead.jsx";

const ViewLeadsTable = ({ onClose }) => {
  const [openLead, setOpenLead] = useState(false);
  const [updateLead, setUpdateLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadsCount, setLeadsCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("last_thirty_days");
  const decryptedToken = getDecryptedToken();
  const formatDate = (isoDate) => {
    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };
  const updateLeadClick = (item) => {
    setSelectedLead(item);
    setUpdateLead(true);
  };
  const updateLeadClose = () => {
    setUpdateLead(false)
  }
  const addLeadClick = () => {
    setOpenLead(true)
  }
  const addLeadClose = () => {
    setOpenLead(false)
  }
  
  useEffect(() => {
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    // Adjust the endDate calculation to increase it by 1 day
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];

    getData(startDate, formattedEndDate);
  }, []);
  const getData = (startDate, endDate) => {
    axios
      .post(
        GET_STATS,
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      )
      .then((response) => {
        if (response?.data?.status === 1) {
          console.log(response?.data?.data?.leads)
          setLeadsCount(response?.data?.data?.leads?.reverse());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    let startDate, endDate;
    const today = new Date();
    switch (e.target.value) {
      case "today":
        startDate = today.toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = yesterday.toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "this_week":
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        startDate = firstDayOfWeek.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "last_week":
        const lastWeekEndDate = new Date();
        lastWeekEndDate.setDate(
          lastWeekEndDate.getDate() - lastWeekEndDate.getDay() - 1
        );
        const lastWeekStartDate = new Date(lastWeekEndDate);
        lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 6);
        startDate = lastWeekStartDate.toISOString().split("T")[0];
        endDate = lastWeekEndDate.toISOString().split("T")[0];
        break;
      case "last_seven_days":
        endDate = today.toISOString().split("T")[0];
        const lastSevenDaysStartDate = new Date(today);
        lastSevenDaysStartDate.setDate(lastSevenDaysStartDate.getDate() - 6);
        startDate = lastSevenDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_fourteen_days":
        endDate = today.toISOString().split("T")[0];
        const lastFourteenDaysStartDate = new Date(today);
        lastFourteenDaysStartDate.setDate(
          lastFourteenDaysStartDate.getDate() - 13
        );
        startDate = lastFourteenDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_twenty_eight_days":
        endDate = today.toISOString().split("T")[0];
        const lastTwentyEightDaysStartDate = new Date(today);
        lastTwentyEightDaysStartDate.setDate(
          lastTwentyEightDaysStartDate.getDate() - 27
        );
        startDate = lastTwentyEightDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_thirty_days":
        endDate = today.toISOString().split("T")[0];
        const lastThirtyDaysStartDate = new Date(today);
        lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
        startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
        break;
      case "last_sixty_days":
        endDate = today.toISOString().split("T")[0];
        const lastSixtyDaysStartDate = new Date(today);
        lastSixtyDaysStartDate.setDate(lastSixtyDaysStartDate.getDate() - 59);
        startDate = lastSixtyDaysStartDate.toISOString().split("T")[0];
        break;
      default:
        startDate = "";
        endDate = "";
        break;
    }

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    const formattedEndDate = adjustedEndDate.toISOString().split("T")[0];

    getData(startDate, formattedEndDate);
  };


  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = (leadsCount || []).filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values?.length; i++) {
      if (
        values[i] &&
        values[i]?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <>
      <div className="performance_title2">
        <img src={Back} alt="" onClick={onClose} />
        <span>LEAD DATA</span>
        <span>Total Lead: {leadsCount?.length}</span>
        <div className="searchBar">
          <label>
            Search: <input type="text" onChange={handleSearchTermChange}/>
          </label>
        </div>
        <div className="leads_new_btn">
          <div className="dashboard_header2">
            <div>
              <select
                className="selectSec"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this_week">This Week</option>
                <option value="last_week">Last Week</option>
                <option value="last_seven_days">Last 7 days</option>
                <option value="last_fourteen_days">Last 14 days</option>
                <option value="last_twenty_eight_days">Last 28 days</option>
                <option value="last_thirty_days">Last 30 days</option>
                <option value="last_sixty_days">Last 60 days</option>
              </select>
            </div>
            <div>
              <select className="selectSec">
                <option value="bookmyplayer">bookmyplayer</option>
                <option value="leadplaner">leadplaner</option>
                <option value="firstcron">firstcron</option>
                <option value="routplaner">routplaner</option>
              </select>
            </div>
          </div>
          <button className="common-fonts common-save-button" onClick={addLeadClick}>Add Leads</button>
        </div>
      </div>

      <div className="marketing-all-table lead_home">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">ID</th>
              <th className="common-fonts">DATE</th>
              <th className="common-fonts">NAME</th>
              <th className="common-fonts">EMAIL</th>
              <th className="common-fonts">OBJ TYPE</th>
              <th className="common-fonts academy_count_table">ACADMEY ID</th>
              <th className="common-fonts">PHONE</th>
              <th className="common-fonts section_count">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item, index) => (
              <tr key={item?.id} onClick={() => updateLeadClick(item)} className={item.is_deleted === 1 ? 'redText' : ''}>
                <td className="common-fonts">{item.id}</td>
                <td className="common-fonts">
                  {formatDate(item?.creation_date)}
                </td>
                <td className="common-fonts">{item?.name}</td>
                <td className="common-fonts">{item?.email}</td>
                <td className="common-fonts">{item?.object_type}</td>
                <td className="common-fonts compressEmail">{item?.object_id}</td>
                <td className="common-fonts">{item?.phone}</td>
                <td className="common-fonts">
                  <div className="leads_desc">{item?.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        openLead && (
          <LeadModal onClose={addLeadClose} getData={getData} />
        )
      }
{
        updateLead && (
          <UpdateLead onClose={updateLeadClose} selectedLead={selectedLead} getData={getData}/>

        )
      }
    </>
  );
};

export default ViewLeadsTable;
