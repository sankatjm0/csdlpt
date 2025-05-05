// API URL - sửa nếu chỉnh port backend
const API_URL = "http://localhost:5001/api"

// Fetch all employees
export const fetchEmployees = async () => {
    const response = await fetch(`${API_URL}/employees`)
    if (!response.ok) {
        throw new Error(`Không thể lấy dữ liệu nhân viên: ${response.status} ${response.statusText}`)
    }
    return await response.json()
}

// Fetch all branches
export const fetchBranches = async () => {
    const response = await fetch(`${API_URL}/branches`)
    if (!response.ok) {
        throw new Error(`Không thể lấy dữ liệu chi nhánh: ${response.status} ${response.statusText}`)
    }
    return await response.json()
}

// Fetch all positions
export const fetchPositions = async () => {
    const response = await fetch(`${API_URL}/positions`)
    if (!response.ok) {
        throw new Error(`Không thể lấy dữ liệu chức vụ: ${response.status} ${response.statusText}`)
    }
    return await response.json()
}

// Add a new employee
export const addEmployee = async (employee) => {
    const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })

    if (!response.ok) {
        throw new Error("Không thể thêm nhân viên")
    }

    return await response.json()
}

// Update an existing employee
export const updateEmployee = async (updatedEmployee) => {
    const response = await fetch(`${API_URL}/employees/${updatedEmployee.employee_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
    })

    if (!response.ok) {
        throw new Error("Không thể cập nhật nhân viên")
    }

    return await response.json()
}

// Delete an employee
export const deleteEmployee = async (employeeId) => {
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Không thể xóa nhân viên")
    }

    return true
}
