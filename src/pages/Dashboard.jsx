import React, { useMemo } from 'react';
import useFinanceContext from '../hooks/useFinanceContext';
import { TrendingUp, TrendingDown, DollarSign, Activity, Lightbulb, CreditCard, Flame } from 'lucide-react';
import StatCard      from '../components/ui/StatCard';
import InsightCard   from '../components/ui/InsightCard';
import SectionHeader from '../components/ui/SectionHeader';
import BalanceTrendChart  from '../components/charts/BalanceTrendChart';
import CategoryPieChart   from '../components/charts/CategoryPieChart';
import { DashboardSkeleton } from '../components/ui/SkeletonLoader';
import { getCategoryTotals, getRunningBalance, getIncomeExpenseSummary } from '../utils/chartUtils';

const CHART_COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ef4444','#14b8a6'];

const fmt = (n) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Dashboard = () => {
  const { transactions, isLoading } = useFinanceContext();

  // ── Aggregated data ───────────────────────────────────────────────────────
  const { totalIncome, totalExpense, netSavings } = useMemo(
    () => getIncomeExpenseSummary(transactions),
    [transactions]
  );

  const expensesByCategory = useMemo(
    () => getCategoryTotals(transactions, 'expense'),
    [transactions]
  );

  // Running balance data — group by day for a clean line
  const balanceData = useMemo(() => {
    const raw = getRunningBalance(transactions);
    // Merge same-day entries: keep only the last balance per date
    const dayMap = {};
    raw.forEach(({ date, balance }) => {
      const label = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dayMap[label] = balance;
    });
    return Object.entries(dayMap).map(([date, balance]) => ({ date, balance }));
  }, [transactions]);

  // Monthly expense trajectory for insights panel
  const monthlyExpenseData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const monthly  = {};
    expenses.forEach((t) => { monthly[t.date.slice(0, 7)] = (monthly[t.date.slice(0, 7)] || 0) + t.amount; });
    const months = Object.keys(monthly).sort();
    if (months.length >= 2) {
      const latest = monthly[months.at(-1)];
      const prev   = monthly[months.at(-2)];
      return { latestExp: latest, prevExp: prev, diffPercent: ((latest - prev) / prev) * 100, hasHistory: true };
    }
    return { latestExp: months.length ? monthly[months[0]] : 0, prevExp: 0, diffPercent: 0, hasHistory: false };
  }, [transactions]);

  if (isLoading) return <DashboardSkeleton />;

  const highestSpendingCategory = expensesByCategory[0] ?? { name: 'N/A', value: 0 };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 fade-in animate-in duration-500">

      <SectionHeader 
        title="Financial Overview" 
        subtitle="Manage your assets, track daily spending, and visualize growth." 
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          label="Net Worth"
          value={fmt(netSavings)}
          icon={<DollarSign />}
          colorScheme="indigo"
        />
        <StatCard
          label="Total Revenue"
          value={fmt(totalIncome)}
          icon={<TrendingUp />}
          colorScheme="emerald"
        />
        <StatCard
          label="Total Outflow"
          value={fmt(totalExpense)}
          icon={<TrendingDown />}
          colorScheme="rose"
        />
      </div>

      {/* Insights */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mr-3 shadow-sm">
            <Lightbulb className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Smart Insights
          </h3>
        </div>
        
        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InsightCard icon={<Flame />} iconColorScheme="rose" title="Highest Burn Rate">
              Your biggest outflow category is <span className="font-extrabold text-gray-900 dark:text-white">{highestSpendingCategory.name}</span>, 
              amounting to <span className="font-extrabold text-rose-600 dark:text-rose-400">{fmt(highestSpendingCategory.value)}</span> this period.
            </InsightCard>

            <InsightCard
              icon={<Activity />}
              iconColorScheme={monthlyExpenseData.diffPercent > 0 ? 'rose' : 'emerald'}
              title="Momentum"
            >
              {monthlyExpenseData.hasHistory ? (
                <>
                  Spending is <span className={`font-extrabold ${monthlyExpenseData.diffPercent > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {monthlyExpenseData.diffPercent > 0 ? 'UP' : 'DOWN'} {Math.abs(monthlyExpenseData.diffPercent).toFixed(1)}%
                  </span> vs last month. {monthlyExpenseData.diffPercent > 0 ? "Watch your budget!" : "Great job saving!"}
                </>
              ) : (
                <span className="italic text-gray-400">Insufficient data for momentum analysis.</span>
              )}
            </InsightCard>

            <InsightCard icon={<CreditCard />} iconColorScheme="indigo" title="Data Density">
              Your engine is processing <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{transactions.length}</span> unique 
              financial signals across your connected categories.
            </InsightCard>
          </div>
        ) : (
          <div className="glass-card p-10 rounded-[2rem] text-center max-w-2xl mx-auto">
             <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Lightbulb className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
             </div>
             <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Welcome to FinanceUI</h4>
             <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
               Start by adding transactions to unlock powerful visual analytics and automated financial insights.
             </p>
             <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">
               Log First Transaction
             </button>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="glass-card p-8 rounded-[2rem]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mr-4 shadow-sm">
                <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Growth Trajectory</h3>
            </div>
          </div>
          <BalanceTrendChart data={balanceData} height={350} />
        </div>

        <div className="glass-card p-8 rounded-[2rem]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mr-4 shadow-sm">
                <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Category Allocation</h3>
            </div>
          </div>
          <CategoryPieChart
            data={expensesByCategory}
            colors={CHART_COLORS}
            innerRadius={90}
            outerRadius={120}
            height={350}
            emptyText="No allocation data."
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
