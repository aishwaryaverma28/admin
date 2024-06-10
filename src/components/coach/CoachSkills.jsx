import React, { useState } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const CoachSkills = ({ isEditable, isDisabled }) => {
  const [faqs, setFaqs] = useState([]);
  const [skills, setSkills] = useState('');
  const [addBtn, setAddBtn] = useState(0)
 
  const addFaq = () => {
    if (skills.trim() !== '') {
      setFaqs([...faqs, skills]);
      setSkills('');
    }
  };

  const deleteFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <section className="accordion-body2">
      <div className='coachFaqs-flex'>
        <div className="coachFaqs-left">
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={isEditable ? editStylingInput : normalStylingInput}
            disabled={isDisabled}
          />
        </div>
        {isEditable ? (
          <button type="button" className="convertToDeal" onClick={addFaq} disabled={!skills.trim()}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <button disabled className="disabledBtn">
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      {faqs.map((faq, index) => (
        <div key={index} className='coachFaqs-flex'>
          <div className="coachFaqs-left">
            <input
              type="text"
              value={faq}
              readOnly
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
          </div>
          {isEditable && (
            <button type="button" className="deleteFaq" onClick={() => deleteFaq(index)}>
              <i className="fa-solid fa-minus"></i>
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default CoachSkills;
