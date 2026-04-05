/**
 * CategoryPieChart.jsx
 * Donut / Pie chart showing category-wise totals.
 * Used by Dashboard (donut) and Analytics (pie) with different radii.
 *
 * Props
 * ─────
 * data         Array<{ name: string, value: number }>
 * colors       string[]   (default: COLORS below)
 * innerRadius  number     (default: 80)
 * outerRadius  number     (default: 110)
 * height       number     (default: 320)
 * emptyText    string     (default: 'No expenses recorded yet.')
 */
import React, { memo } from 'react';
import {
  PieChart, Pie, Cell,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { PieTooltip } from './ChartTooltip';
import EmptyState from '../ui/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';

const DEFAULT_COLORS = [
  '#6366f1','#ec4899','#f59e0b','#10b981',
  '#3b82f6','#8b5cf6','#ef4444','#14b8a6','#f43f5e','#84cc16',
];

const CategoryPieChart = memo(({
  data = [],
  colors = DEFAULT_COLORS,
  innerRadius = 80,
  outerRadius = 110,
  height = 320,
  emptyText = 'No expenses recorded yet.',
}) => {
  if (!data.length) {
    return (
      <div style={{ height }} className="flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
        <EmptyState
          icon={<PieIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
          title={emptyText}
        />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={4}
          dataKey="value"
          animationDuration={1000}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <RechartsTooltip content={<PieTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={40}
          iconType="circle"
          formatter={(value) => (
            <span className="text-gray-700 dark:text-gray-300 font-medium ml-1 text-sm">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

export default CategoryPieChart;
