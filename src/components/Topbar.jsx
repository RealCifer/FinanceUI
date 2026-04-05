import { Bell, Search, Menu, UserCircle, Sun, Moon } from 'lucide-react';
import useFinanceContext from '../hooks/useFinanceContext';

const Topbar = ({ toggleSidebar }) => {
  const { selectedRole, switchRole, theme, toggleTheme } = useFinanceContext();

  return (
    <header className="h-24 bg-white/80 dark:bg-slate-950/60 backdrop-blur-3xl border-b border-slate-100 dark:border-white/[0.05] flex items-center justify-between px-8 md:px-12 sticky top-0 z-30 transition-all duration-500">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden mr-6 text-slate-500 hover:text-slate-900 dark:hover:text-white p-3 hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-full transition-all shadow-sm border border-slate-100 dark:border-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden lg:block group">
          <Search className="w-4 h-4 absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
          <input
            type="text"
            placeholder="Search Intelligence..."
            className="pl-14 pr-8 py-3 border border-slate-100 dark:border-white/5 rounded-full w-80 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/50 bg-slate-50/50 dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 font-medium transition-all duration-500 shadow-inner"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 md:space-x-10">
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 p-3 rounded-full border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all hidden sm:flex items-center justify-center shadow-sm bg-white dark:bg-slate-900"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Role Switcher */}
        <div className="flex items-center bg-slate-50/80 dark:bg-white/5 rounded-full p-1.5 border border-slate-100 dark:border-white/5 shadow-inner">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-violet-600">
             <UserCircle className="w-5 h-5" />
          </div>
          <select 
            value={selectedRole}
            onChange={(e) => switchRole(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none px-4 cursor-pointer appearance-none tracking-tight"
          >
            <option value="admin">Administrator</option>
            <option value="viewer">Viewer Protocol</option>
          </select>
        </div>

        <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-3 rounded-full relative transition-all hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/10">
          <Bell className="w-6 h-6" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
        </button>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black shadow-xl shadow-violet-500/20 border border-white/20 transition-transform hover:scale-105 active:scale-95 text-lg">
          {selectedRole === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
