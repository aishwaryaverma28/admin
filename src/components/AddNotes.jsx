import React, { useState } from "react";
import "./styles/LPleads.css";
import CRMeditor from "./CRMeditor";
import trash from "../assets/image/delete-icon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ADD_NOTES,handleApiError,decryptedToken} from "./utils/Constants";

const AddNotes = ({ item }) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const [notes, setNotes] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [isIndex, setIsIndex] = useState(-1);
  const navigate = useNavigate();
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };

  const handleAddNote = () => {
    const currentDate = new Date();
    const newNote = {
      id: Date.now(),
      content: dataFromChild,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };
    setNotes([...notes, newNote]);
    setDataFromChild("");
    const updatedFormData = {
      source_id: item.id,
      source_type: "lead",
      description: newNote.content,
      importance:1,
      created_by:"aishwarya"
    };
    console.log(updatedFormData);
    axios.post(ADD_NOTES, updatedFormData, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        handleApiError(error,navigate);
      });  
    setOpenEditor(false);
  };
  

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleEditorChange = (content, id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, content: content };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const expandEditor = () => {
    setOpenEditor(true);
  };

  function accordianClick(id) {
    if (id === isIndex) {
      setIsIndex(-1);
    } else {
      setIsIndex(id);
    }
  }

  const getShortenedContent = (content) => {
    // Remove HTML tags using regular expressions
    const strippedContent = content.replace(/<[^>]+>/g, '');
    const words = strippedContent.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return strippedContent;
  };

  return (
    <>
      {!openEditor ? (
        <div className="colapedEditor" onClick={expandEditor}>
          <p>Click here to add a note</p>
        </div>
      ) : (
        <>
          <div className="notesEditor">
            <CRMeditor onDataTransfer={handleDataTransfer} />
          </div>
          <div className="addNoteBtn">
            <button className="convertToDeal" onClick={handleAddNote}>
              Add Note
            </button>
          </div>
        </>
      )}

      {notes.length > 0 && (
        <div className="savedNotes">
          {notes.map((note) => (
            <div key={note.id} className="noteItem">
              <div
                className="addNotesDropdown"
                onClick={() => accordianClick(note.id)}
              >
                <span>Date: {note.date}</span>
                <span>Time: {note.time}</span>
                <span className="dropdownContent">
                  {isIndex === note.id ? "" : getShortenedContent(note.content)}
                </span>
                <span>
                  {isIndex === note.id ? (
                    <i className="fa-sharp fa-solid fa-minus"></i>
                  ) : (
                    <i className="fa-sharp fa-solid fa-plus"></i>
                  )}
                </span>
              </div>
              <div
                className={
                  isIndex === note.id ? "answer display_answer" : "answer"
                }
              >
                <div className="formEditor">
                  <CRMeditor
                    onDataTransfer={(data) =>
                      handleEditorChange(data, note.id)
                    }
                    initialContent={note.content}
                  />
                </div>
                <div className="deleteNote">
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="noteDeleteBtn"
                  >
                    <img src={trash} className="deleteIcon" alt="Delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddNotes;
