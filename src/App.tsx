import React, { useEffect } from 'react';
import './App.css';
import { LoanDataType } from './types';
import { getData } from './request/api';
import GradeTableFilter from './components/GradeTableFilter';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  setLoanData,
  setLoading,
  setError,
  setFilters,
} from './features/loanData/LoanDataSlice';

import GradeTable from './components/GradeTable';

function App() {
  const { data, filteredData, loading, error, filters } = useAppSelector(
    (state) => state.loanData
  );

  const dispatch = useAppDispatch();
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

  console.log('App ~ filteredData:', filteredData);

  return (
    <main className="flex flex-col items-center pt-20 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        dv01 Loan Analysis
      </h1>

      {loading ? (
        <p className="py-10 text-2xl tracking-tight font-bold text-center">
          Loading Data
        </p>
      ) : (
        <div className="space-y-6">
          <GradeTable loanData={filteredData} />
          <GradeTableFilter
            filters={filters}
            updateFilters={(updatedFilters) => {
              dispatch(setFilters(updatedFilters));
            }}
            loanData={data}
          />
        </div>
      )}
    </main>
  );
}

export default App;
