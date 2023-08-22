import React, { useState, useEffect } from "react";
import "./styles/LPleads.css";
import CRMeditor from "./CRMeditor";
import axios from "axios";
import {
  ADD_NOTES,
  GETNOTEBYSOURCE,
  GETNOTEDEAL,
  UPDATE_NOTE,
  MOVENOTE_TO_TRASH,
  handleLogout,
  getDecryptedToken,
} from "./utils/Constants";
import ThreeDots from "../assets/image/three-dots.svg";
import GreaterArrow from "../assets/image/greater-arrow.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNotes = ({ item, onNotesNum, type, id }) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [stateAdd, setStateAdd] = useState(0);
  const [stateBtn, setStateBtn] = useState(0);
  const [isIndex, setIsIndex] = useState(-1);
  const decryptedToken = getDecryptedToken();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    if (type === "lead") {
      axios
        .get(GETNOTEBYSOURCE + item.id, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data);
          setNotes(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
          if (
            error?.response?.data?.message === "Invalid or expired token."
          ) {
            alert(error?.response?.data?.message);
            handleLogout();
          }
        });
    }else if (type === "deal") {
      axios
        .get(GETNOTEDEAL + id, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data);
          setNotes(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
          if (
            error?.response?.data?.message === "Invalid or expired token."
          ) {
            alert(error?.response?.data?.message);
            handleLogout();
          }
        });
    }
  };

  const handleDataTransfer = (data) => {
    setDataFromChild(data);
    setStateAdd(1);
  };

  const handleAddNote = () => {
    const updatedFormData = {
      source_id: item.id,
      type: type,
      description: dataFromChild,
      importance: 1,
      created_by: "aishwarya",
      label_id:1,
    };

    axios
      .post(ADD_NOTES, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        fetchNotes(); // Fetch the updated notes after adding a new note
        onNotesNum();
        toast.success("Notes added successfully", {
          position:"top-center",
          autoClose:2000
        })
      })
      .catch((error) => {
        console.log(error);
      });

    setDataFromChild("");
    setOpenEditor(false);
    setStateAdd(0);
  };

  const handleEditorChange = (content, id) => {
    setContent(content);
    setStateBtn(1);
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
        type: type,
        attr2: "attr2",
        label_id:1,
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
          toast.success("Note updated successfully", {
            position:"top-center",
            autoClose:2000
          })
        })
        .catch((error) => {
          console.log(error);
        });
        setStateBtn(0);
    }
  };
  const handleDeleteNote = (id) => {
    const updatedFormData = {
      "notes": [id],
      "source_type": type,
  }
    axios
      .post(MOVENOTE_TO_TRASH, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        onNotesNum();
        toast.success("Note moved to trash successfully", {
          position:"top-center",
          autoClose:2000
        })
      })
      .catch((error) => {
        console.log(error);
      });

    setDataFromChild("");
    setOpenEditor(false);
    setStateAdd(0);
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
            {stateAdd === 0 ? (
              <button disabled className="disabledBtn">
                Add Note
              </button>
            ) : (
              <button onClick={handleAddNote} className="convertToDeal">
                Add Note
              </button>
            )}
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
                        <span>Note</span> by{" "}
                        {note.ownerf_name + " " + note.ownerl_name}
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
                  <button
                    className="note-discard-btn"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                  {stateBtn === 0 ? (
                    <button disabled className="disabledBtn">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveNote(note.id)}
                      className="convertToDeal"
                    >
                      Save
                    </button>
                  )}
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
