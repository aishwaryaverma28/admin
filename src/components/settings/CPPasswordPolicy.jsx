import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Password.css";
import LockImage from "../../assets/image/lock.svg";
import { getDecryptedToken } from "../utils/Constants";

const CPPasswordPolicy = () => {
  const decryptedToken = getDecryptedToken();
  const [toggleChecked, setToggleChecked] = useState(false);
  const [passDes, setPassDes] = useState([]);

  const passGet = () => {
    axios
      .get("http://core.leadplaner.com:3001/api/setting/password/get", {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setPassDes(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(passDes);
  useEffect(() => {
    passGet();
  }, []);

  const handleCheckboxChange = (id, value) => {
    // Only update if the toggle button is enabled
    if (toggleChecked) {
      // Prepare the request body
      const requestBody = {
        active: 1,
        value: parseInt(value),
      };

      // Make the update API call
      axios
        .put(
          `http://core.leadplaner.com:3001/api/setting/password/edit/${id}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          }
        )
        .then((response) => {
          // Handle success if needed
          console.log("Update success:", response.data);
        })
        .catch((error) => {
          console.log("Update error:", error);
        });
    }
  };

  return (
    <section>
      <div className="password-toggle">
        <div className="password-lock">
          <img src={LockImage} alt="" />
          <div>
            <p className="common-fonts password-policy">Password Policy</p>
            <p className="common-fonts password-guideline">
              Password Policy guidelines will be applied to enhance the
              security.{" "}
            </p>
          </div>
        </div>
        <div>
          <label className="password-switch">
            <input
              type="checkbox"
              checked={toggleChecked}
              onChange={() => setToggleChecked(!toggleChecked)}
            />
            <span className="password-slider password-round"></span>
          </label>
        </div>
      </div>
      <p className="common-fonts password-heading">password policy</p>
      {/* Mapping over the passDes array to render the checkboxes and input fields */}
      {passDes.map(
        (condition) =>
          // Skip mapping when condition.term === "is_enabled"
          condition.term !== "is_enabled" && (
            <div className="password-rules" key={condition.id}>
              <div>
                <label className="custom-checkbox password-checkbox">
                  <input
                    type="checkbox"
                    className="cb1"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      handleCheckboxChange(condition.id, checked ? 1 : 0);
                    }}
                    disabled={!toggleChecked} // Add this line
                  />

                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <p className="common-fonts password-text">
                  {condition.description}
                </p>
                <input
                  type="text"
                  className="common-input password-input"
                  name=""
                  onChange={(e) => {
                    const value = e.target.value;
                    handleCheckboxChange(condition.id, value);
                  }}
                />
              </div>
            </div>
          )
      )}

      <div className="password-authentication">
        <p className="password-two-factor password-fonts">
          Two-factor authentication
        </p>
        <div>
          <label className="password-switch">
            <input type="checkbox" />
            <span className="password-slider password-round"></span>
          </label>
        </div>
      </div>

      <div>
        <p className="password-bottom password-fonts">
          Protect your account ankitaschauhan96@gmail.com with two-factor
          authentication via email. Once enabled, then the next time you log in,
          you are asked to click the verification link in an email to access
          your account. You only need to verify yourself every 30 days on each
          device.
        </p>
      </div>

      <div className="password-bottom-btn">
        <button className="common-white-button">cancel</button>
        <button className="common-save-button password-save">save</button>
      </div>
    </section>
  );
};

export default CPPasswordPolicy;
