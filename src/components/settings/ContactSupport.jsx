import React, { useRef, useState } from 'react';
import '../styles/CPGenral.css';

const ContactSupport = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // You can upload the file to the server here using APIs, if needed.
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };


    return (

        <div>
            <p className='common-fonts contact-support-heading'>Contact support</p>

            <div>

                <form action="">
                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Title</label>
                    <input type="text" className='common-fonts common-input contact-tab-input' />
                   </div>

                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Description</label>
                    <textarea name="" className='common-fonts common-input contact-tab-input contact-tab-textarea' placeholder='Describe your issue in detail'></textarea>
                   </div>

                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Description</label>
                    <div><select name="" id="" className='common-input contact-tab-select'><option value="">+91</option></select> <input type="text" className='common-input contact-tab-mobile contact-tab-input' /></div>
                   </div>

                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Confirm email address</label>
                    <input type="email" className='common-fonts common-input contact-tab-input' />
                   </div>

                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Type of issue</label>
                    <select name="" id="" className='common-input contact-type-of-issue'><option value=""></option></select>
                   </div>

                   <div className='contact-tab-fields'>
                    <label htmlFor="" className='common-fonts contact-tab-label'>Priority</label>
                    <select name="" id="" className='common-input contact-type-of-issue'><option value=""></option></select>
                   </div>

                   <div className='contact-tab-fields'>
  <label htmlFor="fileInput" className='common-fonts contact-tab-label'>
    Attachment
  </label>
  <div className="contact-browse" >
    <span
      className='common-fonts common-input contact-tab-input'
      style={{ position: 'relative', marginRight: '10px', color: 'blue', cursor: 'pointer' }}
    >
      <button onClick={handleBrowseClick}>Browse</button>
      <input
        type="file"
        id="fileInput"
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          cursor: 'pointer',
        }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </span>
    <span style={{ color: 'transparent' }}>No file chosen</span>
    {fileName && <p>Selected File: {fileName}</p>}
  </div>
</div>
                </form>

            </div>

        </div>
    )
}

export default ContactSupport