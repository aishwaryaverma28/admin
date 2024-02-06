import React from "react";

const Dashboard = () => {
  return (
    <section>
      <div className="dashboard_header">
        <div>
          <select className="selectSec">
            <option value="">Select Days</option>
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
          <select class="selectSec">
            <option value="">Select Site</option>
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
              <p className="common_fonts">94</p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new">Registration</h3>
              <p className="common_fonts">36</p>
            </div>
          </div>

          <h2>USERS</h2>

          <div className="dashboard_item">
            <div className="dashboard_card">
              <h3 className="common_fontscommon_fonts">Academy</h3>
              <p className="common_fonts">94</p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new">Individuals</h3>
              <p className="common_fonts">36</p>
            </div>
          </div>

          <div className="dashboard_item">
            <div className="dashboard_card">
              <h3 className="common_fontscommon_fonts">Leads</h3>
              <p className="common_fonts">70</p>
            </div>
            <div className="dashboard_card">
              <h3 className="font_new">Subscriptions</h3>
              <p className="common_fonts">34</p>
            </div>
          </div>

          <div className="dashboard_item"></div>
          <div className="dashboard_item"></div>
          <div className="dashboard_item"></div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
