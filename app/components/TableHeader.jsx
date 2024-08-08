import React from "react";

const TableHeader = ({columns, deleteColumn}) => {
  return (
    <thead>
      <tr className="">
        <th className="p-2"></th>
        <th className="p-2 sticky left-0 font-[500] bg-gray-50 z-10 min-w-[250px]">
          Product Filter
        </th>
        {columns.map((col) => (
          <th key={col} className="p-2 font-[500]">
            <div className="flex justify-between items-center px-6">
              {col.toUpperCase()}
              <button
                onClick={() => deleteColumn(col)}
                className="ml-2 text-red-500 text-xl font-[600]"
              >
                🗑
              </button>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
