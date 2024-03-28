import React, { useState } from 'react'
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import '../styles/LeadDetails.css';
const AcadmeyLeadDetails = ({ leadsDetails }) => {
    const [isIndex, setIsIndex] = useState(0);
    function accordianClick(id) {
        if (id === isIndex) {
            setIsIndex(-1);
        } else {
            setIsIndex(id);
        }
    }

    const getShortenedContent = (content) => {
        const strippedContent = content.replace(/<[^>]+>/g, "");
        const words = strippedContent.split(" ");
        if (words.length > 10) {
            return words.slice(0, 10).join(" ") + "...";
        }
        return strippedContent;
    };


    return (
        <section className='leadDetails-section'>
            {leadsDetails.length > 0 && (
                <div className="savedNotes">
                    {leadsDetails.map((note) => (
                        <>
                            <section key={note.id} className="note-display">
                                <div
                                    className="note-content"
                                    onClick={() => {
                                        accordianClick(note.id);
                                    }}
                                >
                                    <div className="arrow-greater">
                                        <img src={GreaterArrow} alt="" />
                                    </div>

                                    <div className="notes-main">
                                        <div className="notes-by">
                                            <p>
                                                <span>{note?.name}</span>
                                            </p>
                                            <div className="notes-date">
                                                <p>
                                                    {note.creation_date &&
                                                        note.creation_date.includes("T") &&
                                                        note.creation_date.includes(".")
                                                        ? note.creation_date.split("T")[0] +
                                                        " at " +
                                                        note.creation_date.split("T")[1].split(".")[0]
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="notes-content">
                                            <p classNames="notes-content">
                                                {" "}
                                                {isIndex === note.id
                                                    ? ""
                                                    : getShortenedContent(note.description)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div
                                className={
                                    isIndex === note.id ? "answer display_answer" : "answer"
                                }
                            >
                                <div className="note-display ">
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
                            </div>
                        </>
                    ))}
                </div>
            )}
        </section>
    )
}

export default AcadmeyLeadDetails