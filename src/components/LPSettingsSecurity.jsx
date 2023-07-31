import React from 'react';
import LPSettingSidebar from './LPSettingSidebar';
import './styles/LPSecurity.css';
import WhiteTick from '../assets/image/white-tick-mark.svg';

const LPSettingsSecurity = () => {
    return (
        <div>
            <div className="settings-container">
                <LPSettingSidebar />
                <div className="mainPage">

                <section className="security-container">
      <div>
        <p className="security-heading security-fonts">Security</p>
      </div>

      <div>
        <p className="security-password security-fonts">Password</p>
        <p className="security-note security-fonts">Keep your data safe by creating a password that is complex and long enough. It should be easy for you to remember but hard for others to guess.</p>
      </div>

      <div>
        <form action="">
          <p className="confirm-security-password security-fonts">Confirm current password</p>
          <p className="forget-security-password security-fonts">Forgot password</p>
          <input type="password" name="" id="" className="type-security-password security-fonts"/>
          <p className="security-new-password security-fonts">New password</p>
          <div>
            <input type="password" name="" id=""  className="type-security-password security-fonts"/>
            <span className="security-show-password security-fonts">show password</span>

          </div>
        </form>
      </div>

      <div className="security-list security-fonts">
        <ul>
          <li>
            <div className="security-check">
              <div className="white-tick">
                <img src={WhiteTick} alt=""/>
              </div>
              <p className="security-rule">At least 8 characters long</p>
            </div>
          </li>
          <li>
            <div className="security-check">
              <div className="white-tick">
                <img src={WhiteTick} alt=""/>
              </div>
              <p  className="security-rule">One number, symbol, or whitespace character</p>
            </div>
          </li>
          <li>
            <div className="security-check">
              <div className="white-tick">
                <img src={WhiteTick} alt=""/>
              </div>
              <p  className="security-rule">One uppercase character</p>
            </div>
          </li>
          <li>
            <div className="security-check">
              <div className="white-tick">
                <img src={WhiteTick} alt=""/>
              </div>
              <p  className="security-rule">One lowercase character</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="security-authentication">
        <p className="security-two-factor security-fonts">Two-factor authentication</p>
          <div>
            <label className="security-switch">
              <input type="checkbox"/>
              <span className="security-slider security-round"></span>
            </label>
          </div>
      </div>

      <div>
        <p className="security-bottom security-fonts">Protect your account ankitaschauhan96@gmail.com with two-factor authentication via email. Once enabled, then the next time you log in, you are asked to click the verification link in an email to access your account. You only need to verify yourself every 30 days on each device.</p>
      </div>
      
    </section>


                </div>
            </div>
        </div>
    )
}

export default LPSettingsSecurity