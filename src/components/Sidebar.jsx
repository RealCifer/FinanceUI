import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, PieChart, Settings, X, Moon, Sun } from 'lucide-react';
import useFinanceContext from '../hooks/useFinanceContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useFinanceContext();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5 mr-3" /> },
    { name: 'Transactions', path: '/transactions', icon: <CreditCard className="w-5 h-5 mr-3" /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart className="w-5 h-5 mr-3" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5 mr-3" /> },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-900/60 backdrop-blur-xl border-r border-gray-100 dark:border-white/5 
      transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 flex flex-col
      ${isOpen ? 'translate-x-0 shadow-2xl shadow-indigo-500/10' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between p-8">
        <h1 className="text-2xl font-[800] tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-base">D</div>
          Dashboard<span className="text-violet-600">UI</span>
        </h1>
        <button 
          className="md:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
          onClick={closeSidebar}
        >
           <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-4 flex-1 space-y-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="px-6">
              <Link
                to={item.path}
                onClick={() => {
                  if(window.innerWidth < 768) {
                     closeSidebar();
                  }
                }}
                className={`flex items-center px-6 py-3.5 rounded-full transition-all duration-500 font-semibold group ${
                  location.pathname === item.path
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-white/5'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className={`transition-transform duration-500 group-hover:scale-110 ${location.pathname === item.path ? '' : 'opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className="ml-3 tracking-tight">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-8 md:hidden border-t border-slate-100 dark:border-white/5">
         <button 
           onClick={toggleTheme}
           className="w-full flex items-center justify-center px-4 py-4 rounded-full border border-slate-100 dark:border-white/10 text-slate-900 dark:text-white bg-white dark:bg-white/5 font-bold transition-all active:scale-95 shadow-sm"
         >
           {theme === 'dark' ? (
              <><Sun className="w-5 h-5 mr-3 text-amber-400" /> Light Mode</>
           ) : (
              <><Moon className="w-5 h-5 mr-3 text-violet-600" /> Dark Mode</>
           )}
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
