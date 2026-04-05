import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const useFinanceContext = () => {
  const context = useContext(FinanceContext);
  
  if (context === undefined) {
    throw new Error('useFinanceContext must be used within a FinanceProvider');
  }
  
  return context;
};

export default useFinanceContext;
