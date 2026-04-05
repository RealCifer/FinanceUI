export const transactions = [
  { id: "t1", date: "2023-10-01", amount: 4500, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "t2", date: "2023-10-03", amount: 85.5, category: "Food", type: "expense", description: "Grocery Store" },
  { id: "t3", date: "2023-10-05", amount: 120, category: "System/Bills", type: "expense", description: "Electric Bill" },
  { id: "t4", date: "2023-10-08", amount: 45, category: "Subscriptions", type: "expense", description: "Streaming Services" },
  { id: "t5", date: "2023-10-12", amount: 300, category: "Travel", type: "expense", description: "Weekend Trip Flight" },
  { id: "t6", date: "2023-10-15", amount: 800, category: "Freelance", type: "income", description: "Web Design Project" },
  { id: "t7", date: "2023-10-18", amount: 65, category: "Entertainment", type: "expense", description: "Concert Ticket" },
  { id: "t8", date: "2023-10-22", amount: 110, category: "Food", type: "expense", description: "Dinner out" },
  { id: "t9", date: "2023-10-28", amount: 55, category: "System/Bills", type: "expense", description: "Pharmacy" },
  { id: "t10", date: "2023-11-01", amount: 4500, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "t11", date: "2023-11-02", amount: 95, category: "Food", type: "expense", description: "Grocery Store" },
  { id: "t12", date: "2023-11-05", amount: 110, category: "System/Bills", type: "expense", description: "Electric Bill" },
  { id: "t13", date: "2023-11-09", amount: 45, category: "Subscriptions", type: "expense", description: "Streaming Services" },
  { id: "t14", date: "2023-11-14", amount: 150, category: "Shopping", type: "expense", description: "Winter Clothes" },
  { id: "t15", date: "2023-11-19", amount: 60, category: "Food", type: "expense", description: "Lunch with client" },
  { id: "t16", date: "2023-11-23", amount: 200, category: "Freelance", type: "income", description: "Consulting Session" },
  { id: "t17", date: "2023-11-27", amount: 400, category: "Travel", type: "expense", description: "Thanksgiving Travel" },
  { id: "t18", date: "2023-12-01", amount: 4500, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "t19", date: "2023-12-03", amount: 125, category: "Food", type: "expense", description: "Grocery Store" },
  { id: "t20", date: "2023-12-06", amount: 130, category: "System/Bills", type: "expense", description: "Electric Bill" },
  { id: "t21", date: "2023-12-10", amount: 50, category: "Subscriptions", type: "expense", description: "Software License" },
  { id: "t22", date: "2023-12-15", amount: 350, category: "Shopping", type: "expense", description: "Holiday Gifts" },
  { id: "t23", date: "2023-12-18", amount: 120, category: "Entertainment", type: "expense", description: "Holiday Party" },
  { id: "t24", date: "2023-12-22", amount: 500, category: "Bonus", type: "income", description: "Year-end Bonus" },
  { id: "t25", date: "2023-12-28", amount: 90, category: "Food", type: "expense", description: "New Year Eve Dinner" },
  { id: "t26", date: "2024-01-01", amount: 4500, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "t27", date: "2024-01-04", amount: 80, category: "Food", type: "expense", description: "Grocery Store" },
  { id: "t28", date: "2024-01-07", amount: 140, category: "System/Bills", type: "expense", description: "Electric + Heating" },
  { id: "t29", date: "2024-01-12", amount: 45, category: "Subscriptions", type: "expense", description: "Streaming Services" },
  { id: "t30", date: "2024-01-16", amount: 1500, category: "Freelance", type: "income", description: "New Year Web Project" },
  { id: "t31", date: "2024-01-20", amount: 85, category: "Subscriptions", type: "expense", description: "Gym Membership" },
  { id: "t32", date: "2024-01-25", amount: 200, category: "Travel", type: "expense", description: "Train Ticket" },
  { id: "t33", date: "2024-01-29", amount: 75, category: "Food", type: "expense", description: "Restaurant" }
];

export const totalIncome = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

export const totalExpenses = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

export const totalBalance = totalIncome - totalExpenses;
