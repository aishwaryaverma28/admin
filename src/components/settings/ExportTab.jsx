import React from 'react';
import '../styles/CPGenral.css';
import { useState } from 'react';


const ExportTab = () => {
  const [activeTab, setActiveTab] = useState('leads');

  function handleTabChange(tabName){
    setActiveTab(tabName)
  }
  return (

 <div>
  <div className="cp-billings-tabs">
    <button  
    className={`common-fonts ${activeTab === "leads" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('leads')}
    >Leads</button>


    <button className={`common-fonts ${activeTab === "deals" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('deals')}
    >Deals</button>



    <button className={`common-fonts ${activeTab === "contacts" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('contacts')}
    >Contact</button>
  </div>


  {activeTab === "leads" && 
  <div>Leads</div>
  
         }
  {activeTab === "deals" && (
    <div>deals</div>
          )
         }
  {activeTab === "contacts" && (
    <div>contacts</div>
          )
         }
 </div>
  )
}

export default ExportTab