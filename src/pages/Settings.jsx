import React from 'react';
import useFinanceContext from '../hooks/useFinanceContext';
import { UserCircle, Moon, Sun, Download, FileJson, Trash2, Shield, Settings2 } from 'lucide-react';

const Settings = () => {
  const { 
    selectedRole, 
    switchRole, 
    theme, 
    toggleTheme, 
    transactions, 
    resetTransactions 
  } = useFinanceContext();

  const handleDownloadCSV = () => {
    if (transactions.length === 0) return;
    const headers = ["ID,Date,Description,Category,Type,Amount"];
    const rows = transactions.map(t => 
      `${t.id},${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    if (transactions.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "finance_transactions.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure you want to reset all data back to the factory mock state? This cannot be undone unless exported.");
    if (confirmReset) {
      resetTransactions();
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10 fade-in animate-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Preferences</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure your application constraints and payload handling.</p>
      </div>

      <div className="space-y-6">
        
        {/* Environment Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center bg-gray-50/50 dark:bg-gray-800/80">
             <Settings2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3" />
             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Environment Preferences</h3>
          </div>
          
          <div className="p-6 space-y-8">
             
             {/* Role Controller */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-gray-900 dark:text-white">Access Privilege Role</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Switching bounds instantly modifies global UI permissions cache.</p>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                      onClick={() => switchRole('admin')}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center ${
                         selectedRole === 'admin' 
                           ? 'bg-indigo-600 text-white shadow-md' 
                           : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                   >
                      <Shield className="w-4 h-4 mr-2" /> Admin
                   </button>
                   <button 
                      onClick={() => switchRole('viewer')}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center ${
                         selectedRole === 'viewer' 
                           ? 'bg-indigo-600 text-white shadow-md' 
                           : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                   >
                      <UserCircle className="w-4 h-4 mr-2" /> Viewer
                   </button>
                </div>
             </div>

             <hr className="border-gray-100 dark:border-gray-700" />

             {/* Theme Toggle */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-gray-900 dark:text-white">Workspace Interface Canvas</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Swaps global UI theme colors and persists them seamlessly.</p>
                </div>
                <button 
                  onClick={toggleTheme}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-gray-200 dark:border-gray-600 flex items-center gap-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {theme === 'dark' ? (
                     <><Sun className="w-4 h-4 text-amber-400" /> Switch to Light Mode</>
                  ) : (
                     <><Moon className="w-4 h-4 text-indigo-600" /> Switch to Dark Mode</>
                  )}
                </button>
             </div>

          </div>
        </div>

        {/* Data Management Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center bg-gray-50/50 dark:bg-gray-800/80">
             <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Data & Storage Management</h3>
          </div>
          
          <div className="p-6 space-y-8">
             
             {/* Data Export */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-gray-900 dark:text-white">Export Ledger Snapshot</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Download your explicit transaction footprint to local OS format.</p>
                </div>
                <div className="flex gap-3">
                   <button 
                     onClick={handleDownloadCSV}
                     disabled={transactions.length === 0}
                     className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                      Export CSV
                   </button>
                   <button 
                     onClick={handleDownloadJSON}
                     disabled={transactions.length === 0}
                     className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-sm rounded-xl flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                      <FileJson className="w-4 h-4" /> Export JSON
                   </button>
                </div>
             </div>

             <hr className="border-gray-100 dark:border-gray-700" />

             {/* Danger Zone */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">Hard Reset Platform</h4>
                   <p className="text-sm text-rose-500/80 dark:text-rose-400/80 mt-1">Force erases localized context arrays returning state fully back to zero mapping.</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-rose-600 text-white font-semibold text-sm rounded-xl flex items-center gap-2 hover:bg-rose-700 shadow-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Reset Workspace
                </button>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
