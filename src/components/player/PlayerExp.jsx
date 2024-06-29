import React, { useState } from 'react';
import { normalStylingInput, editStylingInput, editStylingTextarea2, normalStylingTextarea2 } from './../utils/variables';

const PlayerExp = ({ isEditable, isDisabled, expData, onAdd, onUpdate, onDelete }) => {
  const [playedFor, setPlayedFor] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const isValidInput = (input) => !/[;,]/.test(input);

  const addExp = () => {
    if (playedFor && date && description && isValidInput(playedFor) && isValidInput(description)) {
      const newExp = { playedFor, date, description };
      onAdd(newExp);
      setPlayedFor('');
      setDate('');
      setDescription('');
    } else {
      alert('Input cannot contain commas (,) or semicolons (;).');
    }
  };

  const handleUpdate = (index, field, value) => {
    if (isValidInput(value)) {
      onUpdate(index, field, value);
    } else {
      alert('Input cannot contain commas (,) or semicolons (;).');
    }
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <section className="accordion-body">
      <div className='coachFaqs-flex'>
        <div className="coachFaqs-left">
          <div className='flexBox extraFlex'>
            <input
              type='text'
              placeholder='Played for'
              value={playedFor}
              onChange={(e) => setPlayedFor(e.target.value)}
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={isEditable ? editStylingInput : normalStylingInput}
              disabled={isDisabled}
            />
          </div>
          <textarea
            placeholder="Enter Description"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={isEditable ? editStylingTextarea2 : normalStylingTextarea2}
            disabled={isDisabled}
          ></textarea>
        </div>
        {playedFor && date && description && isEditable ? (
          <button type="button" className="convertToDeal" onClick={addExp}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <button disabled className="disabledBtn">
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      {expData?.map((exp, index) => (
        <div key={index} className='coachFaqs-flex'>
          <div className="coachFaqs-left">
            <div className='flexBox extraFlex'>
              <input
                type='text'
                value={exp.playedFor}
                onChange={(e) => handleUpdate(index, 'playedFor', e.target.value)}
                style={isEditable ? editStylingInput : normalStylingInput}
                disabled={isDisabled}
              />
              <input
                type='date'
                value={exp.date}
                onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                style={isEditable ? editStylingInput : normalStylingInput}
                disabled={isDisabled}
              />
            </div>
            <textarea
              rows="2"
              value={exp.description}
              onChange={(e) => handleUpdate(index, 'description', e.target.value)}
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

export default PlayerExp;
