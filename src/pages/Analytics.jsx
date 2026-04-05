import React, { useMemo } from 'react';
import useFinanceContext from '../hooks/useFinanceContext';
import { Flame, ListOrdered, Calendar, Activity } from 'lucide-react';
import StatCard         from '../components/ui/StatCard';
import SectionHeader    from '../components/ui/SectionHeader';
import MonthlyBarChart  from '../components/charts/MonthlyBarChart';
import MonthlyLineChart from '../components/charts/MonthlyLineChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import { AnalyticsSkeleton } from '../components/ui/SkeletonLoader';
import {
  groupByMonth,
  getCategoryTotals,
  getAverageMonthlySpend,
} from '../utils/chartUtils';

const COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ef4444','#14b8a6','#f43f5e','#84cc16'];

const fmt2 = (n) => n.toLocaleString(undefined, { minimumFractionDigits: 2 });

const Analytics = () => {
  const { transactions, isLoading } = useFinanceContext();

  const monthlyComparisonData = useMemo(() => groupByMonth(transactions),           [transactions]);
  const expensesByCategory    = useMemo(() => getCategoryTotals(transactions, 'expense'), [transactions]);
  const averageMonthlySpend   = useMemo(() => getAverageMonthlySpend(transactions), [transactions]);

  if (isLoading) return <AnalyticsSkeleton />;

  const highestSpendingCategory = expensesByCategory[0] ?? { name: 'N/A', value: 0 };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 fade-in animate-in duration-500">

      <SectionHeader 
        title="Deep Analysis" 
        subtitle="Identifying seasonal patterns, spending velocity, and category allocation." 
      />


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          label="Top Category"
          value={highestSpendingCategory.name}
          icon={<Flame />}
          colorScheme="rose"
        />
        <StatCard
          label="Signal Count"
          value={String(transactions.length)}
          icon={<ListOrdered />}
          colorScheme="indigo"
        />
        <StatCard
          label="Monthly Burn"
          value={`$${fmt2(averageMonthlySpend)}`}
          icon={<Calendar />}
          colorScheme="emerald"
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">


        <div className="glass-card p-8 rounded-[2rem] col-span-1 lg:col-span-2">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mr-4 shadow-sm">
               <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Cash Flow Trajectory
            </h3>
          </div>
          <MonthlyBarChart data={monthlyComparisonData} height={350} />
        </div>


        <div className="glass-card p-8 rounded-[2rem]">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mr-4 shadow-sm">
               <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Spending Velocity
            </h3>
          </div>
          <MonthlyLineChart data={monthlyComparisonData} height={300} />
        </div>


        <div className="glass-card p-8 rounded-[2rem]">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mr-4 shadow-sm">
               <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Allocation Map
            </h3>
          </div>
          <CategoryPieChart
            data={expensesByCategory}
            colors={COLORS}
            innerRadius={80}
            outerRadius={110}
            height={300}
            emptyText="No allocation metrics."
          />
        </div>

      </div>
    </div>
  );
};

export default Analytics;
