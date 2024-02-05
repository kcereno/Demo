import React from 'react';
import Dropdown from './ui/Dropdown';
import {
  FilterType,
  HomeOwnershipEnum,
  LoanDataType,
  QuarterEnum,
} from '../types';
import { extractUniqueValues } from '../utils';

type GradeTableFilterProps = {
  filterBy: (filter: FilterType) => void;
  loanData: LoanDataType[];
};

function GradeTableFilter({ filterBy, loanData }: GradeTableFilterProps) {
  const dropdownData = [
    {
      header: 'Home Ownership',
      options: extractUniqueValues(loanData, 'homeOwnership'),
      onChange: (value: HomeOwnershipEnum) =>
        filterBy({ homeOwnership: value }),
    },
    {
      header: 'Quarter',
      options: extractUniqueValues(loanData, 'quarter'),
      onChange: (value: QuarterEnum) => filterBy({ quarter: value }),
    },
    // {
    //   header: 'Year',
    //   options: extractUniqueValues(loanData, 'year'),
    // },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {dropdownData.map((data, index) => (
        <Dropdown
          key={index}
          header={data.header}
          options={data.options}
          onChange={data.onChange}
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
