import React from 'react';
import Dropdown from './ui/Dropdown';
import {
  DropdownDataType,
  FilterType,
  HomeOwnershipEnum,
  LoanDataType,
  QuarterEnum,
  TermType,
} from '../types';
import { extractUniqueValues } from '../utils';

type GradeTableFilterProps = {
  filterBy: (filter: FilterType) => void;
  filteredData: LoanDataType[];
  loanData: LoanDataType[];
};

function GradeTableFilter({
  filterBy,
  loanData,
  filteredData,
}: GradeTableFilterProps) {
  const dropdownData: DropdownDataType[] = [
    {
      label: 'Home Ownership',
      options: extractUniqueValues(
        loanData,
        'homeOwnership'
      ) as HomeOwnershipEnum[],
    },
    {
      label: 'Quarter',
      options: extractUniqueValues(loanData, 'quarter') as QuarterEnum[],
    },
    {
      label: 'Term',
      options: extractUniqueValues(loanData, 'term') as TermType[],
    },
    {
      label: 'Year',
      options: extractUniqueValues(loanData, 'year') as number[],
    },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {dropdownData.map((data, index) => (
        <Dropdown
          key={index}
          label={data.label}
          options={data.options}
          onChange={(first) => {}}
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
