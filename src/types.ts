export type HomeOwnershipType = {
  homeOwnership: 'RENT' | 'MORTGAGE' | 'OWN';
};

export type TermType = {
  term: '36 months' | '60 months';
};

export type LoanDataType = {
  year: number;
  quarter: '1' | '2' | '3' | '4';
  grade: string;
  homeOwnership: HomeOwnershipType;
  term: TermType;
};

interface TableColumnType {
  header: string;
  accessor: string;
}

type TableRowType = {
  [key: string]: string | number;
};

export type TableDataType = {
  columns: TableColumnType[];
  data: TableRowType[];
};
