import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDecryptedToken } from "./utils/Constants";
import BlogPerformance from "./BlogPerformance.jsx";
import LeadModal from "./LeadModal.jsx";
import ViewLeadsTable from "./ViewLeadsTable.jsx";
import Subscription from "./Subscription.jsx";
const Dashboard = ({ blog, getData, leadsCount, login, reg, stats }) => {
  const [selectedOption, setSelectedOption] = useState("last_thirty_days");

  const [openBlog, setOpenBlog] = useState(false);
  const [openLeadTable, setOpenLeadTable] = useState(false);
  const [openLead, setOpenLead] = useState(false);
  const [openSubscription, setOpenSubscription] = useState(false);

  const addLeadClick = () => {
    setOpenLead(true);
  };
  const addLeadClose = () => {
    setOpenLead(false);
  };

  const blogClick = () => {
    setOpenBlog(true);
  };
  const blogClose = () => {
    setOpenBlog(false);
  };
  const subscriptionClick = () => {
    setOpenSubscription(true);
  };
  const subscriptionClose = () => {
    setOpenSubscription(false);
  };
  const leadTableClick = () => {
    setOpenLeadTable(true);
  };
  const leadTableClose = () => {
    setOpenLeadTable(false);
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

  return openBlog ? (
    <BlogPerformance data={blog} onClose={blogClose} />
  ) : openLeadTable ? (
    <ViewLeadsTable data={leadsCount} onClose={leadTableClose} />
  ) : openSubscription ? (
    <Subscription onClose={subscriptionClose} />
  ) : (
    <section>
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

      <div className="dashboard_view">
        <div className="dashboard_left">
          <h2>OTP</h2>

          <div className="dashboard_item">
            <div className="dashboard_card">
              <h3 className="common_fontscommon_fonts">Login</h3>
              <p className="common_fonts dash_num">{login ? login : 0}</p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new">Registration</h3>
              <p className="common_fonts dash_num">{reg ? reg : 0}</p>
            </div>
          </div>

          <h2>USERS</h2>
          <div className="dashboard_item">
            {stats &&
              stats.map((item, index) => (
                <div className="dashboard_card" key={index}>
                  <h3 className="common_fonts">{item.type}</h3>
                  <p className="common_fonts dash_num">{item.type_count}</p>
                </div>
              ))}
          </div>

          <div className="dashboard_item">
            <div className="dashboard_card">
              <h3 className="common_fonts" onClick={leadTableClick}>
                Leads
              </h3>
              <p className="common_fonts dash_num">
                {leadsCount ? leadsCount?.length : 0}
              </p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new" onClick={subscriptionClick}>
                Subscriptions
              </h3>
              <p className="common_fonts dash_num">34</p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new" onClick={blogClick}>
                Blogs
              </h3>
              <p className="common_fonts dash_num">{blog ? blog?.length : 0}</p>
            </div>
          </div>
        </div>

        <div className="dashboard_right">
          <div className="leads_new_btn">
            {/* <button className="common-fonts common-save-button" onClick={addLeadClick}>Add Leads</button> */}
          </div>

          <div className="leads_new_tab leads_table_height">
            {/* <ViewLeadsTable data={leadsCount}/> */}
          </div>
        </div>
      </div>
      {/* {
    openLead && (
      <LeadModal onClose={addLeadClose} getData={getData} />
    )
  } */}
    </section>
  );
};

export default Dashboard;
