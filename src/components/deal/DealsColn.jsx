import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import {
   getDecryptedToken,
} from "../utils/Constants";
import axios from "axios";
import user from "../../assets/image/user.svg";
import Modal from "../Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DealsColn = ({ leadArray, leadKey, onLeadAdded, selectedCardIds, onCardSelection, mergedLabels }) => {
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRefs = useRef([]);
  const [isOpenState, setIsOpenState] = useState({});
  const decryptedToken = getDecryptedToken();
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] =
    useState(false);
  const [checkedRows, setCheckedRows] = useState({});

// console.log(leadArray);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const totalValue = leadArray.reduce((sum, item) => sum + item.value, 0);

  const toggleDropdown = (itemId, option) => {
    if (option === "Delete") {
      setItemToDelete(leadArray.find((item) => item.id === itemId));
      setDeleteConfirmationVisible(true);
    } else {
      setIsOpenState((prevState) => ({
        ...prevState,
        [itemId]: !prevState[itemId],
      }));
    }
  };
  const deleteCard = (itemId) => {
    const body = {
      leadIds: [itemId,]
    };
    // axios
    //   .delete(MOVELEAD_TO_TRASH, {
    //     data: body,
    //     headers: {
    //       Authorization: `Bearer ${decryptedToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     toast.success("Lead moved to trash successfully", {
    //       position: "top-center",
    //       autoClose: 2000
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setDeleteConfirmationVisible(false);
    onLeadAdded();
  };

  useEffect(() => {
    const initialIsOpenState = leadArray.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {});
    setIsOpenState(initialIsOpenState);
  }, [leadArray]);

  // Effect hook to add click event listener when the component mounts
  useEffect(() => {
    const handleOutsideClick = (event) => {
      for (const itemId in isOpenState) {
        if (
          dropdownRefs.current[itemId] &&
          !dropdownRefs.current[itemId].contains(event.target)
        ) {
          setIsOpenState((prevState) => ({
            ...prevState,
            [itemId]: false,
          }));
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenState]);

  // Function to handle header checkbox click
  const handleHeaderCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsHeaderCheckboxChecked(checked);

    // Set the checked state for all rows based on the header checkbox value
    const updatedCheckedRows = {};
    leadArray.forEach((item) => {
      updatedCheckedRows[item.id] = checked;
    });
    setCheckedRows(updatedCheckedRows);

    // Update the selectedCardIds based on the header checkbox value
    if (checked) {
      const allIds = leadArray.map((item) => item.id);
      onCardSelection(allIds, true);
    } else {
      onCardSelection([], false);
    }
  };
  // Function to handle individual checkbox click
  const handleCheckChange = (e) => {
    const { name, checked } = e.target;

    // Update the checked state for the clicked row
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [name]: checked,
    }));
    const cardId = parseInt(name);
    // Update the selectedCardIds based on the checkbox value
    onCardSelection(cardId, checked);
  };

  const areAllRowsChecked = () => {
    return leadArray.every((item) => checkedRows[item.id]);
  };
  useEffect(() => {
    // Set the header checkbox state based on the checked state of all rows
    setIsHeaderCheckboxChecked(areAllRowsChecked());
  }, [checkedRows, leadArray]);
  return (
    <>
      <div className="card-details">
        <div className="main-cards">
          <div className="cards-new">
            <p
              className="DealName"
            >
              {leadKey + " (" + leadArray.length + ")"}
            </p>
            {leadArray.length > 0 && (
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  className={`cb1 ${leadKey}-header-checkbox`}
                  name="headerCheckBox"
                  onChange={handleHeaderCheckboxChange}
                  checked={isHeaderCheckboxChecked}
                />
                <span className="checkmark"></span>
              </label>
            )}
          </div>

          {leadArray.map((item) => (
            <div key={item.id} className="user-card">
              <div className="card-container">
                <div className="card-leftBox">
                  <div className="user-details">
                    <p className="heading" onClick={() => openModal(item)}>
                      {/* {item.lead_name} */}
                      Deal Name
                    </p>
                  </div>
                  <div className="lead-value">
                    ${item.value.toLocaleString("en-IN")}
                  </div>
                  <div className="contact-details">
                    <div className="mail">
                      <img src={user} alt="" />
                      <p>Deal Owner</p>
                      {/* <p>{item.first_name + " " + item.last_name}</p> */}
                    </div>
                  </div>
                  <div>
                    <p className="clouserDate">{item.closure_date?.split("T")[0]}</p>
                  </div>
                  {/* <div className="priorityBox"> */}
                  <div className="DealpriorityBox">
                    lables
                    {mergedLabels.map((label) => (
                      label.id === item.label_id ? (
                        <p
                          key={label.id}
                          className="leads-priority"
                          style={{ backgroundColor: label.colour_code }}
                        >
                          {label.name}
                        </p>
                      ) : null
                    ))}
                  </div>
                </div>
                <div className="DealCard-rightBox">
                  <button
                    className="user-setting--btn"
                    ref={(ref) => (dropdownRefs.current[item.id] = ref)}
                  >
                    <i
                      className="fas fa-ellipsis-h"
                      onClick={() => toggleDropdown(item.id)}
                    ></i>

                    {isOpenState[item.id] && (
                      <ul className="cardMenu">
                        <li>Convert to deal</li>
                        <li onClick={() => toggleDropdown(item.id, "Delete")}>
                          Delete
                        </li>
                        <li>Item 3</li>
                      </ul>
                    )}
                    {deleteConfirmationVisible && (
                      <div className="popup-container">
                        <div className="popup">
                          <p className="popupHead">Delete Lead</p>
                          <p>
                            Deleted leads will be in recycle bin for 90 days
                          </p>
                          <p className="deleteMsg">
                            Are you sure you want to delete this lead?
                          </p>
                          <div className="popup-buttons">
                            <button
                              className="cancelBtn"
                              onClick={() =>
                                setDeleteConfirmationVisible(false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="confirmBtn"
                              onClick={() => deleteCard(itemToDelete.id)}
                            >
                              Delete Lead
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                  

                  <label class="custom-checkbox">
                    <input
                      type="checkbox"
                      className={`cb1 ${leadKey}-card-checkbox`}
                      name={item.id}
                      onChange={handleCheckChange}
                      checked={checkedRows[item.id] || false}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className="bottom-fixed">
            <p>total: ${totalValue.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
      {modalVisible && (
        <Modal
          selectedItem={selectedItem}
          closeModal={closeModal}
          onLeadAdded={onLeadAdded}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default DealsColn