import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { EMPLOYEE_GET, EMPLOYEE_UPDATE } from "./utils/Constants";
import "./styles/EmployeeUpdate.css";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const [empData, setEmpData] = useState([]);
  const [currentEmp, setCurrentEmp] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
    personalEmail: "",
    mobile: "",
    social1: "",
    social2: "",
    salary: "",
    aadhaar: "",
    formattedDate: "",
    dob: "",
    gender: "",
    department: "",
  });
  const [stateBtn, setStateBtn] = useState(0);

  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    const response = await axios.get(EMPLOYEE_GET);
    const data = response.data.data;
    setEmpData(data);
    searchData(data);
  }
  // console.log(empData);

  function searchData(data) {
    const employee = data.find((item) => item.id == id);
    if (employee) {
      setCurrentEmp(employee);
      setFormData({
        ...formData,
        name: employee.first_name + " " + employee.last_name,
        address: employee.address1,
        city: employee.city,
        state: employee.state,
        country: employee.country,
        postcode: employee.postcode,
        personalEmail: employee.personal_email,
        mobile: employee.mobile,
        social1: employee.social1,
        social2: employee.social2,
        salary: employee.salary,
        aadhaar: employee.aadhaar,
        formattedDate: formatDate(employee.hire_date),
        dob: formatDate(employee.dob),
        gender: employee.gender,
        department: employee.department,
      });
    }
  }
  function formatDate(date) {
    return date ? date.split("T")[0] : "";
   
  }
    function handleChange(event) {
    const { name, value } = event.target;
    if (formData[name] !== value) setStateBtn(1);
    setFormData({ ...formData, [name]: value });
  }
