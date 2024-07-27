"use client";

import React, { useRef, useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { TableBodyRow, TableHeader } from ".";

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const newlRowNum = useRef(1);
  const newlColumnNum = useRef(1);

  // To delete row
  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  // To delete column
  const deleteColumn = (column) => {
    const newData = [...tableData];
    newData.forEach((row) => {
      delete row[column];
    });
    setTableData(newData);
  };

  // To add new column on click of add(+) icon
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

  // To add new row on click of add(+) icon
  const addRow = () => {
    const newData = [...tableData];
    const payload = { ...newData[0] };
    payload["productFilter"] = `New filter ${newlRowNum.current}`;
    newData.push(payload);
    setTableData(newData);
    newlRowNum.current++;
  };

  // All columns except first as we have to make that sticky
  const columns = Object.keys(tableData[0]).filter(
    (key) => key !== "productFilter"
  );


  /* Gets triggered when user drops the row. 
     Using array-move package to shift the row(dragged by user) in tabledata array  */
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTableData(arrayMoveImmutable(tableData, oldIndex, newIndex));
  };

  // For draghandle icon in 1st column of every row
  const DragHandle = SortableHandle(() => (
    <span className="cursor-move mr-2">☰</span>
  ));

  // Row to be made draggable
  const SortableItem = SortableElement(({ value, rowIndex }) => (
    <TableBodyRow
      rowIndex={rowIndex}
      value={value}
      columns={columns}
      deleteRow={deleteRow}
      addColumn={addColumn}
      DragHandle={DragHandle}
    />
  ));

  // Draggable Container
  const SortableList = SortableContainer(({ items }) => (
    <tbody>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
          rowIndex={index}
        />
      ))}
      <tr>
        <td onClick={addRow} className="sticky left-0">
          <div className="bg-white text-2xl cursor-pointer flex items-center justify-center p-4 w-[50px] h-[50px] rounded-lg">
            +
          </div>
        </td>
      </tr>
    </tbody>
  ));

  
  return (
    <div className="overflow-x-auto no-scrollbar">
      <table>
        <TableHeader columns={columns} deleteColumn={deleteColumn} />
        <SortableList items={tableData} onSortEnd={onSortEnd} useDragHandle />
      </table>
    </div>
  );
};

export default Table;
