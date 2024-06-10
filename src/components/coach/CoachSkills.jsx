import React, { useState } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const CoachSkills = ({ isEditable, isDisabled, faqs, addFaq, deleteFaq, updateFaq }) => {
  const [skills, setSkills] = useState('');

  const handleAddFaq = () => {
    if (skills.trim() !== '') {
      addFaq(skills);
      setSkills('');
    }
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
          <button type="button" className="convertToDeal" onClick={handleAddFaq} disabled={!skills.trim()}>
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
              onChange={(e) => updateFaq(index, e.target.value)}
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
