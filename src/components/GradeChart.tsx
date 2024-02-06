import React from 'react';

import { LoanDataType } from '../types';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import {
  calculateTicks,
  convertToDollarString,
  extractUniqueValues,
  roundUpToNearest,
} from '../utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

type GradeChartProps = {
  chartData: LoanDataType[];
};

function GradeChart({ chartData }: GradeChartProps) {
  const uniqueGrades = extractUniqueValues(chartData, 'grade');

  const parsedData = uniqueGrades.map((grade) => {
    const totalBalance = chartData
      .filter((data) => data.grade === grade)
      .reduce(
        (accumulator, currentValue) =>
          accumulator + +currentValue.currentBalance,
        0
      );

    return {
      grade,
      dollarValue: Math.round(totalBalance * 100) / 100,
    };
  });

  const maxYValue =
    parsedData.length > 1
      ? Math.max(...parsedData.map((data) => data.dollarValue))
      : 0;

  // Set the increment based on the maxYValue
  let increment = 500000; // default increment of 1,000,000
  if (maxYValue <= 1000000) {
    increment = 250000;
  }

  if (maxYValue <= 500000) {
    increment = 100000;
  }

  if (maxYValue <= 250000) {
    increment = 50000;
  }

  if (maxYValue <= 100000) {
    increment = 10000;
  }

  const maxYValueRounded = roundUpToNearest(maxYValue, increment);
  const ticks = calculateTicks(0, maxYValueRounded, increment);
  return (
    <div className="">
      <BarChart
        width={730}
        height={400}
        data={parsedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="grade" />
        <YAxis
          ticks={ticks}
          tickFormatter={(value) => convertToDollarString(value)}
          width={100}
        />

        <Tooltip content={CustomTooltip} />
        <Bar
          dataKey="dollarValue"
          fill="#8884d8"
        />
      </BarChart>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="">
        <p className="text-black bg-slate-400 p-2 rounded">
          {convertToDollarString(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};
export default GradeChart;
