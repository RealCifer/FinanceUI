/**
 * chartUtils.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility functions for aggregating transaction data into chart-ready
 * data structures.  Every function is side-effect free and accepts a plain
 * transactions array so it can be used inside useMemo hooks or standalone.
 *
 * Exported functions
 * ──────────────────
 *  groupByMonth          →  monthly income / expense / net (for Bar / Line charts)
 *  getCategoryTotals     →  per-category expense totals   (for Pie / Donut charts)
 *  getIncomeExpenseSummary → single income-vs-expense object (for KPI cards)
 *  getTopCategories      →  top N expense categories sorted desc
 *  getRunningBalance     →  cumulative balance over time   (for Area charts)
 *  getAverageMonthlySpend → average monthly expense across active months
 *  getSavingsRate        →  savings rate % per month
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns a zero-padded "YYYY-MM" sort key and a human-readable label
 * like "Jan 2024" for a given Date object.
 */
const monthMeta = (dateObj) => ({
  sortKey: `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
  label:   dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
});

// ─── 1. Group By Month ────────────────────────────────────────────────────────

/**
 * Groups transactions by calendar month and returns an array sorted
 * chronologically, ready for Bar / Line charts.
 *
 * @param {Array} transactions
 * @returns {Array<{ month: string, sortKey: string, income: number, expense: number, net: number }>}
 *
 * @example
 * const data = groupByMonth(transactions);
 * // [{ month: "Oct 2023", sortKey: "2023-10", income: 5300, expense: 670.5, net: 4629.5 }, …]
 */
export const groupByMonth = (transactions = []) => {
  const map = {};

  transactions.forEach((t) => {
    const { sortKey, label } = monthMeta(new Date(t.date));

    if (!map[sortKey]) {
      map[sortKey] = { month: label, sortKey, income: 0, expense: 0, net: 0 };
    }

    if (t.type === 'income') {
      map[sortKey].income += t.amount;
    } else {
      map[sortKey].expense += t.amount;
    }
  });

  // Compute net and sort chronologically
  return Object.values(map)
    .map((entry) => ({ ...entry, net: entry.income - entry.expense }))
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
};

// ─── 2. Category-wise Totals ──────────────────────────────────────────────────

/**
 * Aggregates expense totals per category and returns an array sorted
 * by value (highest first), ready for Pie / Donut / HorizontalBar charts.
 *
 * @param {Array}  transactions
 * @param {'expense'|'income'|'all'} [type='expense']  which transaction type to include
 * @returns {Array<{ name: string, value: number }>}
 *
 * @example
 * getCategoryTotals(transactions);
 * // [{ name: "Food", value: 480 }, { name: "Travel", value: 900 }, …]
 */
export const getCategoryTotals = (transactions = [], type = 'expense') => {
  const filtered = type === 'all'
    ? transactions
    : transactions.filter((t) => t.type === type);

  const map = filtered.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
};

// ─── 3. Income vs Expense Summary ────────────────────────────────────────────

/**
 * Returns overall income, expense, net savings and savings-rate figures
 * computed across all transactions.  Useful for top-level KPI / summary cards.
 *
 * @param {Array} transactions
 * @returns {{
 *   totalIncome:    number,
 *   totalExpense:   number,
 *   netSavings:     number,
 *   savingsRate:    number,   // percentage 0-100, rounded to 1 dp
 *   transactionCount: number,
 *   incomeCount:    number,
 *   expenseCount:   number,
 * }}
 *
 * @example
 * const { totalIncome, netSavings, savingsRate } = getIncomeExpenseSummary(transactions);
 */
export const getIncomeExpenseSummary = (transactions = []) => {
  let totalIncome  = 0;
  let totalExpense = 0;
  let incomeCount  = 0;
  let expenseCount = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') {
      totalIncome += t.amount;
      incomeCount += 1;
    } else {
      totalExpense += t.amount;
      expenseCount += 1;
    }
  });

  const netSavings  = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0
    ? Math.round(((netSavings / totalIncome) * 100) * 10) / 10
    : 0;

  return {
    totalIncome:      Math.round(totalIncome  * 100) / 100,
    totalExpense:     Math.round(totalExpense * 100) / 100,
    netSavings:       Math.round(netSavings   * 100) / 100,
    savingsRate,
    transactionCount: transactions.length,
    incomeCount,
    expenseCount,
  };
};

// ─── 4. Top N Categories ─────────────────────────────────────────────────────

/**
 * Convenience wrapper around getCategoryTotals that returns only the
 * top N entries (default 5).
 *
 * @param {Array}  transactions
 * @param {number} [n=5]
 * @param {'expense'|'income'|'all'} [type='expense']
 * @returns {Array<{ name: string, value: number }>}
 *
 * @example
 * getTopCategories(transactions, 3);
 * // [{ name: "Travel", value: 900 }, { name: "Food", value: 480 }, { name: "Shopping", value: 350 }]
 */
export const getTopCategories = (transactions = [], n = 5, type = 'expense') =>
  getCategoryTotals(transactions, type).slice(0, n);

// ─── 5. Running Balance (Cumulative Net) ──────────────────────────────────────

/**
 * Builds a date-sorted series of the running cumulative balance after
 * each transaction.  Useful for Area charts showing portfolio growth.
 *
 * @param {Array}  transactions
 * @param {number} [startingBalance=0]
 * @returns {Array<{ date: string, balance: number }>}
 *
 * @example
 * getRunningBalance(transactions);
 * // [{ date: "2023-10-01", balance: 4500 }, { date: "2023-10-03", balance: 4414.5 }, …]
 */
export const getRunningBalance = (transactions = [], startingBalance = 0) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let running = startingBalance;
  return sorted.map((t) => {
    running += t.type === 'income' ? t.amount : -t.amount;
    return {
      date:    t.date,
      balance: Math.round(running * 100) / 100,
    };
  });
};

// ─── 6. Average Monthly Spend ────────────────────────────────────────────────

/**
 * Returns the average expense amount across months that have at least
 * one expense transaction.
 *
 * @param {Array} transactions
 * @returns {number}
 *
 * @example
 * getAverageMonthlySpend(transactions); // e.g. 842.5
 */
export const getAverageMonthlySpend = (transactions = []) => {
  const monthly = groupByMonth(transactions);
  const activeMonths = monthly.filter((m) => m.expense > 0);
  if (activeMonths.length === 0) return 0;
  const total = activeMonths.reduce((sum, m) => sum + m.expense, 0);
  return Math.round((total / activeMonths.length) * 100) / 100;
};

// ─── 7. Monthly Savings Rate Series ──────────────────────────────────────────

/**
 * Returns a monthly series of savings rates (percentage) useful for a
 * trend line showing how efficiently income was saved each month.
 *
 * @param {Array} transactions
 * @returns {Array<{ month: string, sortKey: string, savingsRate: number }>}
 *  savingsRate is clamped to [-100, 100] and rounded to 1 decimal place.
 *
 * @example
 * getSavingsRate(transactions);
 * // [{ month: "Oct 2023", sortKey: "2023-10", savingsRate: 87.4 }, …]
 */
export const getSavingsRate = (transactions = []) =>
  groupByMonth(transactions).map(({ month, sortKey, income, expense }) => {
    const rate = income > 0
      ? Math.round((((income - expense) / income) * 100) * 10) / 10
      : expense > 0 ? -100 : 0;

    return {
      month,
      sortKey,
      savingsRate: Math.max(-100, Math.min(100, rate)),
    };
  });
