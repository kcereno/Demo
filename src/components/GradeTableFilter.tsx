import React from 'react';
import Dropdown from './ui/Dropdown';

function GradeTableFilter() {
  const dropdownData = [
    {
      header: 'Home Ownership',
      options: ['RENT', 'MORTGAGE', 'OWN'],
    },
    {
      header: 'Quarter',
      options: ['1', '2', '3', '4'],
    },
    {
      header: 'Year',
      options: ['2012', '2013', '2014', '2015', '2016'],
    },
    {
      header: 'Grade',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
  ];

  return (
    <div className="flex gap-2">
      {dropdownData.map((data, index) => (
        <Dropdown
          key={index}
          header={data.header}
          options={data.options}
        />
      ))}
      <button
        type="button"
        className=" w-36  text-red-700 hover:text-white border h-12 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Reset
      </button>
    </div>
  );
}

export default GradeTableFilter;
