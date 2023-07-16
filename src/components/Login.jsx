//for client
// {
//   "username": "admin@gmail.com",
//   "password": "Mahi@3332"
// }
//for admin panel
// {
//   "username": "mahesh@gmail.com",
//   "password": "Mahi@3332"
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LOGIN } from "./utils/Constants";
import { useNavigate } from "react-router-dom";
import { AES } from "crypto-js"; // Import AES from crypto-js
import "./styles/Login.css";

const secretKey = 'miyamura'; // Set your secret key here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a JWT token is already stored in localStorage
    const encryptedToken = localStorage.getItem("jwtToken");
    if (encryptedToken) {
      // Decrypt the token
      const decryptedToken = AES.decrypt(encryptedToken, secretKey).toString();
      const landingUrl = localStorage.getItem("landingUrl");
      navigate(landingUrl);
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleUserName = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateForm = {
      username: email,
      password: password,
    };
    axios
      .post(LOGIN, updateForm)
      .then((response) => {
        const data = response.data;
        const status = response.data.status;
        console.log(data);
        if(status === 0){
          alert(data.message)
        }
        else if (status === 1){
          // alert(data.message)
        const token = response.data.token; // Assuming the token is in the response data
        // Encrypt the token
        const encryptedToken = AES.encrypt(token, secretKey).toString();
        localStorage.setItem("jwtToken", encryptedToken); // Store the encrypted token in localStorage
        const landingUrl = response.data.landingurl;
        localStorage.setItem("landingUrl", landingUrl); // Store the landing URL in localStorage
        navigate(landingUrl);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Invalid or expired token."
        ) {
          // Display an alert to the user
          alert("Your session has expired. Please login again.");
          // Clear JWT token from localStorage
          localStorage.removeItem("jwtToken");

          // Redirect to the login page
          navigate("/");
        } else {
          console.log(error);
        }
      });
  };

  // Conditionally render the login form or null based on the presence of the token
  const renderLoginForm = () => {
    const encryptedToken = localStorage.getItem("jwtToken");
    return encryptedToken ? null : (
      <>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" value={email} onChange={handleUserName} />
          <label>Password</label>
          <input type="password" value={password} onChange={handlePassword} />
          <input type="submit" value="Login" />
        </form>
      </>
    );
  };

  return <>{renderLoginForm()}</>;
};

export default Login;
