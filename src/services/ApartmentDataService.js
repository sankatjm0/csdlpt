
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

let branches = [
    { id: 1, name: 'Chi nhánh Hà Nội', address: '123 Đường Láng' },
    { id: 2, name: 'Chi nhánh TP.HCM', address: '456 Nguyễn Trãi' },
    { id: 3, name: 'Chi nhánh Đà Nẵng', address: '789 Trần Phú' },
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

export function getBranches() {
    return branches;
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

export function addBranch(branch) {
    branches.push({ id: Date.now(), ...branch });
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

export function deleteBranch(id) {
    branches = branches.filter(b => b.id !== id);
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

export function updateBranch(id, data) {
    const index = branches.findIndex(b => b.id === id);
    if (index !== -1) branches[index] = { ...branches[index], ...data };
}
