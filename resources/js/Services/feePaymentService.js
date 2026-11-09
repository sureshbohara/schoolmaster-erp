export const FEE_PAYMENT_INITIAL_VALUES = {
    student_id: '',
    fee_structure_id: '',
    amount: '',
    discount: '',
    fine: '',
    payment_method: 'cash',
    payment_date: new Date().toISOString().split('T')[0],
    transaction_id: '',
    remarks: '',
    _method: 'POST',
};

export const PAYMENT_METHODS = [
    { value: 'cash', label: '💵 Cash' },
    { value: 'bank_transfer', label: '🏦 Bank Transfer' },
    { value: 'cheque', label: '📄 Cheque' },
    { value: 'online', label: '🌐 Online Payment' },
];

export const calculateNetAmount = (data) => {
    const amount = parseFloat(data.amount) || 0;
    const discount = parseFloat(data.discount) || 0;
    const fine = parseFloat(data.fine) || 0;
    return amount - discount + fine;
};

export const mapPaymentToFormData = (payment) => ({
    student_id: payment?.student?.id || '',
    fee_structure_id: payment?.fee_structure?.id || '',
    amount: payment?.amount || '',
    discount: payment?.discount || '',
    fine: payment?.fine || '',
    payment_method: payment?.payment_method || 'cash',
    payment_date: payment?.payment_date || new Date().toISOString().split('T')[0],
    transaction_id: payment?.transaction_id || '',
    remarks: payment?.remarks || '',
    _method: 'PUT',
});