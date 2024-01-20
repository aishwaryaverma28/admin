import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import latest from "../assets/image/latest.jpg";
import amirAli from "../assets/image/amir-ali.png";
import ashwariya from "../assets/image/ashwariya.png";
import moira from "../assets/image/moira.png";
import rahul from "../assets/image/rahul.png";
import veneet from "../assets/image/veneet.png";
import may from "../assets/image/may.png";
import performance from "../assets/image/performence.svg";
import career from "../assets/image/career.svg";
import finance from "../assets/image/finance.svg";
import health from "../assets/image/health.svg";
import forms from "../assets/image/forms.svg";
import "./styles/Editor.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { GET_ALL_LEADS, BLOG_GET, getDecryptedToken } from "./utils/Constants";
import LeadReview from "./LeadReview";
import BlogPerformance from "./BlogPerformance";
import StaticNew from "./StaticNew.jsx";
const Editor = () => {
  const decryptedToken = getDecryptedToken();
  const role_name = localStorage.getItem("role_name")
  const org_id = localStorage.getItem("org_id");
  const userName = useSelector(store => store.user.items);
  const [tableData, setTableData] = useState([]);
  const [leads, setLeads] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [value, onChange] = useState(new Date());
  // console.log(userName[0][0]?.email)
  // console.log(role_name)
  const allLeads = () => {
    axios.post(GET_ALL_LEADS,{}, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
    .then((response) => {
      // console.log(response?.data?.data);
      if (response?.data?.status === 1) {
      setLeads(response?.data?.data?.reverse());
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }

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
        if (response?.data?.status === 1) {
         const filteredData = response?.data?.data.filter(item => item.created_by === userName[0][0]?.email);
        setTableData(filteredData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  // console.log(tableData)
  useEffect(() => {
    if (role_name === "lead_viewer") {
      allLeads();
    } else if (role_name === "blogger") {
      blogData();
    }
  }, [role_name, userName]);

  return (
    <>
     <main>
     {role_name === "lead_viewer" ? 
  (
    isLoading ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>Loading...</div> 
    : leads?.length === 0 ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>No leads Found</div> 
    : 
      <LeadReview leads={leads} />
  ) 
: role_name === "blogger" ? 
  (
    isLoading ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>Loading...</div> 
    : tableData?.length === 0 ? 
      <div style={{ padding: "1.5rem", textAlign: "center" }}>No Blogs Found</div> 
    : 
      <BlogPerformance data={tableData} user={role_name}/>
  ) 
: 
  <StaticNew/>
}


      </main>
    </>
  );
};

export default Editor;