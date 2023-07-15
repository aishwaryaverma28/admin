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
import React, { useState } from "react";
import axios from "axios";
import { LOGIN } from "./utils/Constants";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        localStorage.setItem("jwtToken", token); // Store the token in local storage
        console.log(response.data.landingurl);
        let redirect = response.data.landingurl;
        navigate(redirect);
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
