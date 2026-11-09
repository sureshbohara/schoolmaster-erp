export const BANK_ACCOUNT_INITIAL = {
    bank_name: '', account_name: '', account_number: '', branch_name: '', initial_balance: '', _method: 'POST'
};

export const INCOME_INITIAL = {
    head_id: '', amount: '', date: new Date().toISOString().split('T')[0], description: '', attachment: null, _method: 'POST'
};
export const EXPENSE_INITIAL = {
    head_id: '', amount: '', date: new Date().toISOString().split('T')[0], description: '', attachment: null, _method: 'POST'
};


export const mapToForm = (data, initial) => ({ ...initial, ...data, _method: 'PUT', attachment: null });