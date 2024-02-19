import React, {useState, useEffect} from 'react'
import Back from "../assets/image/arrow-left.svg";
import axios from "axios";
import { GET_STATS,getDecryptedToken } from "./utils/Constants";

const LoginTable = ({onClose }) => {
  const [login, setLogin] = useState(null);
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
    
  useEffect(() => {
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
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
        console.log(response?.data?.data?.loginSuccess?.reverse());
        if (response?.data?.status === 1) {
          setLogin(response?.data?.data?.loginSuccess?.reverse());
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
    <div className="performance_title2">
      <img src={Back} alt="" onClick={onClose} />
      <span>LOGIN DATA</span>
      <span>Total Login: {login?.length}</span>
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
      </div>
    </div>

    <div className="marketing-all-table lead_last_border new_table_1 login_new_table">
      <table>
        <thead>
          <tr>
            <th className="common-fonts">ID</th>
            <th className="common-fonts">DATE</th>
            <th className="common-fonts">IP</th>
            <th className="common-fonts">SOURCE</th>
          </tr>
        </thead>
        <tbody>
          {login?.map((item, index) => (
            <tr key={item?.id}>
              <td className="common-fonts">{item.id}</td>
              <td className="common-fonts">
                {formatDate(item?.creation_date)}
              </td>
              <td className="common-fonts">{item?.attr1}</td>
              <td className="common-fonts">{item?.attr4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    
  )
}

export default LoginTable