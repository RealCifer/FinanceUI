/**
 * BalanceTrendChart.jsx
 * Line chart showing cumulative running balance over time.
 * Extracted from Dashboard.jsx.
 *
 * Props
 * ─────
 * data    Array<{ date: string, balance: number }>
 * height  number  (default: 320)
 */
import React, { memo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { BalanceTooltip } from './ChartTooltip';
import { Activity } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

const BalanceTrendChart = memo(({ data = [], height = 320 }) => {
  if (!data?.length) {
    return (
      <div style={{ height }} className="flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
        <EmptyState
          icon={<Activity className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
          title="No balance data available."
          subtitle="Add transactions to see your balance trend."
        />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <defs>
        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.1} />
          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 12 }}
        dy={15}
        minTickGap={30}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 12 }}
        tickFormatter={(v) => `$${v}`}
        dx={-10}
      />
      <RechartsTooltip
        content={<BalanceTooltip />}
        cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' }}
      />
      <Line
        type="monotone"
        dataKey="balance"
        stroke="#6366f1"
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 6, fill: '#fff', stroke: '#6366f1', strokeWidth: 3 }}
        animationDuration={1500}
      />
    </LineChart>
  </ResponsiveContainer>
  );
});

export default BalanceTrendChart;
