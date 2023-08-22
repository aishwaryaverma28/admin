import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import user from "../../assets/image/user.svg";
import { Link } from "react-router-dom";
import DealDeletePopUp from "../DeleteComponent";

const DealsColn = ({ object, selectedIds, setSelectedIds, status }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        isMenuOpen &&
        !menuButtonRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMenuOpen]);

  const handleChildCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  }

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  }

  // Add a useEffect to update selectedIds when the status changes
  useEffect(() => {
    if (selectedIds.includes(object.id) && object.status !== status) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== object.id)
      );
    }
    if (!selectedIds.includes(object.id) && object.status === status) {
      setSelectedIds([...selectedIds, object.id]);
    }
  }, [object.status, status]);

  return (
    <>
      <div key={object.id} className="user-card2">
        <div className="card-container">
          <div className="card-leftBox">
            <div className="user-details">
              <p className="heading">
                <Link to={"/lp/deals/" + object.id}>{object.deal_name}</Link>
              </p>
            </div>
            <div className="lead-value">
              ${object.value.toLocaleString("en-IN")}
            </div>
            <div className="contact-details">
              <div className="mail">
                <img src={user} alt="" />
                <p>{object.ownerf_name + " " + object.ownerl_name}</p>
              </div>
            </div>
            <div>
              <p className="clouserDate">
                {object.closure_date?.split("T")[0]}
              </p>
            </div>
            <div className="priorityBox">
              <p
                key={object.label_id}
                className="leads-priority"
                style={{ backgroundColor: object.label_coloure }}
              >
                {object.label_name}
              </p>
            </div>
          </div>
          <div className="DealCard-rightBox">
            <button
              className="user-setting--btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuButtonRef}
            >
              <i className="fas fa-ellipsis-h"></i>
              {isMenuOpen && (
                <ul className="cardMenu" ref={menuRef}>
                  <li>Convert to deal</li>
                  <li onClick={handleDeleteOpen}>Delete</li>
                  <li>object 3</li>
                </ul>
              )}
            </button>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                className={`cb1 ${object.status}-card-checkbox`}
                name={object.id}
                checked={selectedIds.includes(object.id)}
                onChange={() => handleChildCheckboxChange(object.id)}
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      {
        isDeleteOpen && (
          <DealDeletePopUp onClose={handleDeleteClose} />
        )
      }
    </>
  );
};

export default DealsColn;
