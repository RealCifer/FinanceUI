import React, { memo } from 'react';

const SCHEMES = {
  indigo: {
    bg:   'bg-indigo-50 dark:bg-indigo-900/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    hover:'hover:border-indigo-200 dark:hover:border-indigo-500/50',
  },
  emerald: {
    bg:   'bg-emerald-50 dark:bg-emerald-900/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    hover:'hover:border-emerald-200 dark:hover:border-emerald-500/50',
  },
  rose: {
    bg:   'bg-rose-50 dark:bg-rose-900/40',
    text: 'text-rose-600 dark:text-rose-400',
    hover:'hover:border-rose-200 dark:hover:border-rose-500/50',
  },
  amber: {
    bg:   'bg-amber-50 dark:bg-amber-900/40',
    text: 'text-amber-600 dark:text-amber-400',
    hover:'hover:border-amber-200 dark:hover:border-amber-500/50',
  },
};

const StatCard = memo(({ label, value, icon, colorScheme = 'indigo', hoverBorder = true }) => {
  const s = SCHEMES[colorScheme] ?? SCHEMES.indigo;

  return (
    <div
      className={`glass-card p-8 rounded-[2.5rem] border-transparent 
        ${hoverBorder ? s.hover : ''} hover:border-current/10`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-premium-label mb-3">{label}</p>
          <h4 className="text-4xl md:text-3xl font-[800] text-slate-900 dark:text-white tracking-[-0.04em] leading-none">
            {value}
          </h4>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${s.bg} ${s.text} bg-opacity-10 backdrop-blur-md`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
    </div>
  );
});

export default StatCard;
