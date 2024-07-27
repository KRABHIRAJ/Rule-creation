import React from "react";

const TableBodyRow = ({ rowIndex, value, columns, deleteRow, addColumn, DragHandle }) => {
  
  return (
    <tr>
      <td className="p-2 sticky left-0 bg-gray-50">
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => deleteRow(rowIndex)}
            className="ml-2 text-red-500 text-2xl self-start"
          >
            🗑
          </button>
          <div className="flex gap-x-2">
            <p>{rowIndex + 1}</p>
            <DragHandle />
          </div>
        </div>
      </td>
      <td className="p-2 sticky left-12 flex items-center justify-center w-[400px] h-[200px] bg-white rounded-lg m-4 z-10">
        {value.productFilter}
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
  );
};

export default TableBodyRow;
