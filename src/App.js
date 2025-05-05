"use client"

import { useState, useEffect } from "react"
import EmployeeList from "./components/EmployeeList.js"
import EmployeeForm from "./components/EmployeeForm.js"
import SearchFilter from "./components/SearchFilter.js"
import "./components/css/App.css"
import {
  fetchEmployees,
  fetchBranches,
  fetchPositions,
  addEmployee as apiAddEmployee,
  updateEmployee as apiUpdateEmployee,
  deleteEmployee as apiDeleteEmployee,
} from "./api/employeeService.js"

function App() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [positions, setPositions] = useState([])
  const [branches, setBranches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Extract fetchData to a named function so we can reuse it
  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch all data using our API service
      const employeesData = await fetchEmployees()
      const branchesData = await fetchBranches()
      const positionsData = await fetchPositions()

      setEmployees(employeesData)
      setFilteredEmployees(employeesData)
      setBranches(branchesData)
      setPositions(positionsData)
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err)

      // Provide more user-friendly error messages
      if (err.message.includes("Failed to fetch")) {
        setError("Không thể kết nối đến máy chủ API. Vui lòng kiểm tra xem máy chủ có đang chạy không và thử lại.")
      } else {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Function to retry fetching data
  const handleRetry = () => {
    fetchData()
  }

  // Use fetchData in useEffect
  useEffect(() => {
    fetchData()
  }, [])

  // Lọc theo chi nhánh
  useEffect(() => {
    let result = employees

    if (searchTerm) {
      result = result.filter(
          (employee) =>
              employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              employee.employee_id.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedBranch) {
      result = result.filter((employee) => employee.branch_id.toString() === selectedBranch)
    }

    setFilteredEmployees(result)
  }, [employees, searchTerm, selectedBranch])

  const addEmployee = async (employee) => {
    try {
      const newEmployee = await apiAddEmployee(employee)

      // Find the branch name for the new employee
      const branch = branches.find((b) => b.id === Number.parseInt(newEmployee.branch_id))
      newEmployee.branch_name = branch ? branch.name : newEmployee.branch_id

      // Cập nhật danh sách nhân viên
      const updatedEmployees = [...employees, newEmployee]
      setEmployees(updatedEmployees)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi thêm nhân viên:", err)
      alert("Lỗi khi thêm nhân viên: " + err.message)
    }
  }

  const updateEmployee = async (updatedEmployee) => {
    try {
      const updated = await apiUpdateEmployee(updatedEmployee)

      const branch = branches.find((b) => b.id === Number.parseInt(updated.branch_id))
      updated.branch_name = branch ? branch.name : updated.branch_id

      setEmployees(employees.map((emp) => (emp.employee_id === updated.employee_id ? updated : emp)))
      setSelectedEmployee(null)
      setIsFormOpen(false)
    } catch (err) {
      console.error("Lỗi khi cập nhật nhân viên:", err)
      alert("Lỗi khi cập nhật nhân viên: " + err.message)
    }
  }

  const deleteEmployee = async (employeeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await apiDeleteEmployee(employeeId)
        setEmployees(employees.filter((emp) => emp.employee_id !== employeeId))
      } catch (err) {
        console.error("Lỗi khi xóa nhân viên:", err)
        alert("Lỗi khi xóa nhân viên: " + err.message)
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
    return (
        <div className="error-container">
          <div className="error">
            <h2>Lỗi kết nối</h2>
            <p>{error}</p>
            <div className="error-help">
              <p>Vui lòng kiểm tra:</p>
              <ul>
                <li>Máy chủ API có đang chạy không (port 5001)</li>
                <li>Kết nối mạng của bạn</li>
                <li>Cấu hình API_URL trong ứng dụng</li>
              </ul>
            </div>
          </div>
          <button className="retry-button" onClick={handleRetry}>
            Thử lại
          </button>
        </div>
    )
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

        <EmployeeList employees={filteredEmployees} onEdit={editEmployee} onDelete={deleteEmployee} />

        {isFormOpen && (
            <div className="modal-overlay">
              <EmployeeForm
                  employee={selectedEmployee}
                  positions={positions}
                  branches={branches}
                  onSave={selectedEmployee ? updateEmployee : addEmployee}
                  onCancel={closeForm}
              />
            </div>
        )}
      </div>
  )
}

export default App
