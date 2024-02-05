import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FilterType, LoanDataType } from '../../types';
import { find } from '@reduxjs/toolkit/dist/utils';

interface LoanDataState {
  data: LoanDataType[];
  filter: any[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: LoanDataState = {
  data: [],
  filter: [],
  loading: false,
  error: null,
};

export const loanDataSlice = createSlice({
  name: 'loanData',
  initialState,
  reducers: {
    setLoanData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    filterBy: (state, action: PayloadAction<FilterType>) => {
      const newFilterKey = Object.keys(action.payload)[0];

      const existingFilterIndex = state.filter.findIndex((filter) =>
        filter.hasOwnProperty(newFilterKey)
      );

      if (existingFilterIndex !== -1) {
        state.filter = state.filter.map((filter) =>
          filter.hasOwnProperty(newFilterKey) ? action.payload : filter
        );
      } else {
        state.filter = [...state.filter, action.payload];
      }
    },
  },
});

export const { setLoanData, setLoading, setError, filterBy } =
  loanDataSlice.actions;
export default loanDataSlice.reducer;
