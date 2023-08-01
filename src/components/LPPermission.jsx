import React, { useState } from 'react';
import LPSettingSidebar from './LPSettingSidebar';
import './styles/Permissions.css';
import User from '../assets/image/user-icon.svg';
import LeftArrow from '../assets/image/arrow-left.svg';
import TeamArrow from '../assets/image/team-arrow.svg';


const LPPermission = () => {
  const [actionOpen, setActionOpen] = useState(true);


  function handleTeamDisplay() {

    setActionOpen(!actionOpen);
  }


  return (
    <div className="settings-container">
      <LPSettingSidebar />
      <div className="mainPage">
        <section className="permission-container">
          <div className="back-to-user">
            <button className="common-fonts"><img src={LeftArrow} alt="" /><span>Back To User</span></button>
          </div>

          <div className="permission-user-container">
            <div className="permission-user-icon">
              <img src={User} alt="" />
            </div>

            <div className="permission-user-details">
              <p className="common-fonts permission-username">ameesha kapoor</p>
              <p className="common-fonts permission-email">ameeshak123@gmail.com</p>
            </div>

            <div>
              <button className="permission-reset-btn common-fonts">Reset Password</button>
            </div>
          </div>


          <div className="permission-wrapper">
            <form action="">
              <div className="permission-display">
                <div>
                  <p className="common-fonts permission-user-info">User Information</p>

                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">First Name</label>
                    <input type="text" className="permission-input common-fonts" />
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">Last Name</label>
                    <input type="text" className="permission-input common-fonts" />
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">Email</label>
                    <input type="email" className="permission-input common-fonts" />
                  </div>

                </div>
                <div>

                  <p className="common-fonts permission-user-info">Account Information</p>

                  <div className="permission-input-box">
                    <label className="common-fonts permission-label">password expiration date</label>
                    <input type="date" className="permission-input common-fonts" />
                  </div>


                </div>
              </div>
            </form>
          </div>

          <div>
            <p className="permission-team-heading common-fonts">teams</p>
            <p className="permission-note common-fonts">To create or edit a team, go to <a href="" className="permission-team-link"><span>&nbsp;Teams&nbsp;&nbsp;</span><img src={TeamArrow} alt="" /></a></p>
          </div>

          <div>
            <p className="common-fonts permission-assign-team">Assigned team</p>
            <p className='common-fonts permission-assign-note'>Assigned team member will have all the access to teams lead, deals, contacts & companies. They will be the part of team notification, tasks, notes, workflow.</p>

            <div className='permission-input team-angel' onClick={handleTeamDisplay}><i
              className={`fa-sharp fa-solid ${actionOpen ?  "fa-angle-down" : "fa-angle-up"
                }`}
            ></i></div>
          </div>
          {
            actionOpen && (
              <div className='team-div-display'>
                <ul className='common-fonts'>
                  <li>Anant Team</li>
                  <li>Mahesh Team</li>
                  <li>Aishwarya Team</li>
                </ul>
              </div>

            )
          }


          <div className='permission-table-info'>
            <div>
              <p className='common-fonts permission-name'>permissions</p>
              <p className='common-fonts permission-line'>Permissions manage which tools are available to users.</p>
            </div>
            <div>
              <button className='common-save-btn'>Add Role</button>
            </div>
          </div>

          <div>
              <table className="permission-table" >
                <thead>
                  <tr className="common-fonts permission-table-heading">
                    <th>ROLE</th>
                    <th>MODULE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                  </tr>
                </thead>
                <tbody>
                <tr className="common-fonts permission-table-heading">
                    <td>contacts edit</td>
                    <td>contacts</td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                  </tr>
                <tr className="common-fonts permission-table-heading">
                    <td>deals view</td>
                    <td>deals</td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                  </tr>
                <tr className="common-fonts permission-table-heading">
                    <td>deals edit</td>
                    <td>deals</td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                  </tr>
                <tr className="common-fonts permission-table-heading">
                    <td>deals view</td>
                    <td>deals</td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                  </tr>
                <tr className="common-fonts permission-table-heading">
                    <td>lead edit</td>
                    <td>Leads</td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                    <td>
                    <input type="date" className="permission-table-input common-fonts" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>



        </section>
      </div>
    </div>
  )
}

export default LPPermission