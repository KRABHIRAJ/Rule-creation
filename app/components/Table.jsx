"use client";

import React, { useRef, useState } from "react";
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const newlRowNum = useRef(1);
  const newlColumnNum = useRef(1);

  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const deleteColumn = (column) => {
    const newData = [...tableData];
    newData.forEach((row) => {
      delete row[column];
    });
    setTableData(newData);
  };

  const addColumn = () => {
    const newData = [...tableData];
    newData.forEach((data) => {
      data[`newvariant${newlColumnNum.current}`] = {
        label: `New Variant ${newlColumnNum.current}`,
        img: "",
      };
    });
    setTableData(newData);
    newlColumnNum.current++;
  };

  const addRow = () => {
    const newData = [...tableData];
    const payload = { ...newData[0] };
    payload["productFilter"] = `New filter ${newlRowNum.current}`;
    newData.push(payload);
    setTableData(newData);
    newlRowNum.current++;
  };

  const columns = Object.keys(tableData[0]).filter(
    (key) => key !== "productFilter"
  );

  return (
    <div className="overflow-x-auto no-scrollbar">
      <table className="">
        <thead>
          <tr>
            <th className="p-2"></th>
            <th className="p-2 sticky left-0 font-[500] bg-gray-50 z-10 min-w-[250px]">
              Product Filter
            </th>
            {columns.map((col) => (
              <th key={col} className="p-2 font-[500]">
                {col.toUpperCase()}
                <button
                  onClick={() => deleteColumn(col)}
                  className="ml-2 text-red-500"
                >
                  🗑
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 sticky left-0 bg-gray-50">
                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    className="ml-2 text-red-500"
                  >
                    🗑
                  </button>
                  <div className="flex gap-x-2">{rowIndex + 1}</div>
                </div>
              </td>
              <td className="p-2 sticky left-12 flex items-center justify-center w-[400px] h-[200px] bg-white rounded-lg m-4 z-10">
                {row.productFilter}
              </td>
              {columns.map((col) => (
                <td key={col}>
                  <div className="bg-white rounded-lg p-4 m-4 w-[200px] h-[200px] flex items-center justify-center">
                    <p>Add Image</p>
                  </div>
                </td>
              ))}

              <td onClick={addColumn}>
                <div className="bg-white text-2xl cursor-pointer flex items-center justify-center p-4 w-[50px] h-[50px] rounded-lg">
                  +
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td onClick={addRow} className="sticky left-0">
              <div className="bg-white text-2xl cursor-pointer flex items-center justify-center p-4 w-[50px] h-[50px] rounded-lg">
                +
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
