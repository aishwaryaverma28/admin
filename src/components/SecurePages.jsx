import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SecurePages(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const landingUrl = localStorage.getItem("landingUrl");
  const currentPath = window.location.pathname;
  const isLandingUrlAdmin = landingUrl && landingUrl.startsWith("/admin");
  const isCurrentPathLP = currentPath.startsWith("/lp");
  
  useEffect(() => {
    if ((isLandingUrlAdmin && isCurrentPathLP) || (!isLandingUrlAdmin && !isCurrentPathLP)) {
      navigate(landingUrl);
    }
  }, [navigate, landingUrl, isLandingUrlAdmin, isCurrentPathLP]);

  if ((isLandingUrlAdmin && isCurrentPathLP) || (!isLandingUrlAdmin && !isCurrentPathLP)) {
    return null;
  }

  return <Component />;
}

export default SecurePages;
