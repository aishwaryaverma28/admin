import React from "react";
import "../styles/DealUpdate.css";
import SetUp from "../../assets/image/setup.svg";

const DealsSetup = () => {
  return <div className="ds-setup-container">
    <p className="common-fonts ds-setup-heading">creating deals</p>
    <div className="ds-setup-flex">
        <img src={SetUp} alt="" />
        <div>
            <p className="common-fonts ds-setup-blue-text">customize the “create deals” data fields</p>
            <p className="common-fonts ds-setup-text">You can enhance the quality of data by selecting certain fields and highlighting some as important.</p>
        </div>
    </div>
  </div>;
};

export default DealsSetup;
