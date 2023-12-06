import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const secretKey = "mySecretKey123";

function Testing() {
  const { auth } = useParams();
  const [authData, setAuthData] = useState();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const navigate = useNavigate();
  // http://core.leadplaner.com/auth=QhUjSgEfFVskExxDRFoIDndBBgsvHCkiGlh9WicwBh8qQysdAhYwX2AGDjoaUyoZFSwdJjMIHFYUMyM_IDtTOSEsCnhccQIbYVAPOw8bIigtdEp-OTwrKDc3HTkYLAp4XGFYGhQwCj0MPgk8S3dZaTpIZiwKBQwQAwkOa2QKHSMQLFU_DAMiBC53AnoHFisrGTMdOw8oS39Yel81EC8PFy01IioTdAF-KTBgKCczVzkhP0AfVB4lSwwMMx0yK3kIOFNUeFQNEhUqJwMiHxcYckF2Iz0JDhs-ICwyNEpWfxdJVj8VTBAIBGdKFUEdUQAJfAMGFxZYZAkJHlBeHVYnFwIbCx0lAlUeXkNCGz4VTBUEGCcAC0geHAEJfAcOAkoGLhMQVEVAQVY_FUwQCARkCRxQVkBBVj8VTBAIBGQWDEFCXB8Nf0oPAkoWJhVWWVdfHV13JAATAREmHF0VAAFJXWdUUA
  useEffect(() => {
    const encryptedToken = localStorage.getItem("jwtToken");
    if (encryptedToken) {
      const landingUrl = localStorage.getItem("landingUrl");
      navigate(landingUrl);
    } else {
      setIsLoading(false); // Set loading state to false if token not found
    }
  }, [navigate]);

  useEffect(() => {
    function customDecrypt(encryptedData, key) {
      if (!encryptedData) return "";

      var encodedData = encryptedData.slice(5);
      encodedData = encodedData.replace(/-/g, "+").replace(/_/g, "/");
      encodedData = encodedData
        .replace(/dot/g, "$")
        .replace(/at/g, "@")
        .replace(/hash/g, "#");
      var decodedData = atob(encodedData); // Use atob function to decode base64
      var decrypted = "";
      for (var i = 0; i < decodedData.length; i++) {
        decrypted += String.fromCharCode(
          decodedData.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return decrypted;
    }

    function decryptAuthData() {
      if (auth) {
        var decryptedText = customDecrypt(auth, secretKey);
        setAuthData(decryptedText);
        let auth0 = decryptedText.split("$$");
        console.log(auth0)
        const token = auth0[1];
        const roleName = auth0[3];
        const id = auth0[4];
        localStorage.setItem("role_name", roleName);
        localStorage.setItem("id", id);
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          secretKey
        ).toString();
        localStorage.setItem("jwtToken", encryptedToken);
        if (auth0[5] !== "") {
          localStorage.setItem("academy_id", auth0[5]);
        }
        const landingUrl = auth0[0];
        localStorage.setItem("landingUrl", landingUrl);
        const userPath = auth0[2].split(",");
        userPath.push(landingUrl);
        const userPathTot = userPath.join(",");
        const encryptedUserPathTot = CryptoJS.AES.encrypt(
          userPathTot,
          secretKey
        ).toString();
        localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
        navigate(landingUrl);
      }
    }

    decryptAuthData();
  }, [auth, navigate]);

  if (isLoading) {
    return null; // Render nothing while loading
  }

  return (
    <div>
      <p className="welcome-center">Welcome</p>
    </div>
  );
}

export default Testing;
