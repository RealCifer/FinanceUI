/**
 * Transactions.jsx
 * Page component for viewing and managing transactions.
 * Orchestrates filtering, sorting, and CRUD modals.
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Search, ListFilter, Plus, Edit2, Trash2 } from 'lucide-react';
import useFinanceContext from '../hooks/useFinanceContext';
import useTransactionForm from '../hooks/useTransactionForm';
import SectionHeader from '../components/ui/SectionHeader';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionForm from '../components/transactions/TransactionForm';
import DeleteConfirmModal from '../components/transactions/DeleteConfirmModal';

const Transactions = () => {
  const { transactions, deleteTransaction, addTransaction, updateTransaction, selectedRole } = useFinanceContext();
  
  // Local state for UI
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [deletingTx, setDeletingTx] = useState(null);
  
  // Filtering state
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc',
  });

  // Memoized form hook initialization
  const formHook = useTransactionForm(editingTx);

  // Handlers wrapped in useCallback for referential stability
  const openAdd = useCallback(() => {
    setEditingTx(null);
    formHook.resetForm();
    setIsFormOpen(true);
  }, [formHook]);

  const openEdit = useCallback((tx) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTx(null);
    formHook.setFormErrors({});
  }, [formHook]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formHook.validateForm()) {
      if (editingTx) {
        updateTransaction(editingTx.id, formHook.formData);
      } else {
        addTransaction(formHook.formData);
      }
      closeForm();
    }
  }, [editingTx, formHook, addTransaction, updateTransaction, closeForm]);

  const handleConfirmDelete = useCallback(() => {
    if (deletingTx) {
      deleteTransaction(deletingTx.id);
      setDeletingTx(null);
    }
  }, [deletingTx, deleteTransaction]);

  const handleCancelDelete = useCallback(() => {
    setDeletingTx(null);
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  // Optimized data transformation pipeline
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = 
        tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCat = filters.category === 'all' || tx.category === filters.category;
      const matchesType = filters.type === 'all' || tx.type === filters.type;
      return matchesSearch && matchesCat && matchesType;
    });
  }, [transactions, filters]);

  const sortedTransactions = useMemo(() => {
    const items = [...filteredTransactions];
    items.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const diff = new Date(b.date) - new Date(a.date);
        return sortConfig.direction === 'asc' ? -diff : diff;
      }
      if (sortConfig.key === 'amount') {
        const diff = a.amount - b.amount;
        return sortConfig.direction === 'asc' ? diff : -diff;
      }
      return 0;
    });
    return items;
  }, [filteredTransactions, sortConfig]);

  const isAdmin = selectedRole === 'admin';

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 fade-in animate-in duration-500">

      <SectionHeader
        title="Transaction Records"
        subtitle="Manage, audit, and trace your financial activity with high-fidelity records."
        className="mb-10"
        action={
          isAdmin && (
            <button
              id="btn-add-transaction"
              onClick={openAdd}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              Add Entry
            </button>
          )
        }
      />

      {/* Filter bar */}
      <div className="glass-card rounded-[3rem] overflow-hidden mb-12 shadow-inner">
        <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/[0.05] bg-slate-50/20 dark:bg-white/[0.02] flex flex-col lg:flex-row gap-8">
          <div className="flex-1 relative group">
            <Search className="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              type="text"
              placeholder="Search Intelligence..."
              className="w-full pl-14 pr-8 py-4 border border-slate-100 dark:border-white/[0.05] rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/50 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-sm"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <select
              className="px-8 py-4 border border-slate-100 dark:border-white/[0.05] rounded-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all cursor-pointer appearance-none min-w-[200px] shadow-sm tracking-tight"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">Global Channels</option>
              {['Salary','Bonus','Freelance','Food','System/Bills','Subscriptions','Travel','Shopping','Entertainment','Health']
                .map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              className="px-8 py-4 border border-slate-100 dark:border-white/[0.05] rounded-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all cursor-pointer appearance-none min-w-[200px] shadow-sm tracking-tight"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">Activity Flow</option>
              <option value="income">Credits</option>
              <option value="expense">Debits</option>
            </select>
          </div>
        </div>
      </div>

      <TransactionTable
        transactions={sortedTransactions}
        totalCount={transactions.length}
        isAdmin={isAdmin}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={openEdit}
        onDelete={setDeletingTx}
      />

      <TransactionForm
        isOpen={isFormOpen}
        editingTx={editingTx}
        formHook={formHook}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        tx={deletingTx}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    </div>
  );
};

export default Transactions;
