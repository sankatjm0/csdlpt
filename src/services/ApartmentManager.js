import { 
    getApartments, 
    getEmployees, 
    getContracts, 
    addApartment, 
    updateApartment, 
    deleteApartment, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
    addContract, 
    deleteContract 
} from './ApartmentDataService';

// Hàm tính doanh thu
export function calculateRevenue(branch, timePeriod) {
    const contracts = getContracts();
    return contracts
        .filter(c => c.branch === branch)
        .reduce((sum, contract) => sum + contract.amount, 0);
}

// Export tất cả các hàm cần thiết
export { 
    getApartments, 
    getEmployees, 
    getContracts, 
    addApartment, 
    updateApartment, 
    deleteApartment, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
    addContract, 
    deleteContract,
    // calculateRevenue,
};