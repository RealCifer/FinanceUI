/**
 * MonthlyBarChart.jsx
 * Grouped bar chart comparing monthly income vs expense.
 * Extracted from Analytics.jsx.
 *
 * Props
 * ─────
 * data    Array<{ month: string, income: number, expense: number }>
 * height  number  (default: 350)
 */
import React, { memo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { LineBarTooltip } from './ChartTooltip';
import { BarChart as BarIcon } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

const MonthlyBarChart = memo(({ data = [], height = 350 }) => {
  if (!data?.length) {
    return (
      <div style={{ height }} className="flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
        <EmptyState
          icon={<BarIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
          title="No comparison data available."
          subtitle="Income vs Expense trend will appear once you log activity."
        />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.2} />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 13 }}
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
        cursor={{ fill: '#f3f4f6', opacity: 0.1 }}
      />
      <Legend verticalAlign="top" height={36} iconType="circle" />
      <Bar dataKey="income"  name="Income"  fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
      <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={50} />
    </BarChart>
  </ResponsiveContainer>
  );
});

export default MonthlyBarChart;
