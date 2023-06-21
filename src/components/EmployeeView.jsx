import React,{ useState,useEffect } from 'react'
import './styles/Editor.css'
import axios from "axios";
import { EMPLOYEE_GET } from './utils/Constants'
import "./styles/EmployeeView.css";
import TableWithPagination from './TableWithPagination';
import {Link} from "react-router-dom";


const EmployeeView = () => {
  const [value,setValue] = useState(10);
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(EMPLOYEE_GET)
      .then((response) => {
        setTableData(response.data.data);
      });
  }, []);
  
  const selectRows = (e) => {
    setValue(e.target.value);
  }
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
  }
  const filteredItems = (tableData || []).filter((item) => {
    if (item && item.first_name) {
      return item.first_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
  

  console.log(filteredItems);
  return (
    <>
    <header className="headerEditor">
        <h2>View Employee Details</h2>
    </header>
    <div className="buttonBox">
      <div className="searchBar"> <label>Search: <input type="text" onChange={handleSearchTermChange}/></label></div>
      <div>
        <button type="button" className="addBtn"><Link to={"/employee/add"}>add <i className="fas fa-plus"></i></Link></button>
        <lable className="entriesLable"> Show
          <select onChange={selectRows} className="entries">
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          Entries
      </lable>
      </div>
      
    </div>

    <div className="tableContainer">
      <TableWithPagination data={filteredItems} rowsPerPage={value} />
    </div>
    </>
  )
}

export default EmployeeView