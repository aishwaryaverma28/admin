import React from 'react'
import LPSettingSidebar from './LPSettingSidebar'
import "./styles/LPSetting.css";
import UserIcon from '../assets/image/user-icon.svg';
import "./styles/LPGeneral.css";

const LPSettingsGeneral = () => {
  return (
    <div className='settings-container'>
    <LPSettingSidebar/>
    <div className='mainPage'>

    <section className="genral-setting-container genral-setting-fonts">
        <p className="genral-heading">general</p>

        <div className="genral-setting-btn genral-setting-fonts">
            <button className="genral-btn genral-active">Profile</button>
            <button className="genral-btn ">Email Sync</button>
            <button className="genral-btn">Contact Sync</button>
        </div>

        <div className="genral-user genral-setting-fonts">
            <p>Profile Image</p>
            <div className="genral-image">
                <img src={UserIcon} alt=""/>
            </div>
        </div>

        <div className="genral-setting-form genral-setting-fonts">
            <form action="">
                <div className="genral-form-division">
                    <div className="genral-form-section1">
                        <div className="genral-form-fields">
                            <label htmlFor="">First Name</label>
                            <input type="text" className="genral-form-input genral-setting-fonts" value="Vaneet"/>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="">Last Name</label>
                            <input type="text" className="genral-form-input genral-setting-fonts" value="Gupta"/>
                        </div>

                        <div className="genral-form-fields">
                            <label htmlFor="">Email</label>
                            <input type="email" className="genral-form-input genral-setting-fonts" value="vaneetgupta@gmail.com"/>
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


    </section>

    </div>
    </div>
  )
}

export default LPSettingsGeneral