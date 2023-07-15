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
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a JWT token is already stored in localStorage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Redirect to the landing URL
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
        const token = response.data.token; // Assuming the token is in the response data
        localStorage.setItem("jwtToken", token); // Store the token in localStorage
        const landingUrl = response.data.landingurl;
        localStorage.setItem("landingUrl", landingUrl); // Store the landing URL in localStorage
        navigate(landingUrl);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
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

export default Login;
