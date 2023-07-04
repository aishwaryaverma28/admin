import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/EmployeeProfile.css";

const ViewProfile = () => {
  return (
    <>
      <header className="headerEditor">
        <h2>Dashboard</h2>
      </header>
      <div className="navigationBar2">
        <ul className="navLinks">
          <li>
            <NavLink
            exact
              to="/admin/viewProfile/employeeProfile"
              activeClassName="activeLink"
              >
              Personal Details
            </NavLink>
          </li>
          <li>
            <NavLink
            exact
              to="/admin/viewProfile/timeSheet"
              activeClassName="activeLink"
              
            >
              Time Sheet
            </NavLink>
          </li>
          <li>
            <NavLink
            exact
              to="/admin/viewProfile/documents"
              activeClassName="activeLink"
              >
              Documents
            </NavLink>
          </li>
          <li>
            <NavLink
            exact
              to="/admin/viewProfile/salarySlip"
              activeClassName="activeLink"
              >
              Salary Slip
            </NavLink>
          </li>
        </ul>
      </div>
      
    </>
  );
};

export default ViewProfile;
