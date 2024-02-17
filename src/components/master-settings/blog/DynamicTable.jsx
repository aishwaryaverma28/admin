import React, { useState, useEffect } from 'react';

const DynamicTable = ({ onDataSave, initialData }) => {
  // console.log(initialData);
  const [rows, setRows] = useState(initialData ? initialData?.length : 1);
  const [columns, setColumns] = useState(initialData ? initialData[0]?.length : 1);
  const [tableData, setTableData] = useState(initialData || []);

  useEffect(() => {
    if (initialData) {
      setRows(initialData?.length);
      setColumns(initialData[0]?.length);
      setTableData(initialData);
    }
  }, [initialData]);
  
  const handleRowChange = (e) => {
    setRows(parseInt(e.target.value));
  };

  const handleColumnChange = (e) => {
    setColumns(parseInt(e.target.value));
  };

  const handleTableDataChange = (e, rowIndex, colIndex) => {
    const newData = [...tableData];
    if (!newData[rowIndex]) {
      newData[rowIndex] = [];
    }
    newData[rowIndex][colIndex] = e.target.value;
    setTableData(newData);
  };

  const generateTable = () => {
    const rowsArray = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(
          <input
            key={`cell-${i}-${j}`}
            type="text"
            value={tableData[i] ? tableData[i][j] : ''}
            onChange={(e) => handleTableDataChange(e, i, j)}
            className='dynamic-input'
          />
        );
      }
      rowsArray.push(row);
    }
    return rowsArray;
  };
  const handleAddButtonClick = (e) => {
    e.preventDefault();
    onDataSave(tableData);
  };
  return (
    <div>
      <div className='blog_dynamic_table'>
      <div className='row_name box_2'>
        <label className='row_label'>Rows:</label>
        <input type="number" value={rows} onChange={handleRowChange}  className='common-fonts common-input dynamic-input'/>
      </div>
      <div className='row_name box_2'>
        <label className='row_label'>Columns:</label>
        <input type="number" value={columns} onChange={handleColumnChange} className='common-fonts common-input dynamic-input'  />
      </div>
      </div>
      <div>
        {rows > 0 && columns > 0 && (
          <div className='box_2'>
            {generateTable().map((row, index) => (
              <div key={`row-${index}`}>
                {row}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='btn_flex_new'>
      <button onClick={handleAddButtonClick} className='common-save-button common-fonts'>ADD</button>
      </div>
      
      <br/><br/>
    </div>
  );
};

export default DynamicTable;
