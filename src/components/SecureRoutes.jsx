// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const SecureRoutes = (props) => {
//   const { Component } = props;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const landingUrl = localStorage.getItem('landingUrl');

//   useEffect(() => {
//     const allowed = [
//       "/admin",
//       "/admin/viewProfile/employeeProfile",
//       "/admin/viewProfile/timeSheet",
//       "/admin/viewProfile/documents",
//       "/admin/viewProfile/salarySlip",
//       "/admin/blog/add",
//       "/admin/blog/view",
//     ];

//     const currentPath = location.pathname;

//     if (!allowed.includes(currentPath)) {
//       navigate(landingUrl);
//     }
//   }, [location, navigate, landingUrl]);

//   return <Component />;
// };

// export default SecureRoutes;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SecureRoutes = (props) => {
  const { Component } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const landingUrl = localStorage.getItem('landingUrl');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allowed = [
      "/admin",
      "/admin/viewProfile/employeeProfile",
      "/admin/viewProfile/timeSheet",
      "/admin/viewProfile/documents",
      "/admin/viewProfile/salarySlip",
      "/admin/blog/add",
      "/admin/blog/view",
    ];

    const currentPath = location.pathname;

    if (!allowed.includes(currentPath)) {
      navigate(landingUrl);
    } else {
      setIsLoading(false);
    }
  }, [location, navigate, landingUrl]);

  return isLoading ? null : <Component />;
};

export default SecureRoutes;
