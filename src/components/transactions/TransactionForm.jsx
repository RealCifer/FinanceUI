/**
 * TransactionForm.jsx
 * Add / Edit transaction modal form.
 */
import React, { memo } from 'react';
import { X } from 'lucide-react';

export const CATEGORIES = [
  'Salary', 'Bonus', 'Freelance', 'Food',
  'System/Bills', 'Subscriptions', 'Travel',
  'Shopping', 'Entertainment', 'Health',
];

const fieldClass = (error, extra = '') =>
  [
    'w-full px-4 py-3 border rounded-xl text-sm font-semibold transition-all duration-300',
    'focus:outline-none focus:ring-4 focus:ring-indigo-500/10',
    'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
    error
      ? 'border-rose-400 dark:border-rose-500/50 focus:border-rose-500'
      : 'border-gray-100 dark:border-white/5 focus:border-indigo-500 dark:focus:border-indigo-400',
    extra,
  ].join(' ');

const ErrorMsg = ({ msg }) =>
  msg ? (
    <p role="alert" className="mt-2 text-xs text-rose-500 dark:text-rose-400 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
      <span className="w-4 h-4 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-[10px]">!</span> {msg}
    </p>
  ) : null;

const TransactionForm = memo(({ isOpen, editingTx, formHook, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const { formData, formErrors, handleFieldChange } = formHook;
  const isEditing = Boolean(editingTx);

  return (
    <div className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-transparent dark:border-white/5">

        {/* Header */}
        <div className="px-8 py-7 border-b border-gray-50 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {isEditing ? 'Update Records' : 'New Entry'}
            </h3>
            <p className="text-premium-label mt-1 opacity-60">
              Transaction Details
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-100 dark:border-white/5 transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form id="transaction-form" onSubmit={onSubmit} className="p-8" noValidate>
          <div className="space-y-6">

            {/* Row 1 – Type + Date */}
            <div className="grid grid-cols-2 gap-5 p-5 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <div>
                <label className="text-premium-label mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleFieldChange('type', e.target.value)}
                  className={fieldClass(formErrors.type)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <ErrorMsg msg={formErrors.type} />
              </div>

              <div>
                <label className="text-premium-label mb-2 block">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                  className={fieldClass(formErrors.date)}
                  style={{ colorScheme: 'auto' }}
                />
                <ErrorMsg msg={formErrors.date} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-premium-label mb-2 block">Description</label>
              <input
                type="text"
                placeholder="Where did it go?"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className={fieldClass(null)}
              />
            </div>

            {/* Row 2 – Amount + Category */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-premium-label mb-2 block">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleFieldChange('amount', e.target.value)}
                  className={fieldClass(formErrors.amount, 'text-lg font-extrabold')}
                />
                <ErrorMsg msg={formErrors.amount} />
              </div>

              <div>
                <label className="text-premium-label mb-2 block">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className={fieldClass(formErrors.category)}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ErrorMsg msg={formErrors.category} />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-50 dark:border-white/5 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-2xl transition-all"
            >
              Discard
            </button>
            <button
              id="btn-submit-transaction"
              type="submit"
              className="flex-1 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              {isEditing ? 'Save Update' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default TransactionForm;
