import React, {useEffect, useState} from "react";
import "./styles/LPleads.css";
import chart from "../assets/image/chart.svg"
import axios from 'axios';
import LeadsColn from "./LeadsColn";

const useDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    setIsOpen(false);
  };

  return { isOpen, toggleDropdown, handleOptionClick, dropdownRef };
};

const LPleads = () => {
  const { isOpen: isOpenLeads, toggleDropdown: toggleLeads, handleOptionClick: handleOptionClickLeads, dropdownRef: dropdownRefLeads } = useDropdown();
  const { isOpen: isOpenActions, toggleDropdown: toggleActions, handleOptionClick: handleOptionClickActions, dropdownRef: dropdownRefActions } = useDropdown();
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [totalValue,setTotalValue] = useState(0);
  useEffect(() => {
    axios
      .get("http://core.leadplaner.com:3001/api/lead/getall")
      .then((response) => {
        const dataArray = Object.entries(response.data.data);
        setData(dataArray.map(([key, value]) => value));
        setKeys(dataArray.map(([key, value]) => key));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    // Calculate total value whenever data changes
    const calculateTotalValue = () => {
      let sum = 0;
      data.forEach((lead) => {
        lead.forEach((obj) => {
          const value = Number(obj.value); // Parse value as a number
          if (!isNaN(value)) {
            sum += value;
          }
        });
      });
      return sum;
    };

    setTotalValue(calculateTotalValue());
  }, [data]);
  return (
    <div>
      <section className="lead-body">
        <div className="top-head">
          <div className="left-side--btns">
            <div className="dropdown-container" ref={dropdownRefLeads}>
              <div className="dropdown-header" onClick={toggleLeads}>
                all Leads <i class="fa-sharp fa-solid fa-angle-down"></i>
              </div>
              {isOpenLeads && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleOptionClickLeads("Option 1")}>Leads 1</li>
                  <li onClick={() => handleOptionClickLeads("Option 2")}>Leads 2</li>
                  <li onClick={() => handleOptionClickLeads("Option 3")}>Leads 3</li>
                </ul>
              )}
            </div>
            <div className="view">
              <a href="#" className="grid-view--btn active-btn">
                <img src={chart} alt="chart"/>
              </a>
              <a href="#" className="list-view--btn">
                <i className="fas fa-list-ul"></i>
              </a>
            </div>
          </div>
          <div className="right-side--btns">
            <p>sub total: ${totalValue.toLocaleString("en-IN")}</p>
            <button type="button" className="secondary-btn">
              Create Deal
            </button>
            <button type="button" className="simple-btn">
              import
            </button>
            <div className="select action-select">
              <div className="dropdown-container" ref={dropdownRefActions}>
                <div className="dropdown-header2" onClick={toggleActions}>
                  Actions <i class="fa-sharp fa-solid fa-angle-down"></i>
                </div>
                {isOpenActions && (
                  <ul className="dropdown-menu">
                    <li onClick={() => handleOptionClickActions("Option 1")}>
                      Action 1
                    </li>
                    <li onClick={() => handleOptionClickActions("Option 2")}>
                      Action 2
                    </li>
                    <li onClick={() => handleOptionClickActions("Option 3")}>
                      Action 3
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cards-body">
        {data.map((leadArray, index) => (
          <div key={keys[index]}>
            <LeadsColn key={keys[index]} leadArray={leadArray} leadKey={keys[index]} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default LPleads;
