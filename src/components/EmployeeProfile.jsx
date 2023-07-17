import React, { useState, useEffect,useRef,useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import ViewProfile from "./ViewProfile";
import profile from "../assets/image/profile.png";
import "./styles/EmployeeProfile.css";
import { EMPLOYEE_GETID,EMPLOYEE_UPDATE,REMOVE_DOC,UPLOAD_DOC,VIEW_IMG,getDecryptedToken } from "./utils/Constants";

const EmployeeProfile = () => {
  const { setProfileImage } = useContext(UserContext);
  const [empData, setEmpData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(null);
const [pic, setPic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const decryptedToken = getDecryptedToken();
  const [formData, setFormData] = useState({
   profile:"",
  })
  const fileInputRef = useRef(null);
    const [initialEmpData, setInitialEmpData] = useState({});
    useEffect(() => {
    getEmployeeInfo();
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    ageCal();
  }, [empData]); // Call ageCal whenever empData changes

  async function getEmployeeInfo() {
    const response = await axios.get(EMPLOYEE_GETID,{
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    });
    const data = response.data.data;
    setEmpData(data[0]);
    setInitialEmpData(data[0]); // Set the initial employee data
  }
// console.log(empData);
  function ageCal() {
    let dob = empData.dob ? empData.dob.split("T")[0].split("-")[0] : "";
    let empAge = currentYear - dob;
    setAge(empAge);
    let add = empData.address1 + ", " + empData.city + ", " + empData.state;
    setAddress(add);
    // console.log(add);
    setDocumentUrl(empData.profile_image);
    setPic( VIEW_IMG + empData.profile_image);
  }
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("employeeDoc", file);

    if (documentUrl) {
      // Delete the previously uploaded image
      try {
        await axios.delete(
          REMOVE_DOC +
            documentUrl,{
              headers: {
                Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
              }
            }
        );
      } catch (error) {
        console.error("Error deleting previous image:", error);
      }
    }

    try {
      const response = await axios.post(
        UPLOAD_DOC,
        formData,{
          headers: {
            Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
          }
        }
      );
      console.log("Image uploaded successfully:", response.data);
      setSelectedImage(file);
      setDocumentUrl(response.data.data)
      setPic( VIEW_IMG + response.data.data)
      setProfileImage(VIEW_IMG + response.data.data);
       // Perform any additional actions on successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error condition
    }
  };
//  console.log(pic)
  function handleSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      profile_image:documentUrl,
    }
    axios.put(EMPLOYEE_UPDATE + "1", updatedFormData,{
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      console.log(response);
    });
  }
  const resetForm = () => {
    setEmpData(initialEmpData);
    setSelectedImage(null);
    setDocumentUrl("");
    setFormData({
      profile: "",
    });
  };

  return (
    <>
      <ViewProfile />
       <div className="userProfile">
        <div className="profileImage">
          <p>profile image</p>
          <img src={pic ? pic : profile} alt="image" />
          <br />
          <input
        type="file"
        name="employeeDoc"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      <button onClick={handleButtonClick} className="browseBtn">change profile image</button>
      </div>
        <div className="dateTime">
          <p>added on {empData.creation_date ? empData.creation_date.split("T")[0] : ""}</p>
        </div>
      </div>

      <div className="personalDetails">
        <div className="detailsFirstSection">
          <p>employee details</p>
          <ul>
            <li>
              <p>First Name</p>
              <span>{empData.first_name}</span>
            </li>
            <li>
              <p>Middle Name </p>
              <span>-</span>
            </li>
            <li>
              <p>Last Name </p>
              <span>{empData.last_name}</span>
            </li>
            <li>
              <p>Age </p>
              <span>{age}</span>
            </li>
            <li>
              <p>DOB </p>
              <span>{empData.dob ? empData.dob.split("T")[0] : ""}</span>
            </li>
            <li>
              <p>Working Since </p>
              <span>{empData.hire_date ? empData.hire_date.split("T")[0] : ""}</span>
            </li>
            <li>
              <p>Job Title </p>
              <span>{empData.position}</span>
            </li>
            <li>
              <p>Permanent Address </p>
              <span>{address}</span>
            </li>
            <li>
              <p>Country</p> <span>{empData.country}</span>
            </li>
          </ul>
        </div>
        <div className="detailsSecondSection">
          <p>contact details</p>
          <ul>
            <li>
              <p>Personal Number </p>
              <span>{empData.mobile}</span>
            </li>
            <li>
              <p>Work Phone </p>
              <span>{empData.mobile}</span>
            </li>
            <li>
              <p>Work Email </p>
              <span>{empData.personal_email}</span>
            </li>
            <li>
              <p>Email </p>
              <span>{empData.personal_email}</span>
            </li>
          </ul>
          <p>manager details</p>
          <ul>
            <li>
              <p>Reporting Manager </p>
              <span>John wick</span>
            </li>
            <li>
              <p>Contact Number </p>
              <span>8954123974</span>
            </li>
            <li>
              <p>Email id </p>
              <span>johnwick001@gmail.com</span>
            </li>
          </ul>
          <p>social media links</p>
          <ul>
            <li>
              <p>LinkedIn </p>
              <span>{empData.social1}</span>
            </li>
            <li>
              <p>Facebook </p>
              <span>{empData.social2}</span>
            </li>
          </ul>
        </div>
        <div className="detailsSecondSection">
          <p>Bank Details</p>
          <ul>
            <li>
              <p>Bank Name </p>
              <span>{empData.bank_details ? empData.bank_details.split(",")[0] : ""}</span>
            </li>
            <li>
              <p>Account Number </p>
              <span>{empData.bank_details ? empData.bank_details.split(",")[1] : ""}</span>
            </li>
            <li>
              <p>IFSC Code</p>
              <span>{empData.bank_details ? empData.bank_details.split(",")[2] : ""}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="timesheetSaveBtn">
        <button type="button" className="cancleBtn" onClick={resetForm}>
          cancel
        </button>
        <button type="button" className="changesaveBtn" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EmployeeProfile;
