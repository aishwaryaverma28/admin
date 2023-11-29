import React, {useState} from 'react'
import {
   getDecryptedToken,
  } from "../../utils/Constants";
const AddTournament = () => {
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        sport:"",
      });
      function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
          return { ...prev, [name]: value };
        });
        setStateBtn(1);
      }
    
const handleFormSubmit = (e) => {
e.preventDefault();
}
  return (
   <>
    <header className="headerEditor">
        <p className="common-fonts add-new-blog"> Add a new Tournament</p>
      </header>
      <form className="scrollCover" onSubmit={handleFormSubmit}>
        <div className="addBlogContainer">
          {/*==============================================================left side of form starts here ============================================================*/}
          <div className="addBlogMainForm">
          <div className="from-filed">
              <label htmlFor="name" className="common-fonts blogs-new-label">
                Tournament Title
                <span className="common-fonts redAlert"> *</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Tournament Title"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>
          </form>
   </>
  )
}

export default AddTournament