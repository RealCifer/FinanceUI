/**
 * ChartTooltip.jsx
 * Shared custom Recharts tooltip components used across Dashboard and Analytics.
 *
 * Named exports
 * ─────────────
 * LineBarTooltip  — for LineChart / BarChart  (shows label + list of values)
 * PieTooltip      — for PieChart              (shows category name + amount)
 */
import React from 'react';

const tooltipBase =
  'bg-white dark:bg-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ' +
  'border border-gray-100 dark:border-gray-700 transition-colors duration-300';

export const LineBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`${tooltipBase} p-4`}>
      <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium flex justify-between gap-4" style={{ color: entry.color }}>
          <span className="capitalize">{entry.name}:</span>
          <span>${entry.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </p>
      ))}
    </div>
  );
};

export const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`${tooltipBase} p-3`}>
      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{payload[0].name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Amount:{' '}
        <span className="font-medium text-gray-900 dark:text-white">
          ${payload[0].value.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

/** Tooltip for the running balance line chart on Dashboard */
export const BalanceTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`${tooltipBase} p-3`}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
        Balance: ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};
