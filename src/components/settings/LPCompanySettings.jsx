import React from 'react';
import '../styles/CompanySettings.css';
import LPSettingSidebar from './LPSettingSidebar';
import { useState } from 'react';
import CPPasswordPolicy from './CPPasswordPolicy';
import CPProducts from './CPProducts';
import CPBillings from './CPBillings';
import CPGenral from './CPGenral';

const LPCompanySettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  function handleTabChange(tabName){
    setActiveTab(tabName)
  }
  return (
    <div className="settings-container">
    <LPSettingSidebar />
    <div className="mainPage">
          <section className="cs-container">
            <div>
                <p className='common-fonts cs-heading'>company settings</p>
            </div>

            <div className="user-team-setting-btn common-fonts cs-tabs">
            <button
              className={`user-team-btn ${activeTab === "general" ? "common-active" : ""
                }` }  onClick={() => handleTabChange('general')}
              
            >
              General
            </button>
            <button
              className={`user-team-btn ${activeTab === "products" ? "common-active" : ""
                }`}
                onClick={() => handleTabChange('products')}
              
            >
              Products
            </button>
            <button
              className={`user-team-btn ${activeTab === "billings" ? "common-active" : ""
                }`}
                onClick={() => handleTabChange('billings')}
              
            >
              Billings
            </button>
            <button
              className={`user-team-btn ${activeTab === "master-settings" ? "common-active" : ""
                }`}
                onClick={() => handleTabChange('master-settings')}
              
            >
              Master Settings
            </button>
            <button
              className={`user-team-btn ${activeTab === "password-policy" ? "common-active" : ""
                }`}
                onClick={() => handleTabChange('password-policy')}
              
            >
              Password Policy
            </button>
            <button
              className={`user-team-btn ${activeTab === "support" ? "common-active" : ""
                }`}
                onClick={() => handleTabChange('support')}
              
            >
              Support
            </button>
          </div>


          {activeTab === "general" && (
            <>
             <CPGenral/>
            </>
          )
         }

          {activeTab === "products" && (
            <>
             <CPProducts/>
            </>
          )
         }
          {activeTab === "billings" && (
            <>
            <CPBillings/>
            </>
          )
         }
          {activeTab === "master-settings" && (
            <>
            <p>Master Settings</p>
            </>
          )
         }
          {activeTab === "password-policy" && (
            <>
          <CPPasswordPolicy/>
            </>
          )
         }
          {activeTab === "support" && (
            <>
            <p>Support</p>
            </>
          )
         }

            
          </section>
        </div>
    </div>
  )
}

export default LPCompanySettings