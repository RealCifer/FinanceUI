/**
 * EmptyState.jsx
 * Centred empty / no-data placeholder with an icon, title, and subtitle.
 *
 * Props
 * ─────
 * icon      ReactNode  — icon element (already sized by caller)
 * title     string
 * subtitle  string  (optional)
 * className string  (optional)
 */
import React, { memo } from 'react';

const EmptyState = memo(({ icon, title, subtitle, className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-gray-500 dark:text-gray-400 font-medium text-base">{title}</p>
    {subtitle && (
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{subtitle}</p>
    )}
  </div>
));

export default EmptyState;
