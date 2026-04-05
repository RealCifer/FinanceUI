/**
 * SkeletonLoader.jsx
 * Pulse-animated skeleton placeholder components for Dashboard and Transactions.
 *
 * Named exports
 * ─────────────
 * SkeletonCard       — KPI stat card skeleton
 * SkeletonRow        — Transaction table row skeleton
 * SkeletonChart      — Chart panel skeleton
 * SkeletonInsight    — Insight card skeleton
 * DashboardSkeleton  — Full Dashboard loading state
 * TransactionsSkeleton — Full Transactions loading state
 */
import React from 'react';

// ─── Base pulse block ─────────────────────────────────────────────────────────
const Pulse = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`} />
);

// ─── Individual skeletons ─────────────────────────────────────────────────────

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-start">
      <div className="flex-1 space-y-3">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-8 w-36" />
      </div>
      <Pulse className="h-12 w-12 rounded-xl flex-shrink-0" />
    </div>
  </div>
);

export const SkeletonInsight = () => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
    <Pulse className="h-10 w-10 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <Pulse className="h-2.5 w-20" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-4/5" />
    </div>
  </div>
);

export const SkeletonChart = ({ height = 'h-[320px]' }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-6 gap-3">
      <Pulse className="h-8 w-8 rounded-lg" />
      <Pulse className="h-4 w-32" />
    </div>
    <div className={`${height} w-full relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700/40`}>
      {/* Fake chart bars */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-6 pb-6 gap-3">
        {[55, 80, 45, 90, 65, 75, 50, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md animate-pulse bg-gray-200 dark:bg-gray-600"
            style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonRow = () => (
  <tr className="border-b border-gray-50 dark:border-gray-700/60">
    <td className="px-6 py-4"><Pulse className="h-3.5 w-20" /></td>
    <td className="px-6 py-4"><Pulse className="h-3.5 w-40" /></td>
    <td className="px-6 py-4"><Pulse className="h-5 w-24 rounded-full" /></td>
    <td className="px-6 py-4 flex justify-end"><Pulse className="h-3.5 w-16" /></td>
    <td className="px-6 py-4">
      <div className="flex justify-center gap-3">
        <Pulse className="h-7 w-7 rounded-lg" />
        <Pulse className="h-7 w-7 rounded-lg" />
      </div>
    </td>
  </tr>
);

// ─── Page-level composites ─────────────────────────────────────────────────────

export const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto pb-10">
    {/* Header */}
    <div className="mb-8 space-y-2">
      <Pulse className="h-7 w-56" />
      <Pulse className="h-3.5 w-72" />
    </div>

    {/* KPI cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
    </div>

    {/* Insights section */}
    <div className="mb-8">
      <div className="flex items-center mb-4 gap-2">
        <Pulse className="h-5 w-5 rounded" />
        <Pulse className="h-4 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => <SkeletonInsight key={i} />)}
      </div>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <SkeletonChart height="h-[320px]" />
      <SkeletonChart height="h-[320px]" />
    </div>
  </div>
);

export const TransactionsSkeleton = () => (
  <div className="relative pb-10">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <Pulse className="h-6 w-36" />
        <Pulse className="h-3.5 w-64" />
      </div>
      <Pulse className="h-10 w-36 rounded-xl" />
    </div>

    {/* Filter bar */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
      <div className="p-5 flex flex-col md:flex-row gap-4">
        <Pulse className="h-10 flex-1 rounded-xl" />
        <div className="flex gap-4">
          <Pulse className="h-10 w-36 rounded-xl" />
          <Pulse className="h-10 w-36 rounded-xl" />
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Table header */}
      <div className="bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex gap-8">
        {['w-16', 'w-32', 'w-24', 'w-20', 'w-16'].map((w, i) => (
          <Pulse key={i} className={`h-3 ${w}`} />
        ))}
      </div>
      {/* Skeleton rows */}
      <table className="w-full">
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AnalyticsSkeleton = () => (
  <div className="max-w-7xl mx-auto pb-10">
    {/* Header */}
    <div className="mb-8 space-y-2">
      <Pulse className="h-7 w-48" />
      <Pulse className="h-3.5 w-80" />
    </div>

    {/* Metric cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
    </div>

    {/* Big chart */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <Pulse className="h-5 w-48 mb-6" />
      <div className="h-[350px] w-full relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700/40" />
    </div>

    {/* Bottom charts grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SkeletonChart height="h-[300px]" />
      <SkeletonChart height="h-[300px]" />
    </div>
  </div>
);
