import React from 'react';
import '../styles/Contacts.css';
import { useState } from 'react';
import CompanyModal from './CompanyModal.jsx';
import PeopleModal from './PeopleModal.jsx';

const Contacts = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [number,setNumber] = useState(0);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [personModalOpen, setPersonModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNumber(number===0 ? 1 : 0)
  };

  const handleCompanyModal = () => {
    setCompanyModalOpen(true)
  }
  const handleCompanyModalClose = () => {
    setCompanyModalOpen(false)
  }
  const handlePersonModal = () => {
    setPersonModalOpen(true)
  }
  const handlePersonModalClose = () => {
    setPersonModalOpen(false)
  }
  return (
    <>

    <div className='contacts-top-flex '>

    <div className="genral-setting-btn genral-setting-fonts aaa">
    <button
              className={`genral-btn  ${activeTab === "people" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("people")}
            >
              People
            </button>
            <button
              className={`genral-btn contact-genral-btn ${activeTab === "company" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("company")}
            >
              Company
            </button>
          </div>


          <div className='contact-top-right'>
          
              <p className='common-fonts contact-records'>{number===0 ? 6 : 10} Records</p>
   
            
            {
              number===0 ? (
                <button className='common-fonts common-save-button contact-dots contact-btn-top' onClick={handlePersonModal}>Add People</button>
              ):
              (
                <button className='common-fonts common-save-button contact-dots contact-btn-top' onClick={handleCompanyModal}>Add Company</button>
              )
            }

            
            <button className='common=save-button common-white-green-button contact-dots'>Import</button>
            <button className='common-white-green-button contact-dots'>...</button>
          </div>


    </div>



          {
            activeTab==="people" && (
              <div>People</div>
            )
          }
          {
            activeTab==="company" && (
              <div>Company</div>
            )
          }

          {
            companyModalOpen && (
              <CompanyModal onClose={handleCompanyModalClose} />
            )
          }
          {
            personModalOpen&& (
              <PeopleModal onClose={handlePersonModalClose} />
            )
          }
    </>
  )
}

export default Contacts