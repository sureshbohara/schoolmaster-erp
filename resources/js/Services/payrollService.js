export const PAYROLL_INITIAL_VALUES = {
    employee_id: '',
    salary_structure_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    basic: '',
    allowances: '',
    deductions: '',
    tax: '',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'pending', label: '🟡 Pending' },
    { value: 'paid', label: '🟢 Paid' },
];

export const MONTH_OPTIONS = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

export const PAYMENT_METHODS = [
    { value: 'bank_transfer', label: '🏦 Bank Transfer' },
    { value: 'cash', label: '💵 Cash' },
    { value: 'cheque', label: '📄 Cheque' },
];

export const calculateNetPay = (data) => {
    return (parseFloat(data.basic) || 0)
        + (parseFloat(data.allowances) || 0)
        - (parseFloat(data.deductions) || 0)
        - (parseFloat(data.tax) || 0);
};

export const mapPayrollToFormData = (payroll) => ({
    employee_id: payroll?.employee?.id || '',
    salary_structure_id: '',
    month: payroll?.month || new Date().getMonth() + 1,
    year: payroll?.year || new Date().getFullYear(),
    basic: payroll?.basic || '',
    allowances: payroll?.allowances || '',
    deductions: payroll?.deductions || '',
    tax: payroll?.tax || '',
    _method: 'PUT',
});