/**
 * MonthlyLineChart.jsx
 * Line chart showing monthly expense trend.
 * Extracted from Analytics.jsx.
 *
 * Props
 * ─────
 * data    Array<{ month: string, expense: number }>
 * height  number  (default: 300)
 */
import React, { memo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { LineBarTooltip } from './ChartTooltip';
import { LineChart as LineIcon } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

const MonthlyLineChart = memo(({ data = [], height = 300 }) => {
  if (!data?.length) {
    return (
      <div style={{ height }} className="flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
        <EmptyState
          icon={<LineIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
          title="No trend data available."
          subtitle="Monthly expense trend will be plotted here."
        />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.2} />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 12 }}
        dy={10}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 12 }}
        tickFormatter={(v) => `$${v}`}
        dx={-10}
      />
      <RechartsTooltip
        content={<LineBarTooltip />}
        cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' }}
      />
      <Line
        type="monotone"
        dataKey="expense"
        name="Expense"
        stroke="#f59e0b"
        strokeWidth={3}
        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
        activeDot={{ r: 6, strokeWidth: 0, fill: '#f59e0b' }}
      />
    </LineChart>
  </ResponsiveContainer>
  );
});

export default MonthlyLineChart;
