import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import {
  LoanDataState,
  setError,
  setLoading,
  setLoanData,
} from '../features/loanData/LoanDataSlice';

const useFetchData = (
  dispatch: ThunkDispatch<
    {
      loanData: LoanDataState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>
) => {
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'http://localhost:3001/api/server';
      dispatch(setLoading(true));
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        dispatch(setLoanData(data));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);
};

export default useFetchData;
