import React from 'react';
import { TableDataType } from '../../types';

type TablePropsType = {
  tableData: TableDataType;
};

function Table({ tableData }: TablePropsType) {
  return (
    <div className="relative overflow-x-auto rounded-md ">
      <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableData.columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.data.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {tableData.columns.map((column, index) => (
                <td
                  key={index}
                  className="px-6 py-4"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
