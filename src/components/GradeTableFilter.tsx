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
  updateFilters: (updatedFilter: FilterType[]) => void;
  filters: FilterType[];
  loanData: LoanDataType[];
};

function GradeTableFilter({
  updateFilters,
  loanData,
  filters,
}: GradeTableFilterProps) {
  const dropdownData: DropdownDataType[] = [
    {
      label: 'Home Ownership',
      id: 'homeOwnership',
      options: extractUniqueValues(
        loanData,
        'homeOwnership'
      ) as HomeOwnershipEnum[],
    },
    {
      label: 'Quarter',
      id: 'quarter',
      options: extractUniqueValues(loanData, 'quarter') as QuarterEnum[],
    },
    {
      label: 'Term',
      id: 'term',
      options: extractUniqueValues(loanData, 'term') as TermType[],
    },
    {
      label: 'Year',
      id: 'year',
      options: extractUniqueValues(loanData, 'year') as number[],
    },
  ];

  const handleDropdownChange = (selectedOption: FilterType) => {
    const newFilterKey = Object.keys(selectedOption)[0];

    const existingFilterIndex = filters.findIndex((filter) =>
      filter.hasOwnProperty(newFilterKey)
    );

    const updatedFilters =
      existingFilterIndex !== -1
        ? filters.map((filter, index) =>
            index === existingFilterIndex ? selectedOption : filter
          )
        : [...filters, selectedOption];

    updateFilters(updatedFilters);
  };

  return (
    <div className="flex gap-2 justify-center">
      {dropdownData.map((data, index) => (
        <Dropdown
          key={index}
          label={data.label}
          id={data.id}
          options={data.options}
          onChange={(selectedOption) => {
            handleDropdownChange(selectedOption);
          }}
        />
      ))}
      <button
        type="button"
        className="w-36 text-red-700 hover:text-white border h-12 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Reset
      </button>
    </div>
  );
}

export default GradeTableFilter;
