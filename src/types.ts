export enum HomeOwnershipEnum {
  RENT = 'RENT',
  MORTGAGE = 'MORTGAGE',
  OWN = 'OWN',
}

export enum QuarterEnum {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
}

export type TermType = {
  term: '36 months' | '60 months';
};

export interface TableColumnType {
  name: string;
  accessor: string;
}

export type TableRowType = {
  [key: string]: string | number;
};

export type TableDataType = {
  columns: TableColumnType[];
  rows: TableRowType[];
};

export type FilterType = {
  year?: number;
  quarter?: QuarterEnum;
  grade?: string;
  homeOwnership?: HomeOwnershipEnum;
  term?: TermType;
};

export type LoanDataType = {
  year: number;
  quarter: QuarterEnum;
  grade: string;
  homeOwnership: HomeOwnershipEnum;
  term: TermType;
  currentBalance: string;
};
