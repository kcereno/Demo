import React from 'react';
import { LoanDataType, TableDataType, TableRowType } from '../types';
import Table from './ui/Table';
import { extractUniqueValues, convertToDollarString } from '../utils';

type GradeTableProps = {
  loanData: LoanDataType[];
};

function GradeTable({ loanData }: GradeTableProps) {
  const row: TableRowType = {};
  const rows: TableRowType[] = [row];

  // Used to determine columns names
  const uniqueGrades = extractUniqueValues(loanData, 'grade');

  const columns = uniqueGrades.map((grade) => ({
    name: `Grade ${grade}`,
    accessor: `grade ${grade}`,
  }));

  // Aggregate the total balance for each grade
  uniqueGrades.forEach((grade) => {
    const key = `grade ${grade}`;

    // Filter the loan data by grade and sum the current balance
    const totalBalance = loanData
      .filter((data) => data.grade === grade)
      .reduce(
        (accumulator, currentValue) =>
          accumulator + +currentValue.currentBalance,
        0
      );

    const dollarValue = convertToDollarString(
      Math.round(totalBalance * 100) / 100
    );

    row[key] = dollarValue;
  });

  const tableData: TableDataType = {
    columns,
    rows,
  };
  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
}

export default GradeTable;
