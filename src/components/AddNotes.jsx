import React, { useState, useEffect } from "react";
import "./styles/LPleads.css";
import CRMeditor from "./CRMeditor";
import axios from "axios";
import {
  ADD_NOTES,
  GETNOTEBYSOURCE,
  UPDATE_NOTE,
  handleLogout,
  getDecryptedToken,
} from "./utils/Constants";
import ThreeDots from "../assets/image/three-dots.svg";
import GreaterArrow from "../assets/image/greater-arrow.svg";

const AddNotes = ({ item }) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [isIndex, setIsIndex] = useState(-1);
  const decryptedToken = getDecryptedToken();
    useEffect(() => {
    // console.log(decryptedToken);
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get(GETNOTEBYSOURCE + item.id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
        // console.log(response.data.data);
        setNotes(response.data.data);
        }
        else {
          if (response.data.message === "Token has expired") {
            alert(response.data.message);
           handleLogout() 
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };

  const handleAddNote = () => {
    const updatedFormData = {
      source_id: item.id,
      type: "lead",
      description: dataFromChild,
      importance: 1,
      created_by: "aishwarya",
    };
    // console.log(updatedFormData);

    axios
      .post(ADD_NOTES, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        fetchNotes(); // Fetch the updated notes after adding a new note
      })
      .catch((error) => {
        console.log(error);
      });

    setDataFromChild("");
    setOpenEditor(false);
  };

  const handleEditorChange = (content, id) => {
    setContent(content);
  };
  const handleSaveNote = (id) => {
    const noteToUpdate = notes.find((note) => note.id === id);
    if (noteToUpdate) {
      const updatedNote = {
        description: content,
        status: "B",
        sort: 1,
        importance: "YESq",
        urgency: "Noq",
        viewable: 1,
        source_type: "source -2",
        type: "lead",
        attr2: "attr2",
      };
      const updatedNotes = notes.map((note) =>
        note.id === id ? updatedNote : note
      );
      setNotes(updatedNotes);

      axios
        .put(UPDATE_NOTE + id, updatedNote, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          fetchNotes();
        })
        .catch((error) => {
          console.log(error)
        });
    }
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
    const strippedContent = content.replace(/<[^>]+>/g, "");
    const words = strippedContent.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
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
            <>
              <section key={note.id} className="note-display">
                <div
                  className="note-content"
                  onClick={() => accordianClick(note.id)}
                >
                  <div className="arrow-greater">
                    <img src={GreaterArrow} alt="" />
                  </div>

                  <div className="notes-main">
                    <div className="notes-by">
                      <p>
                        <span>Note</span> by {note.created_by}
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

                        <div className="three-side-dots">
                          <img src={ThreeDots} alt="ddd" />
                        </div>
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
                <div className="formEditor2">
                  <CRMeditor
                    onDataTransfer={(data) => handleEditorChange(data, note.id)}
                    initialContent={note.description}
                  />
                </div>

                <div
                  className="notes-btn"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "1rem",
                  }}
                >
                  <button className="note-discard-btn">Discard</button>
                  <button
                    className="note-save-btn"
                    onClick={() => handleSaveNote(note.id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default AddNotes;
