import React,{ useState,useEffect } from 'react'
import './styles/Editor.css'
import axios from "axios";
import {BLOG_GET} from "./utils/Constants";
import { Link } from 'react-router-dom';
import TablePaginationBlog from './TablePaginationBlog';



const EmployeeView = () => {
  const [value,setValue] = useState(10);
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(BLOG_GET)
      .then((response) => {
        // setTableData((response?.data?.data));
        setTableData((response?.data?.data).reverse());
      });
  }, []);
   const selectRows = (e) => {
    setValue(e.target.value);
  }
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const filteredItems =((tableData||[]).filter((item)=>
item.title.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  // console.log(filteredItems);
  return (
    <>
    <header className="headerEditor">
        <h2>View Blog Details</h2>
    </header>
    <div className="buttonBox">
      <div className="searchBar"> <label>Search: <input type="text" onChange={handleSearchTermChange}/></label></div>
      <div>
      <Link to={"/blog/add"}><button type="button" className="addBtn">add <i className="fas fa-plus"></i></button></Link>
         <lable className="entriesLable"> Show
        <select onChange={selectRows} className="entries">
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
      Entries
      </lable>
      </div>
      
    </div>

    <div className="tableContainer">
      <TablePaginationBlog data={filteredItems} rowsPerPage={value} />
    </div>
    </>
  )
}

export default EmployeeView