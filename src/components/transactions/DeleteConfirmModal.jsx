/**
 * DeleteConfirmModal.jsx
 * Confirmation dialog shown before permanently deleting a transaction.
 *
 * Props
 * ─────
 * tx         object | null  — transaction to delete; null = modal closed
 * onConfirm  () => void
 * onCancel   () => void
 */
import React, { memo } from 'react';
import { Trash2 } from 'lucide-react';

const DeleteConfirmModal = memo(({ tx, onConfirm, onCancel }) => {
  if (!tx) return null;

  const amount = tx.amount
    ? `(${tx.type === 'income' ? '+' : '-'}$${Number(tx.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })})`
    : '';

  return (
    <div
      className="fixed inset-0 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + heading */}
        <div className="px-6 pt-7 pb-5 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mb-4">
            <Trash2 className="w-7 h-7 text-rose-500 dark:text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Delete Transaction?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            You are about to permanently delete{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {tx.description || 'this transaction'}
            </span>
            {amount ? ` ${amount}` : ''}. This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            id="btn-confirm-delete"
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default DeleteConfirmModal;
