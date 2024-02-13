import React, { useEffect, useState } from "react";
import Back from "../assets/image/arrow-left.svg";
import LeadModal from "./LeadModal.jsx";
import axios from "axios";
import { getDecryptedToken } from "./utils/Constants";

const ViewLeadsTable = ({ data, onClose }) => {
  const [openLead, setOpenLead] = useState(false);
  const [leadsCount, setLeadsCount] = useState(null);
  const [selectedOption, setSelectedOption] = useState("last_thirty_days");
  const [login, setLogin] = useState(null);
  const [reg, setReg] = useState(null);
  const [stats, setStats] = useState(null);
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
        "https://bmp.leadplaner.com/api/api/bmp/getstats",
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
            // console.log(response?.data?.data?.otpStats[0])
          setLeadsCount(response?.data?.data?.leads?.reverse());
          setStats(response?.data?.data?.stats?.reverse());
          setLogin(response?.data?.data?.otpStats[0]?.login_otp);
          setReg(response?.data?.data?.otpStats[0]?.signup_otp);
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
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Add one day to end date
    const formattedEndDate = adjustedEndDate.toISOString().split("T")[0];

    getData(startDate, formattedEndDate);
};


  return (
    <>
      <div className="performance_title">
        <img src={Back} alt="" onClick={onClose} />
        <span>PERFORMANCE DATA</span>
          <span>Total Lead: {data?.length}</span>
          <div className="leads_new_btn">
        <button className="common-fonts common-save-button" onClick={addLeadClick}>Add Leads</button>
      </div>
      </div>

      <div className="marketing-all-table lead_last_border new_table_1">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">S No</th>
              <th className="common-fonts">DATE</th>
              <th className="common-fonts">NAME</th>
              <th className="common-fonts">OBJ TYPE</th>
              <th className="common-fonts section_count">PHONE</th>
              <th className="common-fonts section_count">TYPE</th>
              <th className="common-fonts section_count">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item?.id}>
                <td className="common-fonts">{index + 1}</td>
                <td className="common-fonts">
                  {formatDate(item?.creation_date)}
                </td>
                <td className="common-fonts">{item?.name}</td>
                <td className="common-fonts">{item?.object_type}</td>
                <td className="common-fonts">{item?.phone}</td>
                <td className="common-fonts">{item?.type}</td>
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
      <LeadModal onClose={addLeadClose}/>
    )
  }
    </>
  );
};

export default ViewLeadsTable;
