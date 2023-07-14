import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SALARY_SLIP
} from "./utils/Constants";
import ViewProfile from "./ViewProfile";
import "./styles/EmployeeProfile.css";
import PDFConverter from "./PDFConverter";

const SalarySlip = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [name, setName] = useState("");
  const [joining, setJoining] = useState("");
  const [emp_no, setEmp_no] = useState("");
  const [place, setPlace] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [bank, setBank] = useState("");

  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
  
    try {
      const response = await axios.get(SALARY_SLIP, {
        headers: {
          Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
        }
      });
      const data = response.data.data;
      // console.log(data.employee)
      setTableData(data);
      setLoading(false);
      setName(data.employee.first_name + " " + data.employee.last_name);
      if (data.employee && data.employee.hire_date) {
        setJoining(data.employee.hire_date.split("T")[0]);
      }
      setEmp_no(data.payroll.employee_id);
      setPlace(data.employee.country);
      setDepartment(data.employee.department);
      setPosition(data.employee.job_title);
      if (data.employee && data.employee.bank_details) {
        setJoining(
          data.employee.bank_details.split(",")[0] +
            " " +
            data.employee.bank_details[1]
        );
      }
    } catch (error) {
      console.error(error); // Handle the error as needed
    }
  }
  
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value)); // Parse the selected value to a number
  };

  useEffect(() => {
    // Filter the table data based on the selected year whenever it changes
    const filteredTableData = Object.values(tableData).filter(
      (item) => item && item.year && item.year === selectedYear
    );
    setFilteredTableData(filteredTableData);
  }, [tableData, selectedYear]);

  const [filteredTableData, setFilteredTableData] = useState([]);

  // console.log(tableData.employee);

  return (
    <div className="salary-slip-container">
      <ViewProfile />

      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="selectYear"
      >
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>

      <table className="salaryTable">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            filteredTableData.map((item, index) => (
              <tr key={index}>
                <td className="sno">{index + 1}</td>
                <td className="slaryMonth">
                  {item.month + (item.year ? ", " + item.year : "")}
                  <PDFConverter
                    item={item}
                    name={name}
                    emp_no={emp_no}
                    place={place}
                    position={position}
                    department={department}
                    joining={joining}
                    bank={bank}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalarySlip;
