import { useState } from 'react';

export const DEFAULT_FORM = {
  date:        new Date().toISOString().split('T')[0],
  description: '',
  category:    'Food',
  amount:      '',
  type:        'expense',
};

const validateForm = (formData) => {
  const errors = {};

  if (!formData.type) {
    errors.type = 'Transaction type is required.';
  }
  if (!formData.date) {
    errors.date = 'Date is required.';
  }
  if (!formData.category) {
    errors.category = 'Category is required.';
  }

  const parsed = parseFloat(formData.amount);
  if (formData.amount === '' || formData.amount === null || formData.amount === undefined) {
    errors.amount = 'Amount is required.';
  } else if (isNaN(parsed) || parsed <= 0) {
    errors.amount = 'Amount must be greater than 0.';
  }

  return errors;
};

const useTransactionForm = () => {
  const [formData, setFormData]     = useState(DEFAULT_FORM);
  const [formErrors, setFormErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => validateForm(formData);

  const resetForm = (values = DEFAULT_FORM) => {
    setFormData(values);
    setFormErrors({});
  };

  return { formData, formErrors, setFormErrors, handleFieldChange, validate, resetForm };
};

export default useTransactionForm;
