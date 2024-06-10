import React, { useState } from 'react';
import { editStylingTextarea2, normalStylingTextarea2 } from "./../utils/variables";

const CoachFaq = ({ isEditable, isDisabled }) => {
    const [faqs, setFaqs] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
const [updateBtn, setUpdateBtn] = useState(0);
    const addFaq = () => {
        setFaqs([...faqs, { question, answer }]);
        setQuestion('');
        setAnswer('');
    };

    const updateFaq = (index, field, value) => {
        const updatedFaqs = faqs.map((faq, i) =>
            i === index ? { ...faq, [field]: value } : faq
        );
        setFaqs(updatedFaqs);
        setUpdateBtn(1);
    };

    const deleteFaq = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    return (
        <section className="accordion-body">
            <div className='coachFaqs-flex'>
                <div className="coachFaqs-left">
                    <textarea
                        name="question"
                        placeholder="Enter Question Here"
                        rows="2"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={
                            isEditable ? editStylingTextarea2 : normalStylingTextarea2
                        }
                        disabled={isDisabled}
                    ></textarea>
                    <textarea
                        name="answer"
                        placeholder="Type your answer here..."
                        rows="2"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        style={
                            isEditable ? editStylingTextarea2 : normalStylingTextarea2
                        }
                        disabled={isDisabled}
                    ></textarea>
                </div>
                {question && answer && isEditable ? (
                    <button type="button" className="convertToDeal" onClick={addFaq}>
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
                        <textarea
                            name="question"
                            rows="2"
                            value={faq.question}
                            onChange={(e) => updateFaq(index, 'question', e.target.value)}
                            style={
                                isEditable ? editStylingTextarea2 : normalStylingTextarea2
                            }
                            disabled={isDisabled}
                        ></textarea>
                        <textarea
                            name="answer"
                            rows="2"
                            value={faq.answer}
                            onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                            style={
                                isEditable ? editStylingTextarea2 : normalStylingTextarea2
                            }
                            disabled={isDisabled}
                        ></textarea>
                    </div>
                    {isEditable && (
                        <button type="button" className="deleteFaq" onClick={() => deleteFaq(index)}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                    )}
                </div>
            ))}
             <div className='coachFaqs-flex'>
                <span></span>
                {updateBtn ? (
                    <button type="button" className="convertToDeal">
                        Update
                    </button>
                ) : (
                    <button disabled className="disabledBtn">
                        Update
                    </button>
                )}
             </div>
        </section>
    );
};

export default CoachFaq;
