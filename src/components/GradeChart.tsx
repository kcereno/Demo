import React from 'react';

import { LoanDataType } from '../types';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import {
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

  const maxYValue = Math.max(...parsedData.map((entry) => entry.dollarValue));

  let increment = 0;

  if (maxYValue > 1000000) {
    increment = 500000;
  } else if (maxYValue <= 1000000) {
    increment = 100000;
  }

  const roundedMaxYValue = roundUpToNearest(maxYValue, increment);

  const numTicks = Math.ceil(roundedMaxYValue / increment);
  const ticks = Array.from(
    { length: numTicks + 1 },
    (_, index) => index * increment
  );

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
          width={80}
          domain={[0, roundedMaxYValue]}
          ticks={ticks}
          tickFormatter={(value) => '$' + value.toLocaleString()}
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

export default GradeChart;