// office 365
  function handleSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      first_name: formData.name.split(" ")[0],
      last_name: formData.name.split(" ")[1],
      position: formData.position,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postcode: formData.postcode,
      dob: formData.dob,
      personal_email: formData.personalEmail,
      hire_date: formData.formattedDate,
      mobile: formData.mobile,
      department: formData.department,
      social1: formData.social1,
      social2: formData.social2,
      address1: formData.address,
      gender: formData.gender,
    };
    axios.put(EMPLOYEE_UPDATE + id, updatedFormData).then((response) => {
      console.log(response);
    });
  }


  return (
    <>
      <header className="headerEditor">
        <h2>Update Employee Details</h2>
      </header>
      <div>Update Employee: {id}</div>
      <form className="addEmployeeFrom" onSubmit={handleSubmit}>
        <div className="formDiv">
          <div className="leftForm">
            <div className="fromFiled">
              <label for="">
                employee code<span>*</span>
              </label>
              <input
                type="text"
                name="emp_no"
                id="employeecode"
                placeholder="Please Enter Code"
                value={currentEmp.emp_no}
                disabled
              />
            </div>
            <div className="fromFiled">
              <label for="">
                employee name<span>*</span>
              </label>

              <input type="text"    value={formData.name} onChange={handleChange}/>
            </div>
            <div className="fromFiled" top-align>
              <label for="">
                current address<span>*</span>
              </label>

              <textarea
                type="textarea"
                value={formData.address} onChange={handleChange}
                rows="5"
                cols="5"
                placeholder="Please Enter Address"
              ></textarea>
            </div>
            <div className="fromFiled">
              <label for="">
                City<span>*</span>
              </label>

              <input
                type="text"
                name="city"
                id="city"
                value={formData.city} onChange={handleChange}
                placeholder="Please Enter City"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                State<span>*</span>
              </label>

              <input
                type="text"
                name="state"
                id="state"
                placeholder="Please Enter State"
                value={formData.state} onChange={handleChange}
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Country<span>*</span>
              </label>

              <input
                type="text"
                name="country"
                id="country"
                placeholder="Please Enter Country"
                value={formData.country} onChange={handleChange}
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Postcode<span>*</span>
              </label>

              <input
                type="text"
                name="postcode"
                id="postcode"
             placeholder="Please Enter Postcode"
             value={formData.postcode} onChange={handleChange}
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Personal Email<span>*</span>
              </label>

              <input
                type="email"
                name="personal_email"
                id="personal_email"
                value={formData.personalEmail} onChange={handleChange}
                placeholder="Please Enter Email"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                date of joining<span>*</span>
              </label>

              <input
                type="date"
                name="hire_date"
                value={formData.formattedDate} onChange={handleChange}
                id="date"
                placeholder=""
              />
            </div>
            <div className="fromFiled">
              <label for="">
                client/franchisee<span>*</span>
              </label>

              <input
                type="text"
                name="client"
                id="client"
                placeholder="Please Enter Cilent"
              />
            </div>
            <div className="fromFiled">
              <label for="">
                remarks<span>*</span>
              </label>

              <input
                type="text"
                name="remarks"
                id="remarks"
                placeholder="Please Enter Remarks"
              />
            </div>
          </div>
          <div className="rightForm">
            <div className="fromFiled">
              <label for="">
                employee type<span>*</span>
              </label>

              <input
                type="text"
                value={formData.position} onChange={handleChange}
                placeholder="Please Enter Employee Type"
              />
            </div>
            <div className="fromFiled">
              <label for="">
                phone number<span>*</span>
              </label>

              <input
                type="tel"
                name="mobile"
                id="phonenumber"
                maxlength="10"
                value={formData.mobile} onChange={handleChange}
                placeholder="Please Enter Phone Number"
              />
            </div>

            <div className="fromFiled">
              <label for="">
                Date of Birth<span>*</span>
              </label>

              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob} onChange={handleChange}
                placeholder="Please Enter Birth date"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Gender<span>*</span>
              </label>

              <input
                type="text"
                name="gender"
                id="gender"
                value={formData.gender} onChange={handleChange}
                placeholder="Please Enter Gender"
                
              />
            </div>

            <div className="fromFiled">
              <label for="">
                Department<span>*</span>
              </label>

              <input
                type="text"
                name="department"
                id="department"
                value={formData.department} onChange={handleChange}
                placeholder="Please Enter Department"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Salary<span>*</span>
              </label>

              <input
                type="text"
                name="salary"
                id="salary"
                value={formData.salary} onChange={handleChange}
                placeholder="Please Enter Salary"
                
              />
            </div>

            <div className="fromFiled">
              <label for="">
                Aadhaar Number<span>*</span>
              </label>

              <input
                type="number"
                name="aadhaar_no"
                id="aadhaar_no"
                value={formData.aadhaar} onChange={handleChange}
                placeholder="Please Enter Aadhar number"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Social Account<span>*</span>
              </label>

              <input
                type="text"
                name="social1"
                id="social1"
                value={formData.social1} onChange={handleChange}
                placeholder="Please Enter Social Account"
                
              />
            </div>
            <div className="fromFiled">
              <label for="">
                Social Account<span>*</span>
              </label>

              <input
                type="text"
                name="social2"
                id="social2"
                value={formData.social2} onChange={handleChange}
                placeholder="Please Enter Social Account"
                
              />
            </div>

            <div className="fromFiled">
              <label for="">
                password<span>*</span>
              </label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Please Enter Password"
              />
            </div>
            <div className="fromFiled">
              <label for="">
                org name<span>*</span>
              </label>

              <input
                type="text"
                name="orgname"
                id="orgname"
                placeholder="Please Enter Organisation Name"
              />
            </div>
            <div className="fromFiled">
              <label for="">
                OTP<span>*</span>
              </label>

              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Please Enter the OTP"
              />
            </div>
            <div className="saveBtnRight">
              {stateBtn === 0 ? (
                <button className="closeBtn">
                  <Link to={"/employee/view"}>Close</Link>
                </button>
              ) : (
                <input
                  type="submit"
                  value="Save"
                  className="secondaryBtn saveBtn"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployeeUpdate;