import React, { useState } from 'react'
import MailerControl from './MailerControl';

const Mailer = () => {
    const [openAccordionId, setOpenAccordionId] = useState(null);
    const toggleAccordion = (id) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };
    return (
        <>
            {/* <div className='box-border'>
                <div className='review-top-flex'>
                    <p className="common-fonts reply-head">Mailer name</p>
                    <p className="common-fonts reply-head">Activate</p>
                    <p className="common-fonts reply-head">Mailer Freqency</p>
                    <p className="common-fonts reply-hea">Send New Mailer</p>
                </div>
            </div> */}
            <div className='box-border' key="1">
                <div className='review-top-flex mailerHead' onClick={() => toggleAccordion("1")} style={{ cursor: 'pointer' }}>
                    <p className="common-fonts reply-head">Mailer Name: Account Info </p>
                    <p className="common-fonts reply-head">Start Date : 2024-06-22 At 12:34:54 </p>
                </div>
                {openAccordionId === "1" && (
                    <>
                    <MailerControl/>
                        <div className='flexBox'>
                            <div>
                            <p className="common-fonts reply-head">==========================Mailer Past details========================== </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* <div className='box-border' key="2">
                <div className='review-top-flex mailerHead' onClick={() => toggleAccordion("2")} style={{ cursor: 'pointer' }}>
                    <p className="common-fonts reply-head">BMP Advertise </p>
                    <p className="common-fonts reply-head">
                        <label className="password-switch lead-switch">
                            <input
                                type="checkbox"
                            />
                            <span className="password-slider lead-slider password-round"></span>
                        </label> </p>
                    <p className="common-fonts reply-head">
                        <select className="selectSec">
                            <option value="">Frequency :</option>
                            <option value=""></option>
                        </select>  </p>
                    <p className="common-fonts reply-head"> <button className="convertToDeal">
                        Immediate Mailer
                    </button> </p>
                </div>
                {openAccordionId === "2" && (
                    <>
                        <div className='flexBox'>
                            <div>
                            <p className="common-fonts reply-head">==========================Mailer Past details========================== </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='box-border' key="3">
                <div className='review-top-flex mailerHead' onClick={() => toggleAccordion("3")} style={{ cursor: 'pointer' }}>
                    <p className="common-fonts reply-head">Product Info </p>
                    <p className="common-fonts reply-head">
                        <label className="password-switch lead-switch">
                            <input
                                type="checkbox"
                            />
                            <span className="password-slider lead-slider password-round"></span>
                        </label> </p>
                    <p className="common-fonts reply-head">
                        <select className="selectSec">
                            <option value="">Frequency :</option>
                            <option value=""></option>
                        </select>  </p>
                    <p className="common-fonts reply-head"> <button className="convertToDeal">
                        Immediate Mailer
                    </button> </p>
                </div>
                {openAccordionId === "3" && (
                    <>
                        <div className='flexBox'>
                            <div>
                            <p className="common-fonts reply-head">==========================Mailer Past details ==========================</p>
                            </div>
                        </div>
                    </>
                )}
            </div> */}
        </>
    )
}

export default Mailer