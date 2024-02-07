import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDecryptedToken } from "../../utils/Constants";

const ViewLeadsPage = () => {
  const [selectedOption, setSelectedOption] = useState("last_thirty_days");
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [leadsCount, setLeadsCount] = useState(null);
  useEffect(() => {
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];
    getData(startDate, endDate);
  }, []);
  const getData = (startDate, endDate) => {
    axios
      .post(
        "https://core.leadplaner.com/api/api/bmp/getstats",
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
        console.log(response?.data?.data?.leads)
        if (response?.data?.status === 1) {
          setLeadsCount(response?.data?.data?.leads);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
    getData(startDate, endDate);
  };
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

  return (
    <>
    <header className="headerEditor">
      <p className="common-fonts add-new-blog"> View Leads</p>
      </header>
      <div className="dashboard_header">
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
      {(isLoading ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>Loading...</div> 
    : leadsCount?.length === 0 ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>No leads Found</div> 
    : 
     <table>
          <thead>
            <tr>
              <th className="common-fonts">S No</th>
              <th className="common-fonts">DATE</th>
              <th className="common-fonts">NAME</th>
              <th className="common-fonts">OBJ TYPE</th>
              <th className="common-fonts section_count">PHONE</th>
              <th className="common-fonts section_count">TYPE</th>
              <th className="common-fonts">REFER</th>
              <th className="common-fonts section_count">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {leadsCount?.map((item, index) => (
              <tr key={item?.id}>
                <td className="common-fonts">{index + 1}</td>
                <td className="common-fonts">
                {formatDate(item?.creation_date)}
                </td>
                <td className="common-fonts">{item?.name}</td>
                <td className="common-fonts">{item?.object_type}</td>
                <td className="common-fonts">{item?.phone}</td>
                <td className="common-fonts">{item?.type}</td>
                <td className="common-fonts"> {item?.refer}</td>
                <td className="common-fonts"> {item?.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default ViewLeadsPage
