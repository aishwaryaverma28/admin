import React, { useState } from 'react';
import { editStylingTextarea2, normalStylingTextarea2 } from './../utils/variables';

const PlayerEdu = ({ isEditable, isDisabled, eduData, onAdd, onUpdate, onDelete }) => {
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');

  const addEdu = () => {
    if (degree && college) {
      const newEdu = { degree, college };
      onAdd(newEdu);
      setDegree('');
      setCollege('');
    }
  };

  const handleUpdate = (index, field, value) => {
    onUpdate(index, field, value);
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <section className="accordion-body">
      <div className='coachFaqs-flex'>
        <div className="coachFaqs-left">
          <textarea
            name="degree"
            placeholder="Enter Degree Name"
            rows="2"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            style={isEditable ? editStylingTextarea2 : normalStylingTextarea2}
            disabled={isDisabled}
          ></textarea>
          <textarea
            name="college"
            placeholder="Enter College Name"
            rows="2"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            style={isEditable ? editStylingTextarea2 : normalStylingTextarea2}
            disabled={isDisabled}
          ></textarea>
        </div>
        {degree && college && isEditable ? (
          <button type="button" className="convertToDeal" onClick={addEdu}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <button disabled className="disabledBtn">
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      {eduData?.map((edu, index) => (
        <div key={index} className='coachFaqs-flex'>
          <div className="coachFaqs-left">
            <textarea
              name="degree"
              rows="2"
              value={edu.degree}
              onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
              style={isEditable ? editStylingTextarea2 : normalStylingTextarea2}
              disabled={isDisabled}
            ></textarea>
            <textarea
              name="college"
              rows="2"
              value={edu.college}
              onChange={(e) => handleUpdate(index, 'college', e.target.value)}
              style={isEditable ? editStylingTextarea2 : normalStylingTextarea2}
              disabled={isDisabled}
            ></textarea>
          </div>
          {isEditable && (
            <div className='coachBtns'>
              <button type="button" className="deleteFaq" onClick={() => handleDelete(index)}>
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default PlayerEdu;
