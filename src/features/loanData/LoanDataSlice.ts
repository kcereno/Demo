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
    filterBy: (state, action: PayloadAction<FilterType>) => {
      const newFilterKey = Object.keys(action.payload)[0];

      const existingFilterIndex = state.filters.findIndex((filter) =>
        filter.hasOwnProperty(newFilterKey)
      );

      // If the filter already exists, update it. Otherwise, add it to the filter array
      if (existingFilterIndex !== -1) {
        state.filters = state.filters.map((filter) =>
          filter.hasOwnProperty(newFilterKey) ? action.payload : filter
        );
      } else {
        state.filters = [...state.filters, action.payload];
      }

      // Filter the data based on the current filters
      let updatedData = [];

      state.filters.forEach((filter) => {});
    },
  },
});

export const { setLoanData, setLoading, setError, filterBy } =
  loanDataSlice.actions;
export default loanDataSlice.reducer;
