import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { GET_TEAM_MEM, getDecryptedToken } from "../utils/Constants";
import "../styles/Permissions.css";
import User from "../../assets/image/user-icon.svg";
import LeftArrow from "../../assets/image/arrow-left.svg";
import TeamArrow from "../../assets/image/team-arrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import AddRolePopUp from "./AddRolePopUp";
import ResetPassword from "./ResetPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LPPermission = () => {
  const { id } = useParams();
  const [actionOpen, setActionOpen] = useState(false);
  const [isAssignRole, setisAssignRole] = useState(false);
  const [isResetPassowrd, setIsResetPassword] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [startDate3, setStartDate3] = useState(null);
  const [startDate4, setStartDate4] = useState(null);
  const [startDate5, setStartDate5] = useState(null);

  const [endDate1, setEndDate1] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [endDate3, setEndDate3] = useState(null);
  const [endDate4, setEndDate4] = useState(null);
  const [endDate5, setEndDate5] = useState(null);
  const decryptedToken = getDecryptedToken();
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  // const [stateBtn, setStateBtn] = useState(0);

  //========================================================modal box functions
  function handleTeamDisplay() {
    setActionOpen(!actionOpen);
  }

  const handleAddRoleOpen = () => {
    setisAssignRole(true);
  };

  const handleAddRoleClose = () => {
    setisAssignRole(false);
  };

  const handleResetPasswordOpen = () => {
    setIsResetPassword(true);
  };

  const handleResetPasswordClose = () => {
    setIsResetPassword(false);
  };
  //===========================================================api calls
  const userAdded = () => {
    axios
      .get(GET_TEAM_MEM, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const filteredData = response?.data?.data?.filter(
          (item) => item.id == id
        );
        console.log(filteredData);
        setTeamData(filteredData[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    userAdded();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTeamData((prev) => {
      return { ...prev, [name]: value };
    });
    // setStateBtn(1);
  }
  console.log(teamData)
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="permission-container">
          <div className="back-to-user">
            <Link to={"/lp/settings/usernteams"}>
              <button className="common-fonts">
                <img src={LeftArrow} alt="" />
                <span>Back To User</span>
              </button>
            </Link>
          </div>
          <div className="permission-user-container">
            <div className="permission-user-icon">
              <img src={User} alt="" />
            </div>

            <div className="permission-user-details">
              <p className="common-fonts permission-username">
                {teamData.first_name + " " + teamData.last_name}
              </p>
              <p className="common-fonts permission-email">{teamData.email}</p>
            </div>

            <div>
              <button
                className="permission-reset-btn common-fonts"
                onClick={handleResetPasswordOpen}
              >
                Reset Password
              </button>
            </div>
          </div>

          <div className="permission-wrapper">
            <form action="">
              <div className="permission-display">
                <div>
                  <p className="common-fonts permission-user-info">
                    User Information
                  </p>

                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      onChange={handleChange}
                      value={teamData.first_name}
                      className="permission-input common-fonts"
                    />
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      onChange={handleChange}
                      value={teamData.last_name}
                      className="permission-input common-fonts"
                    />
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={teamData.email}
                      className="permission-input common-fonts"
                    />
                  </div>
                </div>

                <div>
                  <p className="common-fonts permission-user-info">
                    Account Information
                  </p>

                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">
                      password expiration date
                    </label>
                    <div className="custom-date-input">
                      <div className="permission-date-wrapper">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="permission-date-input"
                          dateFormat="dd/MM/yyyy"
                          value={startDate}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img
                          src={CalendarIcon}
                          alt="Delete"
                          className="permission-calender-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>

          <div>
            <p className="permission-team-heading common-fonts">teams</p>
            {/* <p className="permission-note common-fonts">
              To create or edit a team, go to{" "}
              <a href="" className="permission-team-link">
                <span>&nbsp;Teams&nbsp;&nbsp;</span>
                <img src={TeamArrow} alt="" />
              </a>
            </p> */}
          </div>

          <div>
            <p className="common-fonts permission-assign-team">Assigned team</p>
            <p className="common-fonts permission-assign-note">
              Assigned team member will have all the access to teams lead,
              deals, contacts & companies. They will be the part of team
              notification, tasks, notes, workflow.
            </p>

            <div
              className="permission-input team-angel"
              onClick={handleTeamDisplay}
            >
              <i
                className={`fa-sharp fa-solid ${actionOpen ? "fa-angle-up" : "fa-angle-down"
                  }`}
              ></i>
            </div>
          </div>
          {actionOpen && (
            <div className="team-div-display">
              <ul className="common-fonts">
                <li>Anant Team</li>
                <li>Mahesh Team</li>
                <li>Aishwarya Team</li>
              </ul>
            </div>
          )}

          <div className="permission-table-info">
            <div>
              <p className="common-fonts permission-name">permissions</p>
              <p className="common-fonts permission-line">
                Permissions manage which tools are available to users.
              </p>
            </div>
            <div>
              <button
                className="common-save-button"
                onClick={handleAddRoleOpen}
              >
                Assign Role
              </button>
            </div>
          </div>

          <div>
            <table className="permission-table">
              <thead>
                <tr className="common-fonts permission-table-heading">
                  <th>ROLE</th>
                  <th>MODULE</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="common-fonts permission-table-heading">
                  <td>contacts edit</td>
                  <td>contacts</td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={startDate1}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={endDate1}
                          onChange={(date) => setEndDate1(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={endDate1}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="common-fonts permission-table-heading">
                  <td>deals view</td>
                  <td>deals</td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={startDate2}
                          onChange={(date) => setStartDate2(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={startDate2}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={endDate2}
                          onChange={(date) => setEndDate2(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={endDate2}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="common-fonts permission-table-heading">
                  <td>deals edit</td>
                  <td>deals</td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={startDate3}
                          onChange={(date) => setStartDate3(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={startDate3}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={endDate3}
                          onChange={(date) => setEndDate3(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={endDate3}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="common-fonts permission-table-heading">
                  <td>deals view</td>
                  <td>deals</td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={startDate4}
                          onChange={(date) => setStartDate4(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={startDate4}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={endDate4}
                          onChange={(date) => setEndDate4(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={endDate4}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="common-fonts permission-table-heading">
                  <td>lead edit</td>
                  <td>Leads</td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={startDate5}
                          onChange={(date) => setStartDate5(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={startDate5}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="custom-date-input">
                      <div className="permission-date">
                        <DatePicker
                          selected={endDate5}
                          onChange={(date) => setEndDate5(date)}
                          className="permission-date-table"
                          dateFormat="dd/MM/yyyy"
                          value={endDate5}
                          placeholderText="dd/mm/yyyy"
                        />
                        <img src={CalendarIcon} alt="" className="cal-icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="permission-page-btn">
            <button className="common-delete-button">Discard</button>
            <button className="common-save-button permission-save-btn">Save</button>
          </div>
        </section>
      )}
      {isAssignRole && <AddRolePopUp onClose={handleAddRoleClose} />}
      {isResetPassowrd && <ResetPassword onClose={handleResetPasswordClose} user={id} />}
      <ToastContainer />
    </>
  );
};

export default LPPermission;
