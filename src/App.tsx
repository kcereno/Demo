import React, { useEffect } from 'react';
import './App.css';
import { HomeOwnershipEnum, LoanDataType } from './types';
import { getData } from './request/api';
import GradeTableFilter from './components/GradeTableFilter';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  setLoanData,
  setLoading,
  setError,
  filterBy,
} from './features/loanData/LoanDataSlice';

import GradeTable from './components/GradeTable';

function App() {
  const { data, loading, error, filter } = useAppSelector(
    (state) => state.loanData
  );

  const dispatch = useAppDispatch();
  console.log('App ~ filter:', filter);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        // Fetch data and remove all undefined grades
        const data: LoanDataType[] = (await getData()).filter(
          (entry) => entry.grade !== undefined
        );
        dispatch(setLoanData(data));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <main className="flex flex-col items-center pt-20 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        dv01 Loan Analysis
      </h1>
      <div className="space-y-6">
        <GradeTable loanData={data} />
        <GradeTableFilter
          filterBy={(filter) => {
            dispatch(filterBy(filter));
          }}
          loanData={data}
        />
      </div>
    </main>
  );
}

export default App;
