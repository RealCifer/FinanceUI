/**
 * SectionHeader.jsx
 * Page-level title + subtitle block with an optional right-side action slot.
 *
 * Props
 * ─────
 * title     string
 * subtitle  string  (optional)
 * action    ReactNode  (optional) — rendered on the right, e.g. an "Add" button
 * className string  (optional) — extra classes on the wrapper
 */
import React, { memo } from 'react';

const SectionHeader = memo(({ title, subtitle, action, className = 'mb-12' }) => (
  <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${className}`}>
    <div>
      <h2 className="text-premium-h1">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium tracking-tight leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
    {action && <div className="flex-shrink-0 mb-1">{action}</div>}
  </div>
));

export default SectionHeader;
