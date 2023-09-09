import React, { useState, useRef } from "react";
import axios from "axios";
import "./styles/Login.css";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import CRMImage from "../assets/image/crm.svg";

const Reset = () => {
  const email = localStorage.getItem("email");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const otpInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Handle OTP input change for individual digits
  const handleOtpChange = (index, event) => {
    const value = event.target.value;

    if (/^[0-9]$/.test(value) && index < otpDigits.length) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);

      // Move cursor to the next input field
      if (index < otpDigits.length - 1) {
        otpInputRefs[index + 1].current.focus();
      }

      // Check if all 4 digits are entered and make the API call
      if (newOtpDigits.every((digit) => digit !== "")) {
        const enteredOtp = newOtpDigits.join("");
        makeApiCallForOtpValidation(enteredOtp);
      }
    }
  };

  // Function to make the API call for OTP validation
  const makeApiCallForOtpValidation = (otp) => {
    // Replace with your API endpoint for OTP validation
    const updatedForm = {
      email: email,
      otp: otp,
    };
    axios
      .post("http://core.leadplaner.com:3001/api/user/verify-otp", updatedForm)
      .then((response) => {
        const data = response?.data;
        const status = response?.data?.status;
        console.log(data);
         if (status === 0) {
          alert(data.message);
        } else if (status === 1) {
        }
      })
      .catch((error) => {
        // Handle error response
        console.error("OTP validation error:", error);
        // Add your logic to display an error message to the user
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <LoginHeader />
      <main className="main-registration">
        <div className="free-trial-section">
          <h2 className="free-trial-heading">Start Your Free Trial</h2>
          <h3 className="no-credit">
            No credit card required, no software to install.
          </h3>
          <p className="day-trial">With your 30-day trial, you get:</p>
          <div className="data-load">
            <ul>
              <li>Pre-loaded data or upload your own</li>
              <li>Pre-configured processes, reports, and dashboards</li>
              <li>
                Guided experiences for sales reps, leaders, and administrators
              </li>
              <li>Online training and live onboarding webinars</li>
            </ul>
          </div>

          <p className="looking-support">
            Looking for support? Visit the{" "}
            <span> LeadPlaner Support Center</span> or email
          </p>
          <p className="help-email">help@leadplaner.com</p>

          <img src={CRMImage} alt="" />
        </div>

        <div className="login-form-section">
          <h2 className="login-form-heading">Forgot Password</h2>

          <>
            <div className="login-page-fields">
              <label for="" className="login-labels">
                OTP
              </label><br/>
                {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="number" // Keep input type as "number"
                className="otpBoxNum"
                value={digit}
                onChange={(e) => handleOtpChange(index, e)}
                ref={otpInputRefs[index]} // Set the ref for focus control
              />
            ))}
            </div>

            
          </>
        </div>
      </main>

      <LoginFooter />
    </>
  );
};

export default Reset;