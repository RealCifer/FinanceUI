/**
 * InsightCard.jsx
 * An actionable insight card: coloured icon bubble + title + body text.
 *
 * Props
 * ─────
 * icon             ReactNode
 * iconColorScheme  'rose' | 'emerald' | 'indigo' | 'amber'  (default: 'indigo')
 * title            string
 * children         ReactNode  — body content
 */
import React, { memo } from 'react';

const SCHEMES = {
  rose:    { bg: 'bg-rose-50 dark:bg-rose-900/30',       text: 'text-rose-500 dark:text-rose-400'    },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-500 dark:text-emerald-400' },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/30',   text: 'text-indigo-500 dark:text-indigo-400'  },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/30',     text: 'text-amber-500 dark:text-amber-400'   },
};

const InsightCard = memo(({ icon, iconColorScheme = 'indigo', title, children }) => {
  const s = SCHEMES[iconColorScheme] ?? SCHEMES.indigo;

  return (
    <div className="glass-card p-7 rounded-[2rem] flex items-start gap-6 group hover:bg-slate-50/50 dark:hover:bg-white/[0.03]">
      <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${s.bg} ${s.text} bg-opacity-10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div className="flex-1">
        <p className="text-premium-label mb-2 opacity-60">
          {title}
        </p>
        <div className="text-[15px] text-slate-700 dark:text-slate-300 font-semibold leading-relaxed tracking-tight">
          {children}
        </div>
      </div>
    </div>
  );
});

export default InsightCard;
