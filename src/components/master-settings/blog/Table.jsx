import React, { useEffect, useState } from 'react';

const Table = ({ onDataSave, tableFlag }) => {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [tableData, setTableData] = useState([]);

useEffect(() => {
  if (tableFlag === true){
  setRows(1);
  setColumns(1);
  setTableData([]);
  }
},[tableFlag])
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
    onDataSave(newData);
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

  return (
    <div>
      <div className='row_name'>
        <label className='row_label'>Rows:</label>
        <input type="number" value={rows} onChange={handleRowChange} className='common-fonts common-input' />
      </div>
      <div className='row_name'>
        <label className='row_label'>Columns:</label>
        <input type="number" value={columns} onChange={handleColumnChange} className='common-fonts common-input' />
      </div>
      <div>
        {rows > 0 && columns > 0 && (
          <div className='dynamic-box'>
            {generateTable().map((row, index) => (
              <div key={`row-${index}`}>
                {row}
              </div>
            ))}
          </div>
        )}
      </div>
      <br/><br/>
    </div>
  );
};

export default Table;
