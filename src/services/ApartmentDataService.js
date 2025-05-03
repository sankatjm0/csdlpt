// Dữ liệu mẫu (sẽ thay bằng database sau)
let apartments = [
    { id: 1, name: 'Căn hộ A1', price: 5000000 },
    { id: 2, name: 'Căn hộ B2', price: 6000000 },
];

let employees = [
    { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý' },
    { id: 2, name: 'Trần Thị B', position: 'Nhân viên' },
];

let contracts = [
    { id: 1, tenant: 'Lê Văn C', amount: 5500000, branch: 'Hà Nội' },
    { id: 2, tenant: 'Phạm Thị D', amount: 6200000, branch: 'TP.HCM' },
];

// Hàm lấy dữ liệu
export function getApartments() {
    return apartments;
}

export function getEmployees() {
    return employees;
}

export function getContracts() {
    return contracts;
}

// Hàm thêm dữ liệu
export function addApartment(apartment) {
    apartments.push({ id: Date.now(), ...apartment });
}

export function addEmployee(employee) {
    employees.push({ id: Date.now(), ...employee });
}

export function addContract(contract) {
    contracts.push({ id: Date.now(), ...contract });
}

// Hàm xóa dữ liệu
export function deleteApartment(id) {
    apartments = apartments.filter(a => a.id !== id);
}

export function deleteEmployee(id) {
    employees = employees.filter(e => e.id !== id);
}

export function deleteContract(id) {
    contracts = contracts.filter(c => c.id !== id);
}

// Hàm cập nhật dữ liệu (dành sẵn cho database sau)
export function updateApartment(id, data) {
    const index = apartments.findIndex(a => a.id === id);
    if (index !== -1) apartments[index] = { ...apartments[index], ...data };
}

export function updateEmployee(id, data) {
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) employees[index] = { ...employees[index], ...data };
}