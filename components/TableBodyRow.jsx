import Image from "next/image";
import React from "react";

const TableBodyRow = ({ rowIndex, value, columns, deleteRow, addColumn, DragHandle, setModalContent,setModalPosition, setModalVisible}) => {
  const showModal = (content, e) => {
    console.log('show');
    const { clientX, clientY } = e;

    setModalContent(content);

    // Calculate position to center the mouse within the modal
    const top = clientY - 120 / 2;
    const left = clientX - 300 / 2;

    setModalPosition({ top, left });
    setModalVisible(true);
  };

  const hideModal = () => {
    console.log('hide');

    setModalVisible(false);
  };

  return (
    <tr>
        <td className="sticky left-0 p-2 bg-gray-50 z-10">
          <div className="">
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={() => deleteRow(rowIndex)}
                className="ml-2 text-red-500 text-xl font-[600] self-start"
              >
                <Image  src="/trash-bin.png" alt="delete-icon" height={20} width={20}/>
              </button>
              <div className="flex items-center w-[40px]">
                <p className="font-[600] text-[20px] ">{rowIndex + 1}</p>
                <DragHandle />
              </div>
            </div>
          </div>
        </td>
        <td className="left-8 sticky z-10">
          <div className="p-2 flex items-center justify-center w-[400px] h-[200px] bg-white rounded-lg m-4">
            <p 
            onMouseEnter={(e) => showModal(value.productFilter, e)}
            onMouseLeave={hideModal}
            className="border border-gray-200 px-4 py-2 rounded-md shadow-sm"
            >
              {value.productFilter}
            </p>
          </div>
        </td>
        {columns.map((col) => (
          <td key={col}>
            <div className="bg-white rounded-lg p-4 m-4 w-[200px] h-[200px] flex items-center justify-center z-0">
              <Image src={value?.[col]?.img} alt="Image" width={150} height={170} objectFit="cover" className="rounded-md z-0" />
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
