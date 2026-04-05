




const monthMeta = (dateObj) => ({
  sortKey: `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
  label:   dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
});




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


  return Object.values(map)
    .map((entry) => ({ ...entry, net: entry.income - entry.expense }))
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
};




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




export const getTopCategories = (transactions = [], n = 5, type = 'expense') =>
  getCategoryTotals(transactions, type).slice(0, n);




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




export const getAverageMonthlySpend = (transactions = []) => {
  const monthly = groupByMonth(transactions);
  const activeMonths = monthly.filter((m) => m.expense > 0);
  if (activeMonths.length === 0) return 0;
  const total = activeMonths.reduce((sum, m) => sum + m.expense, 0);
  return Math.round((total / activeMonths.length) * 100) / 100;
};




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
