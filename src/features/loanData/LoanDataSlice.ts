import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FilterType, HomeOwnershipEnum, LoanDataType } from '../../types';
import { find } from '@reduxjs/toolkit/dist/utils';

interface LoanDataState {
  data: LoanDataType[];
  filters: FilterType[];
  filteredData: LoanDataType[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: LoanDataState = {
  data: [],
  filters: [],
  filteredData: [],
  loading: false,
  error: null,
};

export const loanDataSlice = createSlice({
  name: 'loanData',
  initialState,
  reducers: {
    setLoanData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterType[]>) => {
      state.filters = action.payload;
    },
  },
});

export const { setLoanData, setLoading, setError, setFilters } =
  loanDataSlice.actions;
export default loanDataSlice.reducer;
