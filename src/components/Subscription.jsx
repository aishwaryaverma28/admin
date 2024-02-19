import React from "react";
import Back from "../assets/image/arrow-left.svg";

const Subscription = ({ onClose }) => {
  return (
    <div className="performance_title">
      <img src={Back} alt="" onClick={onClose} />
      <span>SUBSCRIPTION DATA</span>
      <span>Total Subscription: 0</span>
    </div>
  );
};

export default Subscription;
