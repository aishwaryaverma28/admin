import React, { useState } from "react";
import "./styles/LPleads.css";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import axios from "axios";

const AddNotes = ({ item }) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const [notes, setNotes] = useState([]);
  const [openEditor, setOpenEditor] = useState(0);
  const [isIndex, setIsIndex] = useState(-1);

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
    const updatedFormData={
        source_id: item.id,
        type:"lead",
        description:notes,
    }
      axios.post("http://core.leadplaner.com:3001/api/note/add" , updatedFormData)
        .then((response) => {
          console.log(response);
        })
    
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
  function expandEditor(){
    setOpenEditor(1);
  }

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
    <div className="colapedEditor" onClick={expandEditor}><p>Click here to add a note</p></div>
      <div className="notesEditor">
        <ReactEditor onDataTransfer={handleDataTransfer} />
      </div>
      <div className="addNoteBtn">
        <button className="convertToDeal" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
      {notes.length > 0 && (
        <div className="savedNotes">
          <h3>Saved Notes:</h3>
          {notes.map((note) => (
            <div key={note.id} className="noteItem">
              <div
                className="addNotesDropdown"
                onClick={() => accordianClick(note.id)}
              >
                <span>Date: {note.date}</span>
                <span>Time: {note.time}</span>
                <span className="dropdownContent">
                {isIndex === note.id ? (
                 ""
                  ) : (
                    getShortenedContent(note.content)
                  )}
                 
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
                  <ReactEditor
                    onDataTransfer={(data) =>
                      handleEditorChange(data, note.id)
                    }
                    initialContent={note.content}
                  />
                </div>
                <div className="deleteNote">
                <button onClick={() => handleDeleteNote(note.id)} className="noteDeleteBtn">
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
