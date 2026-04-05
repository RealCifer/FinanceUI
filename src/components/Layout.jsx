import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useFinanceContext from '../hooks/useFinanceContext';
import { Loader2, AlertTriangle } from 'lucide-react';

const Layout = () => {
  const { isLoading, error } = useFinanceContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (error) {
    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen items-center justify-center transition-colors duration-300 p-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md text-center border border-red-100 dark:border-red-900/50">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Operation Failed</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors w-full"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 overflow-hidden text-gray-900 dark:text-gray-100 relative">
      <Sidebar isOpen={isMobileMenuOpen} closeSidebar={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar toggleSidebar={() => setIsMobileMenuOpen(prev => !prev)} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
           className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
           onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
