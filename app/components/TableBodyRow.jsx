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
      <td className="p-2 sticky left-0 bg-gray-50">
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => deleteRow(rowIndex)}
            className="ml-2 text-red-500 text-xl font-[600] self-start"
          >
            🗑
          </button>
          <div className="flex items-center w-[40px]">
            <p className="font-[600] text-[20px] ">{rowIndex + 1}</p>
              <DragHandle />
          </div>
        </div>
      </td>
      <td className="p-2 sticky left-12 flex items-center justify-center w-[400px] h-[200px] bg-white rounded-lg m-4 z-10" >
        <p 
        onMouseEnter={(e) => showModal(value.productFilter, e)}
        onMouseLeave={hideModal}
        className="border border-gray-200 px-4 py-2 rounded-md shadow-sm"
        >
          {value.productFilter}
        </p>
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
