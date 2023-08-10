import React from 'react';
import TickMark from '../../assets/image/white-tick-mark.svg';
import UserIcon from '../../assets/image/user-icon.svg';
import Download from '../../assets/image/download.svg';
import '../styles/HelpModal.css';

const ServiceRequestTab = ({onClose}) => {
  return (
    <div className='service-request-container'>
        <div className='service-req-modal-box '>
        <div className='time-container'>
            <div className='service-req-top'>
            <p className='common-fonts service-request-heading'>Service request</p>
            <div className='service-req-cross-btn' onClick={onClose}>&times;</div>
            </div>
        
        <p className='common-fonts time-request-note'>Unable to create deals (INC0027899)</p>

        <div>
            <div className='service-user-details'>
                <p className='common-fonts service-user-name'>Name</p>
                <p className='common-fonts'>anant singh chauhan</p>
            </div>
            <div className='service-user-details'>
                <p className='common-fonts service-user-name'>phone</p>
                <p className='common-fonts'>7456982315</p>
            </div>
            <div className='service-user-details'>
                <p className='common-fonts service-user-name'>email</p>
                <p className='common-fonts'>anantsingh@gmail.com</p>
            </div>
            <div className='service-user-details'>
                <p className='common-fonts service-user-name'>priority</p>
                <p className='common-fonts'>High</p>
            </div>
        </div>


        <div className='time-progress-section1'>
            <div className='green-color-tick'>
                <img src={TickMark} alt="" />
            </div>

            <div className='service-request-open'>
                <p className='common-fonts'>Service request open</p>
                <p className='common-fonts service-date'>August 3, 2023</p>
            </div>
            <div className='green-line'></div>
        </div>

        <div className='time-progress-section2'>
            <div className='green-color-tick'>
                <img src={TickMark} alt="" />
            </div>

            <div className='service-request-open'>
                <p className='common-fonts'>Agent assigned</p>
                <p className='common-fonts service-date'>August 3, 2023</p>
                <div className='time-user-name'>
                    <div className='time-user-icon'>
                    <img src={UserIcon}  alt="" />
                    </div>
                    <p className='common-fonts'>Uday Misra</p>
                </div>
            </div>
            <div className='white-line'></div>
        </div>

        <div className='time-progress-section1'>
            <div className='white-color-tick'>
                <img src={TickMark} alt="" />
            </div>

            <div className='service-request-open'>
                <p className='common-fonts issue-resolved'>Issue Resolved</p>
            </div>
            <div className='white-line'></div>
        </div>

        <div className='attachments-section'>
            <p className='common-fonts time-attachments'>Attachments</p>
            <p className='common-fonts time-screenshot'>screenshot_deals_2023 <img src={Download} alt="" /></p>
        </div>



    </div>

        </div>

    </div>
  )
}

export default ServiceRequestTab