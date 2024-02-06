import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import axios from "axios";

import { BLOG_GET, getDecryptedToken } from "./utils/Constants";
import { useSelector } from "react-redux";
// import BlogPerformance from "./BlogPerformance";
import Dashboard from "./Dashboard.jsx";
import StaticHome from "./StaticHome";

const Home = () => {
  const decryptedToken = getDecryptedToken();
  const org_id = localStorage.getItem("org_id");
  const role_name = localStorage.getItem("role_name")
  const userName = useSelector(store => store.user.items);
  const [tableData, setTableData] = useState([]);
  const [stats, setStats] =useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const today = new Date();
    const lastThirtyDaysStartDate = new Date(today);
    lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 29);
    const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0]; 
    axios.post ("https://core.leadplaner.com/api/api/bmp/getstats" , {
      startDate: startDate,
      endDate: endDate
    },
    {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
    .then((response) => {
      if (response?.data?.status === 1) {
        setStats(response?.data?.data?.stats)
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);      
      setIsLoading(false);
    })
  }, []);
  const blogData = () => {
    const siteName = {
      siteName: "bookmyplayer",
      org_id: org_id,
    };
    axios
      .post(BLOG_GET, siteName, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        // console.log(response?.data?.data)
        if (response?.data?.status === 1) {
          setTableData(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userName && userName[0] && userName[0][0]?.email === "vaneet.gupta@gmail.com") {
      blogData();
    }
  }, [userName]);

  return (
    <>
      {role_name === "admin" && userName && userName[0] && userName[0][0]?.email === "vaneet.gupta@gmail.com" ? (
        <>
          {isLoading ? (
            <div style={{ padding: "1.5rem", textAlign: "center" }}>Loading...</div>
          ) : stats?.length === 0 ? (
            <div style={{ padding: "1.5rem", textAlign: "center" }}>No Blogs Found</div>
          ) : (
            <Dashboard blog={tableData}/>
          )}
        </>
      ) : (
        <StaticHome />
      )}
    </>
  );
};

export default Home;
