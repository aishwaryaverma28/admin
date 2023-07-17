import React from 'react'
import LoginHeader from './LoginHeader'
import LoginFooter from './LoginFooter'
import "./styles/Registration.css";
import CRMImage from "../assets/image/crm.svg";

const Registration = () => {
  return (
    <>
    <LoginHeader/>
    <main className="main-registration">
        <div className="free-trial-section">
            <div>
                <h2 className="free-trial-heading">Start Your Free Trial</h2>
                <h3 className="no-credit">No credit card required, no software to install.</h3>
                <p className="day-trial">With your 30-day trial, you get:</p>
                <div className="data-load">

                    <ul>
                        <li>Pre-loaded data or upload your own</li>
                        <li>Pre-configured processes, reports, and dashboards</li>
                        <li>Guided experiences for sales reps, leaders, and administrators</li>
                        <li>Online training and live onboarding webinars</li>
                    </ul>

                </div>

                <p className="looking-support">Looking for support? Visit the <span> LeadPlaner Support Center</span> or
                    email</p>
                <p className="help-email">help@leadplaner.com</p>
                <div>
                    <img src={CRMImage} alt=""/>
                </div>
            </div>


        </div>

        <div className="registration-form-section">
            <h2 className="registration-form-heading">Sign Up For LeadPlaner - Your <br/> Comprehensive Lead <br/> Management
                Solution.</h2>
            <p className="welcome-planer">Welcome To LeadPlaner! Take The First Step Towards Revolutionizing Your Lead
                Management And Driving Sales Success By Signing Up For Our Powerful Lead Management Platform.</p>

            <form action="">
                <div className="form-division">
                    <div>
                        <input type="text" className="registration-form-input" placeholder="First Name*"/>
                        <input type="email" className="registration-form-input" placeholder="Work Email*"/>
                        <input type="text" className="registration-form-input" placeholder="Phone No*"/>
                        <input type="text" className="registration-form-input" placeholder="Company"/>
                    </div>
                    <div>
                        <input type="text" className="registration-form-input" placeholder="Last Name*"/>
                        <input type="password" className="registration-form-input" placeholder="Password*"/>
                        <select name="" id="" className="registration-form-input">
                            <option value="">Job Title*</option>
                        </select>
                        <select name="" id="" className="registration-form-input">
                            <option value="">Employee*</option>
                        </select>
                    </div>
                </div>
                <div className="two-select">
                    <select name="" id="">
                        <option value="">Country/Region*</option>
                    </select>
                    <select name="" id="">
                        <option value="">Role*</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" className="agree-tick"/>
                    <label for="" className="agree-checkbox">I agree to the <span>Main Service Agreement</span></label>
                </div>

                <div className="confirm-register">
                    <p>By Registering, You Confirm That You Agree To The Storing And Processing Of Your Personal Data By
                        LeadPlaner As Described In The <span> Privacy Statement.</span></p>
                </div>

                <input type="submit" value="submit" className="registration-form-submit"/>


            </form>
        </div>

    </main>
    <LoginFooter/>
    </>
  )
}

export default Registration