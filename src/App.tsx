import React, { useEffect, useState } from 'react';
import './App.css';
import { LoanDataType, TableDataType } from './types';
import { getData } from './request/api';

import GradeTableFilter from './components/GradeTableFilter';
import Table from './components/ui/Table';

function App() {
  const [data, setData] = useState<LoanDataType[]>([]);
  console.log('App ~ data:', data);
  console.log('App ~ data:', data[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: LoanDataType[] = await getData();
        setData(data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const dummyData: TableDataType = {
    columns: [
      {
        header: 'grade 1',
        accessor: 'grade 1',
      },
      {
        header: 'grade 2',
        accessor: 'grade 2',
      },
      {
        header: 'grade 3',
        accessor: 'grade 2',
      },
      {
        header: 'grade 4',
        accessor: 'grade 4',
      },
    ],
    data: [
      {
        'grade 1': '$1000',
        'grade 2': '$2000',
        'grade 3': '$3000',
        'grade 4': '$4000',
      },
    ],
  };
  return (
    <main className="flex flex-col items-center pt-20 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        dv01 Loan Analysis
      </h1>
      <div className="space-y-6">
        <Table tableData={dummyData} />
        <GradeTableFilter />
      </div>
    </main>
  );
}

export default App;
