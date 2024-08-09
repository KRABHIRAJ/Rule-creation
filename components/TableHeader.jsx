import Image from "next/image";
import React from "react";

const TableHeader = ({columns, deleteColumn}) => {
  return (
    <thead>
      <tr >
        <th>
          <div className="p-2"></div>
        </th>
        <th className="sticky left-0 z-10">
          <div className="p-2 font-[500] bg-gray-50 z-1 min-w-[250px]">
            Product Filter
          </div>
        </th>
        {columns.map((col) => (
          <th key={col}>
            <div className="flex justify-between items-center px-6 p-2 font-[500]">
              {col.toUpperCase()}
              <button
                onClick={() => deleteColumn(col)}
                className="ml-2 text-red-500 text-xl font-[600]"
              >
                <Image  src="/trash-bin.png" alt="delete-icon" height={20} width={20}/>
              </button>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
