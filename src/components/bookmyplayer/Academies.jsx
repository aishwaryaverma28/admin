import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GETALL_ACADEMY,getDecryptedToken } from '../utils/Constants.js';
import SearchIcon from "../../assets/image/search.svg";
import Logo from "../../assets/image/blue_logo.png";

const Academies = () => {
    const [activeTab, setActiveTab] = useState("all");
    const decryptedToken = getDecryptedToken();
    const [data, setData] = useState([]);

    const getAllAcademy = () => {
        axios.get(GETALL_ACADEMY, {
          headers: {
            Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
          }
        }).then((response) => {
          setData(response?.data?.data);
        }).catch((error)=>{
          console.log(error);
        });
      }
    
      useEffect(() => {
        getAllAcademy();
      }, []);

    const handleTabClick = (tab) =>{
      setActiveTab(tab)
    }
  return (
    <div className='academy_rejected'>
    <div className="genral-setting-btn genral-setting-fonts aaa">
      <button
        className={`genral-btn  ${
          activeTab === "all" ? "genral-active" : ""
        }`}
        onClick={() => handleTabClick("all")}
      >
        <span className="mrkt-whatsapp">All ({data?.length})</span>
      </button>

      <button
        className={`genral-btn contact-genral-btn ${
          activeTab === "pending" ? "genral-active" : ""
        }`}
        onClick={() => handleTabClick("pending")}
      >
        <span className="mrkt-whatsapp">Pending</span>
      </button>
            
      <button
        className={`genral-btn contact-genral-btn ${
          activeTab === "rejected" ? "genral-active" : ""
        }`}
        onClick={() => handleTabClick("rejected")}
      >
        <span className="mrkt-whatsapp">Rejected</span>
      </button>
            
    </div>

    {
        activeTab === "all"  && (
          <>
           <div className='academy_top'>
           <div className="recycle-search-box academy_search_box">
          <input
            type="text"
            className="recycle-search-input recycle-fonts"
            placeholder="Search..."
          />
          <span className="recycle-search-icon">
            <img src={SearchIcon} alt="" />
          </span>
        </div>
           </div>


          <div className='bmp_admin_table'>
      <table>
      <thead>

      <tr>
          <th>id</th>
          <th>Academy Name</th>
          <th>Last Updated</th>
        </tr>

      </thead>

      <tbody>
      {data.map((data) => (
        <tr key={data?.id}>
          <td>{data?.id}</td>

          <td>
          <div className='academy_new_blue_logo'>
          <img src={Logo} alt="" />
          <p> {data?.name}</p>
          </div>
        
          </td>
           
           <td>2023-10-05</td>

        </tr>
      ))}


      </tbody>
        
      </table>
    </div>
           

          </>
        )

      }

    


    </div>
  )
}

export default Academies
