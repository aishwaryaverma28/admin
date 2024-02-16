import React, { useState, useEffect } from 'react';

const DynamicTable = ({ onDataSave, initialData }) => {
  console.log(initialData);
  const [rows, setRows] = useState(initialData ? initialData?.length : 1);
  const [columns, setColumns] = useState(initialData ? initialData[0]?.length : 1);
  const [tableData, setTableData] = useState(initialData || []);

  useEffect(() => {
    if (initialData) {
      setRows(initialData?.length);
      setColumns(initialData[0]?.length);
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
    // Call the onDataSave function whenever table data changes
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
          />
        );
      }
      rowsArray.push(row);
    }
    return rowsArray;
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    setRows(rows + 1);
    setTableData([...tableData, Array(columns).fill('')]);
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    setColumns(columns + 1);
    const newData = tableData.map((row) => {
      return [...row, ''];
    });
    setTableData(newData);
  };

  const handleRemoveRow = (e) => {
    e.preventDefault();
    if (rows > 1) {
      setRows(rows - 1);
      setTableData(tableData.slice(0, -1));
    }
  };

  const handleRemoveColumn = (e) => {
    e.preventDefault();
    if (columns > 1) {
      setColumns(columns - 1);
      const newData = tableData.map((row) => {
        return row.slice(0, -1);
      });
      setTableData(newData);
    }
  };

  return (
    <div>
      <div>
        <label>Rows:</label>
        <input type="number" value={rows} onChange={handleRowChange} />
        {/* <button onClick={handleAddRow}>Add Row</button> */}
        {/* <button onClick={handleRemoveRow}>Remove Row</button> */}
      </div>
      <div>
        <label>Columns:</label>
        <input type="number" value={columns} onChange={handleColumnChange} />
        {/* <button onClick={handleAddColumn}>Add Column</button> */}
        {/* <button onClick={handleRemoveColumn}>Remove Column</button> */}
      </div>
      <div>
        {rows > 0 && columns > 0 && (
          <div className="table">
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

export default DynamicTable;
