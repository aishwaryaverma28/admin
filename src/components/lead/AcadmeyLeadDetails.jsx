import React, { useState } from 'react';
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import '../styles/LeadDetails.css';

const AcadmeyLeadDetails = ({ leadsDetails }) => {
    const [isIndex, setIsIndex] = useState(-1);

    const accordianClick = (id) => {
        setIsIndex(isIndex === id ? -1 : id);
    };

    const getShortenedContent = (content) => {
        const strippedContent = content?.replace(/<[^>]+>/g, "");
        const words = strippedContent?.split(" ");
        if (words.length > 10) {
            return words.slice(0, 10)?.join(" ") + "...";
        }
        return strippedContent;
    };

    return (
        <section className='leadDetails-section'>
            {leadsDetails.length > 0 && (
                <div className="savedNotes">
                    {leadsDetails.map((note) => (
                        <div key={note.id} className="note-display">
                            <div className="note-content" onClick={() => accordianClick(note.id)}>
                                <div className="arrow-greater">
                                    <img src={GreaterArrow} alt="" />
                                </div>

                                <div className="notes-main">
                                    <div className="notes-by">
                                        <p><span>{note?.name}</span></p>
                                        <div className="notes-date">
                                            <p>{note.creation_date && note.creation_date.includes("T") && note.creation_date.includes(".") ? 
                                                note.creation_date.split("T")[0] + " at " + note.creation_date.split("T")[1].split(".")[0] : "-"}</p>
                                        </div>
                                    </div>
                                    {/* Conditionally render notes-content */}
                                    {isIndex !== note.id && (
                                        <div className="notes-content">
                                            <p>{getShortenedContent(note.description)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isIndex === note.id && (
                                <div className="answer display_answer">
                                    <div className='leadDetails-expand'>
                                        <div className='left-expand'>
                                            <div>{note?.phone}</div>
                                            <div>{note?.email}</div>
                                        </div>
                                        <div className='right-expand'>
                                            <div>Id: <span className='leads-details'>{note?.id}</span></div>
                                        </div>
                                    </div>
                                    <div className='lead-description leads-details'>{note.description}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AcadmeyLeadDetails;
