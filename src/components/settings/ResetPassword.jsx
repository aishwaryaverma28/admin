import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import { getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = ({ onClose, user }) => {
  console.log(user)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [hasNumberSymbolWhitespace, setHasNumberSymbolWhitespace] =
    useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const decryptedToken = getDecryptedToken();
  
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setMinLength(newPassword.length >= 8);
    setHasNumberSymbolWhitespace(/[0-9!@#$%^&*()_\s]/.test(newPassword));
    setHasUppercase(/[A-Z]/.test(newPassword));
    setHasSpecialCharacter(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword)
    );

    // Check if confirm password matches
    if (confirmPassword !== "") {
      setPasswordMatch(newPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(newConfirmPassword === password);
  };

  const handleSave = () => {
    if (passwordMatch) {
      if (minLength && hasNumberSymbolWhitespace && hasUppercase && hasSpecialCharacter) {
        axios
          .put("http://core.leadplaner.com:3001/api/user/updateteammember/"+user , { password: password }, {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
          .then((response) => {
            // Handle successful response
            
            toast.success('Password saved successfully', {
              position:"top-center"
            });
            onClose();
          })
          .catch((error) => {
            // Handle error
            toast.error('Error saving password', {
              position:"top-center"
            })
          });
      } else {
        toast.error('Please fulfill all password criteria.', {
          position:"top-center"
        })
      }
    } else {
      toast.error('Passwords do not match', {
        position:"top-center"
      })
    }
  };
  return (
    <div className="recycle-popup-wrapper">
      <div className="assign-role-popup-container">
        <div className="recycle-popup-box reset-password-box">
          <p className="common-fonts reset-password-heading">Reset password</p>
        </div>

        <div>
          <div className="pwd-label">
            <label htmlFor="" className="common-fonts pwd-heading">
              New Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="common-fonts common-input pwd-input"
                onChange={handlePasswordChange}
                value={password}
              />
              <button
                className="password-toggle-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fa-sharp fa-solid fa-eye-slash "></i> : <i className="fa-sharp fa-solid fa-eye "></i>}
              </button>
            </div>
          </div>
          <div className="pwd-label">
            <label htmlFor="" className="common-fonts pwd-heading">
              Confirm Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`common-fonts common-input pwd-input ${
                  confirmPassword && !passwordMatch ? "password-mismatch" : ""
                }`}
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <button
                className="password-toggle-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <i className="fa-sharp fa-solid fa-eye-slash "></i> : <i className="fa-sharp fa-solid fa-eye "></i>}
              </button>
            </div>
          </div>
        </div>
        <div className="pwd-rules">
          <p className="common-fonts pwd-policy">Password policy :</p>
          {/* Minimum 8 characters long */}
          <div className="password-rules">
            <div>
              <label className="custom-checkbox password-checkbox">
                <input
                  type="checkbox"
                  className="cb1"
                  checked={minLength}
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <p className="common-fonts password-text">
              Minimum 8 characters long
            </p>
          </div>
          {/* 1 number, symbol, or whitespace character */}
          <div className="password-rules">
            <div>
              <label className="custom-checkbox password-checkbox">
                <input
                  type="checkbox"
                  className="cb1"
                  checked={hasNumberSymbolWhitespace}
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <p className="common-fonts password-text">
                1 number, symbol, or whitespace character
              </p>
            </div>
          </div>
          {/* 1 uppercase letter */}
          <div className="password-rules">
            <div>
              <label className="custom-checkbox password-checkbox">
                <input
                  type="checkbox"
                  className="cb1"
                  checked={hasUppercase}
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <p className="common-fonts password-text">1 uppercase letter</p>
            </div>
          </div>
          {/* 1 special character */}
          <div className="password-rules">
            <div>
              <label className="custom-checkbox password-checkbox">
                <input
                  type="checkbox"
                  className="cb1"
                  checked={hasSpecialCharacter}
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              <p className="common-fonts password-text">1 special character</p>
            </div>
          </div>
        </div>
        <div className="recycle-popup-btn">
        <button className="restore-no common-fonts" onClick={onClose}>
          Cancel
        </button>
        <button className="restore-yes common-fonts" onClick={handleSave}>
          Save
        </button>
      </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
