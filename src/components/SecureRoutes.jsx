import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDecryptedUserPath } from "./utils/Constants";

const SecureRoutes = (props) => {
  const { Component } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const landingUrl = localStorage.getItem("landingUrl");
  const [isLoading, setIsLoading] = useState(true);
  const decryptedUserPath = getDecryptedUserPath();

  useEffect(() => {
    let allowed = decryptedUserPath.split(",");
    const currentPath = location.pathname;
  
    if (landingUrl === "/lp/admin") {
      allowed = allowed.filter((path) => path !== "/lp/home");
    } else if (landingUrl === "/lp/home") {
      allowed = allowed.filter((path) => path !== "/lp/admin");
    }
  
    if (!allowed.includes(currentPath)) {
      navigate(landingUrl);
    } else {
      setIsLoading(false);
    }
  }, [location, navigate, landingUrl, decryptedUserPath]);
  
  return isLoading ? null : <Component />;
};

export default SecureRoutes;
