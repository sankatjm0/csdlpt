"use client"

import { useState } from "react"
import EmployeeList from "./EmployeeList.js"
import EmployeeForm from "./EmployeeForm.js"
import SearchFilter from "./SearchFilter.js"
import ErrorDisplay from "./ErrorDisplay.js"
import { useEmployeeContext } from "../contexts/EmployeeContext.js"

export default function EmployeeManager() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const {
        filteredEmployees,
        branches,
        positions,
        isLoading,
        error,
        searchTerm,
        selectedBranch,
        refreshData,
        setSearchTerm,
        setSelectedBranch,
        addEmployee,
        updateEmployee,
        deleteEmployee,
    } = useEmployeeContext()

    const handleAddEmployee = async (employee) => {
        const result = await addEmployee(employee)
        if (result.success) {
            setIsFormOpen(false)
        } else {
            alert("Lỗi khi thêm nhân viên: " + result.error)
        }
    }

    const handleUpdateEmployee = async (updatedEmployee) => {
        const result = await updateEmployee(updatedEmployee)
        if (result.success) {
            setSelectedEmployee(null)
            setIsFormOpen(false)
        } else {
            alert("Lỗi khi cập nhật nhân viên: " + result.error)
        }
    }

    const handleDeleteEmployee = async (employeeId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            const result = await deleteEmployee(employeeId)
            if (!result.success) {
                alert("Lỗi khi xóa nhân viên: " + result.error)
            }
        }
    }

    const editEmployee = (employee) => {
        setSelectedEmployee(employee)
        setIsFormOpen(true)
    }

    const openAddForm = () => {
        setSelectedEmployee(null)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        setSelectedEmployee(null)
    }

    if (isLoading) {
        return <div className="loading">Đang tải dữ liệu...</div>
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={refreshData} />
    }

    return (
        <div className="app-container">
            <h1>Quản Lý Nhân Viên</h1>

            <SearchFilter
                branches={branches}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
            />

            <div className="action-buttons">
                <button className="add-button" onClick={openAddForm}>
                    Thêm Nhân Viên
                </button>
            </div>

            <EmployeeList employees={filteredEmployees} onEdit={editEmployee} onDelete={handleDeleteEmployee} />

            {isFormOpen && (
                <div className="modal-overlay">
                    <EmployeeForm
                        employee={selectedEmployee}
                        positions={positions}
                        branches={branches}
                        onSave={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
                        onCancel={closeForm}
                    />
                </div>
            )}
        </div>
    )
}
