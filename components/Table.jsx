"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { Modal, TableBodyRow, TableHeader } from ".";
import Image from "next/image";

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const newlRowNum = useRef(1);
  const newlColumnNum = useRef(1);

  // To control the modal content and visibility
  const [modalContent, setModalContent] = useState('');
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModalVisible, setModalVisible] = useState(false);

  const handleScroll = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isModalVisible]);

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
        img: "https://newcdn.kalkifashion.com/media/catalog/product/d/i/disha_patani_in_peach_lehenga_set-sg183849_1_.jpg",
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
    <span className="cursor-move mr-2">
      <Image src="/drag.svg" alt="drag-icon" height={20} width={20}/>
    </span>
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
      setModalContent={setModalContent}
      setModalPosition={setModalPosition}
      setModalVisible={setModalVisible}
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
      {/* Modal to show on hover */}
      <Modal setModalVisible={setModalVisible} content={modalContent} position={modalPosition} visible={isModalVisible} />
    </div>
  );
};

export default Table;
