import React, { useState } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const PlayerAwards = ({ isEditable, isDisabled, faqs, addSkills, deleteSkills, updateSkills }) => {
  const [skills, setSkills] = useState('');

  const handleAddSkills = () => {
    if (skills.trim() !== '') {
      addSkills(skills);
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
            placeholder='Add a new Award'
          />
        </div>
        {isEditable ? (
          <button type="button" className="convertToDeal" onClick={handleAddSkills} disabled={!skills.trim()}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <button disabled className="disabledBtn">
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      {faqs?.map((faq, index) => (
        <div key={index} className='coachFaqs-flex'>
          <div className="coachFaqs-left">
            <input
              type="text"
              value={faq}
              onChange={(e) => updateSkills(index, e.target.value)}
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
          </div>
          {isEditable && (
            <button type="button" className="deleteFaq" onClick={() => deleteSkills(index)}>
              <i className="fa-solid fa-minus"></i>
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default PlayerAwards;
