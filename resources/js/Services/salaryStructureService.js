export const SALARY_STRUCTURE_INITIAL_VALUES = {
    designation_id: '',
    basic: '',
    allowance: '',
    medical: '',
    housing: '',
    transport: '',
    _method: 'POST',
};

export const mapSalaryStructureToFormData = (structure) => ({
    designation_id: structure?.designation?.id || '',
    basic: structure?.basic || '',
    allowance: structure?.allowance || '',
    medical: structure?.medical || '',
    housing: structure?.housing || '',
    transport: structure?.transport || '',
    _method: 'PUT',
});

export const calculateGross = (data) => {
    return (parseFloat(data.basic) || 0)
        + (parseFloat(data.allowance) || 0)
        + (parseFloat(data.medical) || 0)
        + (parseFloat(data.housing) || 0)
        + (parseFloat(data.transport) || 0);
};