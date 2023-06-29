import React,{useState} from 'react'

const SalaryTable = () => {
    const [value,setValue] = useState(10);
  // const [tableData, setTableData] = useState([])
  const tableData = [
    { column1: '01', column2: 'January 17, 2023',},
    { column1: '02', column2: 'Feburary 17, 2023',},
    { column1: '03', column2: 'MARCH 17, 2023',},
    { column1: '04', column2: 'April 17, 2023',},
    { column1: '05', column2: 'MAY 19, 2023',},
    { column1: '06', column2: 'JUNE 20, 2023',},
    { column1: '07', column2: 'July 17, 2023',},
    { column1: '08', column2: 'August 17, 2023',},
    { column1: '09', column2: 'September 17, 2023',},
    { column1: '10', column2: 'October 17, 2023',},
    { column1: '11', column2: 'November 17, 2023',},
    { column1: '12', column2: 'December 17, 2023',},
    { column1: '01', column2: 'January 17, 2024',},
    { column1: '02', column2: 'Feburay 17, 2024',},
    { column1: '03', column2: 'MARCH 17, 2024',},
    { column1: '04', column2: 'April 17, 2024',},
    { column1: '05', column2: 'May 17, 2024',},
    { column1: '06', column2: 'June 17, 2024',},
    { column1: '07', column2: 'July 17, 2024',},
    { column1: '08', column2: 'August 17, 2024',},
    { column1: '09', column2: 'September 17, 2024',},
    {}
  ];

const handleSearchTermChange = (e) => {
  console.log(e.target.value);
}
  const selectRows = (e) => {
    setValue(e.target.value);
  }
  return (
    <div>SalaryTable</div>
  )
}

export default SalaryTable