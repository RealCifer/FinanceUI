import React, { memo } from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown, ArrowUpDown, Search } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

const SortIcon = ({ colKey, sortConfig }) => {
  if (sortConfig.key !== colKey)
    return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />;
  return sortConfig.direction === 'asc'
    ? <ChevronUp   className="w-3 h-3 ml-1 text-indigo-600 dark:text-indigo-400" />
    : <ChevronDown className="w-3 h-3 ml-1 text-indigo-600 dark:text-indigo-400" />;
};

const TransactionTable = memo(({ transactions = [], totalCount = 0, isAdmin, sortConfig, onSort, onEdit, onDelete }) => (
  <div className="glass-card rounded-[2rem] overflow-hidden">
    <div className="overflow-x-auto min-h-[450px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-white/5 transition-colors">
            <th
              className="group px-8 py-5 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors select-none"
              onClick={() => onSort('date')}
            >
              <div className="flex items-center text-premium-label">Date <SortIcon colKey="date" sortConfig={sortConfig} /></div>
            </th>
            <th className="px-8 py-5 text-premium-label">
              Description
            </th>
            <th className="px-8 py-5 text-premium-label">
              Category
            </th>
            <th
              className="group px-8 py-5 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors select-none text-right"
              onClick={() => onSort('amount')}
            >
              <div className="flex items-center justify-end text-premium-label">Amount <SortIcon colKey="amount" sortConfig={sortConfig} /></div>
            </th>
            {isAdmin && (
              <th className="px-8 py-5 text-premium-label text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors duration-150">
                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  {tx.date}
                </td>
                <td className="px-8 py-5 text-sm font-bold text-gray-900 dark:text-white">
                  {tx.description}
                </td>
                <td className="px-8 py-5 text-sm text-gray-600 dark:text-gray-300">
                  <span className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gray-100/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200/30 dark:border-white/5 shadow-sm">
                    {tx.category}
                  </span>
                </td>
                <td className={`px-8 py-5 text-sm font-extrabold text-right ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-200'}`}>
                  {tx.type === 'income' ? '+' : '-'}$
                  {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                {isAdmin && (
                  <td className="px-8 py-5 text-sm text-center">
                    <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(tx)}
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-indigo-900/40 rounded-xl transition-all shadow-sm active:scale-95"
                        title="Edit transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(tx)}
                        className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-rose-900/40 rounded-xl transition-all shadow-sm active:scale-95"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center">
                <EmptyState
                  icon={<Search className="w-10 h-10 text-gray-300 dark:text-gray-600" />}
                  title={totalCount > 0 ? "No results found" : "No transactions yet"}
                  subtitle={totalCount > 0 
                    ? "Try adjusting your filters or search query." 
                    : "Your financial activities will be listed here once you add them."}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
));

export default TransactionTable;
