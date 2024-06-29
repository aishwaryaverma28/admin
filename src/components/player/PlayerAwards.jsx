import React, { useState } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const PlayerAwards = ({ isEditable, isDisabled, faqs, addSkills, deleteSkills, updateSkills }) => {
  const [skills, setSkills] = useState('');

  const isValidInput = (input) => !/[;,]/.test(input);

  const handleAddSkills = () => {
    if (skills.trim() !== '' && isValidInput(skills)) {
      addSkills(skills);
      setSkills('');
    } else {
      alert('Input cannot contain commas (,) or semicolons (;).');
    }
  };

  const handleUpdateSkills = (index, value) => {
    if (isValidInput(value)) {
      updateSkills(index, value);
    } else {
      alert('Input cannot contain commas (,) or semicolons (;).');
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
              onChange={(e) => handleUpdateSkills(index, e.target.value)}
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
