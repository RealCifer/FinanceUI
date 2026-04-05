import React, { createContext, useState, useMemo, useEffect } from 'react';
import { transactions as mockTransactions } from '../data/transactions';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRole, setSelectedRole] = useState(() => {
    const saved = localStorage.getItem('finance-role');
    return saved ? saved : 'admin';
  });
  
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all'
  });

  // Dark Mode State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('finance-theme');
    return saved ? saved : 'light';
  });

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('finance-theme', newTheme);
  };

  // Sync theme with HTML document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Mock Loading Delay for UX Improvement & LocalStorage Hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('finance-ui-transactions');
        if (stored) {
          setTransactions(JSON.parse(stored));
        } else {
          setTransactions(mockTransactions);
          localStorage.setItem('finance-ui-transactions', JSON.stringify(mockTransactions));
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again.');
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finance-ui-transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  // Derived state for filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = 
        t.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchCategory = filters.category === 'all' || t.category === filters.category;
      
      const matchType = filters.type === 'all' || t.type === filters.type;
      
      return matchSearch && matchCategory && matchType;
    });
  }, [transactions, filters]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [
      { 
        ...transaction, 
        id: `gen_${Date.now()}` // Generate a simple unique ID
      }, 
      ...prev
    ]);
  };

  const editTransaction = (id, updatedData) => {
    setTransactions(prev => 
      prev.map(t => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const switchRole = (role) => {
    if (['admin', 'viewer'].includes(role)) {
      setSelectedRole(role);
      localStorage.setItem('finance-role', role);
    }
  };

  const resetTransactions = () => {
    setTransactions(mockTransactions);
    localStorage.setItem('finance-ui-transactions', JSON.stringify(mockTransactions));
  };

  // The context value
  const value = {
    transactions,
    filteredTransactions,
    selectedRole,
    filters,
    isLoading,
    error,
    theme,
    toggleTheme,
    setFilters: updateFilters,
    addTransaction,
    editTransaction,
    deleteTransaction,
    switchRole,
    resetTransactions
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
