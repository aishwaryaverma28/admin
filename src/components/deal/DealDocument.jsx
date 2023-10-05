import React, { useEffect, useState, useRef } from "react";
import Device from '../../assets/image/device.svg';
import Cloud from '../../assets/image/cloud.svg';
import DealDocPreview from "./DealDocPreview.jsx";

const DealDocument = () => {
    const [actionopen, setActionOpen] = useState(false);
    const [actionopen2, setActionOpen2] = useState(false);
    const [preview, setPreview] = useState(false);
    const actionDropDownRef = useRef(null);
    const actionDropDownRef2 = useRef(null);

    const toggleActionDropdown = () => {
        setActionOpen(!actionopen);
      };
    const toggleActionDropdown2 = () => {
        setActionOpen2(!actionopen2);
      };
    
      useEffect(() => {
        const handleOutsideClick = (event) => {
          if (
            actionDropDownRef.current &&
            !actionDropDownRef.current.contains(event.target)
          ) {
            setActionOpen(false);
          }
        };
        const handleOutsideClick2 = (event) => {
          if (
            actionDropDownRef2.current &&
            !actionDropDownRef2.current.contains(event.target)
          ) {
            setActionOpen2(false);
          }
        };
    
        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("click", handleOutsideClick2);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener("click", handleOutsideClick);
          document.removeEventListener("click", handleOutsideClick2);
        };
      }, []);

      const handlePreview = () => {
          setPreview(true)
      }
      const handlePreviewClose = () => {
          setPreview(false)
      }
    
  
  return (
    <div className="deal-doc-wrapper">
       <div className="colapedEditor deal-doc-container">
          <p>Click here to add document</p>
        </div>
        
        <div className='deal-doc-top'>
        <div className='deal-doc-flex'>
            <img src={Device} alt="" />
            <p className='common-fonts'>Upload from the device</p>
        </div>
        <div className='doc-line'></div>

        <div className='doc-cloud-comp'>
            <img src={Cloud} alt="" className='doc-cloud-img' />
            <p className='common-fonts doc-cloud'>connect cloud storage</p>
        </div> 
        </div>

        
        <div className='deal-doc-box'>
            <div>
                <p className='comon-fonts deal-doc-sample'>docusign sample file</p>
                <div className='deal-doc-status'>
                     <div className='deal-doc-sent'>
                       <p className='common-fonts'>sent</p>
                     </div>
                   
                    <p className='common-fonts deal-doc-completed'>0/1 completed</p>
                </div>
            </div>

            <div className="select deal-doc-wrap">
            <div className="dropdown-container" ref={actionDropDownRef}>
              <div className="deal-doc-action" onClick={toggleActionDropdown}>
                Action
                <i
                    className={`fa-sharp fa-solid fa-angle-down deal-doc-angle`}
                  ></i>
              </div>
              {actionopen && (
                <div className="dropdown-menu deal-doc-menu">
                  <ul>
                    <li onClick={handlePreview}>Preview document</li>
                    <li>Share as link</li>
                    <li>Download PDF</li>
                    <li>Delete</li>
                  </ul>


                </div>
              )}
            </div>
            <div>
                <p className="common-fonts deal-doc-time">Created on Sept 13, 2023 at 10:00 AM GMT+5:30</p>
            </div>
          </div>


        </div>


        <div className='deal-doc-box'>
            <div>
                <p className='comon-fonts deal-doc-sample'>docusign sample file</p>
                <div className='deal-doc-status'>
                     <div className='deal-doc-comp'>
                       <p className='common-fonts'>completed</p>
                     </div>
                   
                    <p className='common-fonts deal-doc-completed'>0/1 completed</p>
                </div>
            </div>

            <div className="select deal-doc-wrap">
            <div className="dropdown-container" ref={actionDropDownRef2}>
              <div className="deal-doc-action" onClick={toggleActionDropdown2}>
                Action
                <i
                    className={`fa-sharp fa-solid fa-angle-down deal-doc-angle`}
                  ></i>
              </div>
              {actionopen2 && (
                <div className="dropdown-menu deal-doc-menu">
                  <ul>
                    <li onClick={handlePreview}>Preview document</li>
                    <li>Share as link</li>
                    <li>Download PDF</li>
                    <li>Delete</li>
                  </ul>


                </div>
              )}
            </div>
            <div>
                <p className="common-fonts deal-doc-time">Created on Sept 13, 2023 at 10:00 AM GMT+5:30</p>
            </div>
          </div>


        </div>
       {
        preview && (
            <DealDocPreview onClose={handlePreviewClose} />
        )
       }


        
        
    </div>
  )
}

export default DealDocument
