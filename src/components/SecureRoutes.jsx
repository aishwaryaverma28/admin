import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {getDecryptedUserPath} from "./utils/Constants"

const SecureRoutes = (props) => {
  const { Component } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const landingUrl = localStorage.getItem('landingUrl');
  const [isLoading, setIsLoading] = useState(true);
    const decryptedUserPath = getDecryptedUserPath();
  
  
  useEffect(() => {
    // const allowed = ["/admin","/admin/blog/add","/admin/blog/view"]
    // const allowed = ["/admin","/admin/employee/add","/admin/employee/view"]
    const allowed = ["/lp/lead","/lp/home","/lp/mail","/lp/contacts","/lp/deals","/lp/settings","/lp/settings/general","/lp/settings/notification","/lp/settings/usernteams","/lp/settings/companysettings","/lp/settings/recyclebin","/lp/settings/privacyConcent","/lp/settings/settingLeads","/lp/settings/settingDeal","/lp/settings/settingUsage","/lp/settings/settingImpExp"];
    // const allowed = decryptedUserPath.split(",");
    console.log(allowed)
    const currentPath = location.pathname;

    if (allowed && !allowed.includes(currentPath)) { // Check if allowed is defined before using includes method
      navigate(landingUrl);
    } else {
      setIsLoading(false);
    }
  }, [location, navigate, landingUrl, decryptedUserPath]);

  return isLoading ? null : <Component />;
};

export default SecureRoutes;
