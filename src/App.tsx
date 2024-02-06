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
import GradeChart from './components/GradeChart';
import useFetchData from './hooks/useFetchData';

function App() {
  const { data, filteredData, loading, error, filters } = useAppSelector(
    (state) => state.loanData
  );

  const dispatch = useAppDispatch();
  useFetchData(dispatch);

  return (
    <main className="flex flex-col items-center pt-20 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        dv01 Loan Analysis
      </h1>

      {error && (
        <p className="py-10 text-2xl tracking-tight font-bold text-center">
          There has been an error
        </p>
      )}
      {loading ? (
        <p className="py-10 text-2xl tracking-tight font-bold text-center">
          Loading Data
        </p>
      ) : (
        <>
          <div className="">
            <GradeChart chartData={filteredData} />
          </div>
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
        </>
        // Chart
      )}
    </main>
  );
}

export default App;
