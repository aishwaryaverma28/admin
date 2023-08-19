import React, { useEffect, useState, useRef } from "react";
import "../styles/LPleads.css";
import user from "../../assets/image/user.svg";
import { Link } from "react-router-dom";

const DealsColn = ({ object }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
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
                  <li>Delete</li>
                  <li>object 3</li>
                </ul>
              )}
            </button>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                className={`cb1 ${object.status}-card-checkbox`}
                name={object.id}
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsColn;
