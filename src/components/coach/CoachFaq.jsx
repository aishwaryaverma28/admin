import React, { useState, useEffect } from 'react';
import { editStylingTextarea2, normalStylingTextarea2 } from "./../utils/variables";
import {
    getDecryptedToken, ADD_FAQ, GET_FAQS, UPDATE_FAQS, DELETE_FAQS
} from "./../utils/Constants";
import axios from 'axios';
import { toast } from 'react-toastify';

const CoachFaq = ({ isEditable, isDisabled, user_id }) => {
    const decryptedToken = getDecryptedToken();
    const [faqs, setFaqs] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateBtn, setUpdateBtn] = useState(0);

    useEffect(() => {
        getAllFaqs();
    }, [decryptedToken]);

    const getAllFaqs = () => {
        axios
            .get(GET_FAQS + user_id, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                }
            })
            .then((response) => {
                setFaqs(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const addFaq = () => {
        const body = {
            question: question,
            answer: answer,
            user_id: user_id
        }
        axios
            .post(ADD_FAQ, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 1) {
                    toast.success("Faq added successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    getAllFaqs();
                    setQuestion('');
                    setAnswer('');
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating details", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })

    };
    const updateFaq = (index, field, value) => {
        const updatedFaqs = faqs.map((faq, i) =>
            i === index ? { ...faq, [field]: value } : faq
        );
        setFaqs(updatedFaqs);
        setUpdateBtn(1);
    };

    const update = (index) => {
        const faq = faqs[index];
        const body={
            question: faq?.question,
            answer:faq?.answer,
        }
        axios
            .put(UPDATE_FAQS + faq.id, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 0) {
                    toast.success("Faq deleted successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    getAllFaqs();
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while deleting FAQ", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
    };
    const deleteFaq = (index) => {
        const faq = faqs[index];
        axios
            .delete(DELETE_FAQS + faq.id, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 0) {
                    toast.success("Faq deleted successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    getAllFaqs();
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while deleting FAQ", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
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

            {faqs?.map((faq, index) => (
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
                        <div className='coachBtns'>
                            <button type="button" className="deleteFaq" onClick={() => deleteFaq(index)}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <button type="button" className="updateFaq" onClick={() => update(index)}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default CoachFaq;
