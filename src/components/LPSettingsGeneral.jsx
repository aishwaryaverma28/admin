import React,{useState,useEffect} from 'react'
import LPSettingSidebar from './LPSettingSidebar'
import "./styles/LPSetting.css";
import UserIcon from '../assets/image/user-icon.svg';
import "./styles/LPGeneral.css";
import axios from "axios";
import { USER_INFO,getDecryptedToken,handleLogout } from "./utils/Constants";
const LPSettingsGeneral = () => {
    const [clientData, setClientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const decryptedToken = getDecryptedToken();
    const [activeTab, setActiveTab] = useState('profile');
    useEffect(() => {
        getUser()
      }, []);
    
      async function getUser() {
        try {
          const response = await axios.get(
            USER_INFO,
            {
              headers: {
                Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
              },
            }
          );
          const data = response.data.data;
          if (response.data.status === 1) {
            setClientData(data[0]);
        //   setPic(VIEW_IMG + data[0].profile_image);
        }
          else {
            if (response.data.message === "Token has expired") {
              alert(response.data.message);
             handleLogout() 
            }
          }
          setIsLoading(false); // Set isLoading to false after data is fetched
        } catch (error) {
          console.log(error);
          setIsLoading(false); // Set isLoading to false after data is fetched
        }
      }

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

  
  return (
    <div className='settings-container'>
    <LPSettingSidebar/>
    <div className='mainPage'>

    <section className="genral-setting-container genral-setting-fonts">
        <p className="genral-heading">general</p>

        <div className="genral-setting-btn genral-setting-fonts">
            <button
              className={`genral-btn ${activeTab === 'profile' ? 'genral-active' : ''}`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </button>
            <button
              className={`genral-btn ${activeTab === 'email' ? 'genral-active' : ''}`}
              onClick={() => handleTabClick('email')}
            >
              Email Sync
            </button>
            <button
              className={`genral-btn ${activeTab === 'contact' ? 'genral-active' : ''}`}
              onClick={() => handleTabClick('contact')}
            >
              Contact Sync
            </button>
          </div>
          {activeTab === 'profile' && (
            <>
        <div className="genral-user genral-setting-fonts">
            <p>Profile Image</p>
            <div className="genral-image">
                <img src={UserIcon} alt=""/>
            </div>
        </div>
        {isLoading ? (
            <p>Loading...</p>
          ) : (
        <div className="genral-setting-form genral-setting-fonts">
            <form action="">
                <div className="genral-form-division">
                    <div className="genral-form-section1">
                        <div className="genral-form-fields">
                            <label htmlFor="">First Name</label>
                            <input
                        type="text"
                        className="genral-form-input genral-setting-fonts"
                        value={clientData.first_name || ''}
                      />
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="">Last Name</label>
                            <input type="text" className="genral-form-input genral-setting-fonts" value={clientData.last_name || ''}/>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="">Email</label>
                            <input type="email" className="genral-form-input genral-setting-fonts" value={clientData.email || ''}/>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="">Timezone</label>
                            <select name="" id="" className="genral-form-select genral-setting-fonts genral-timezone">
                                <option value="">(+05:30) asia/kolkata</option>
                            </select>
                            <p className="timezone-note">Timezone is updated automatically to match your computer timezone</p>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="" className="genral-language">Language</label>
                            <select name="" id="" className="genral-form-select genral-setting-fonts genral-timezone">
                                <option value="">English</option>
                            </select>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="" className="genral-language">date, time/number format </label>
                            <select name="" id="" className="genral-form-select genral-setting-fonts genral-timezone">
                                <option value="">english (united kingdom) </option>
                            </select>
                        </div>

                    </div>
                    <div className="genral-form-section2">
                        <div className="genral-form-fields">
                            <label htmlFor="">Currency </label>
                            <select name="" id="" className="genral-form-select genral-setting-fonts genral-timezone">
                                <option value="">USD (US dollars) </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="general-page-btn">
                <button className="general-discard-btn">Discard</button>
                <button className="general-save-btn">Save</button>
                </div>

                
            </form>
        </div>
          )}
        </>
          )}
            {activeTab === 'email' && (
            <>
              email
            </>
          )}

          {activeTab === 'contact' && (
            <>
              contact
            </>
          )}
    </section>

    </div>
    
    </div>
  )
}

export default LPSettingsGeneral