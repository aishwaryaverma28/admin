import React, { useState } from 'react'
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
const BankEligibility = ({ onClose, loan }) => {
  console.log(loan);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTicket = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };


  return (
    <div className="help-modal-container">
      <div className="help-modal-box">
        <div className="create-lead-top">
          <p>All Banks Criteria</p>
        </div>
        <div className="time-container">
          {loan.map((item, index) => (
            <div className="time-box" key={index}>
              <div>
                <div>
                  {openIndex !== index && (
                    <div className="time-ticket-top-2">
                      <p className="common-fonts ticket-title"> {item?.loan_offered_by}</p>
                      <div className="ticket-img" onClick={() => toggleTicket(index)}>
                        <img src={GreaterDown} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                {
                  openIndex === index && (
                    <>
                      <div className="time-ticket-top">
                        <div className="service-user-details ">
                          <p className="common-fonts service-user-name">Bank Name</p>
                          <p className="common-fonts">{item?.loan_offered_by}</p>
                          <div className="service-user-details ticket-img" onClick={() => toggleTicket(index)}>
                            <img src={GreaterUp} alt="" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div >
      <div className="help-cross" onClick={onClose}>
        X
      </div>
    </div >
  );
}

export default BankEligibility;