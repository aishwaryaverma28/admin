import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewProfile from "./ViewProfile";
import "./styles/EmployeeProfile.css";
import PDFConverter from "./PDFConverter";

const SalarySlip = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [name, setName] = useState("");
  const [joining, setJoining] = useState("");
  const [emp_no,setEmp_no] = useState("");
  const [place,setPlace] = useState("");
  const [department,setDepartment] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    const response = await axios.get(
      "http://core.leadplaner.com:3001/api/employee/getPayslip/1"
    );
    const data = response.data.data;
    setTableData(data);
    setLoading(false);
    setName(data.employee.first_name + " " + data.employee.last_name);
    if (data.employee && data.employee.hire_date) {
      setJoining(data.employee.hire_date.split("T")[0]);
    }
    setEmp_no(data.employee.emp_no);
    setPlace(data.employee.country);
    setDepartment(data.employee.department);
    setPosition(data.employee.position);
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

  console.log(tableData.employee);

  return (
    <div className="salary-slip-container">
      <ViewProfile />

      <select value={selectedYear} onChange={handleYearChange} className="selectYear">
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
                  {item.month +
                    (item.payroll && item.payroll.year
                      ? " " + item.payroll.year
                      : "")}
                      <PDFConverter
                    item={item}
                    name={name}
                    emp_no={emp_no}
                    place={place}
                    position={position}
                    department={department}
                    joining={joining}
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
